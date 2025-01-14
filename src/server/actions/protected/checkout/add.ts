'use server'

import { InsertCheckout } from "@/server/db/schema";
import { z } from "zod";
import { getAuthUserDetails } from "../users";
import { createStripeProduct } from "../../stripe/product";
import { getOrganizationById } from "@/server/data/organization";
import { Checkout } from "@/server/data/checkout-class";

const CreateCheckoutSchema = z.object({
    checkoutId: z.string(),
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional(),
    price: z.string(),
    thumbnailPath: z.string().optional(),
    filePath: z.string(),
});

export async function addCheckoutAction(checkoutData: z.infer<typeof CreateCheckoutSchema>) {
    // Get business ID, verify if user is logged in
    const { dbUser } = await getAuthUserDetails();
    if (!dbUser?.organizationId) {
        throw new Error("Organization ID not found");
    }

    // Get stripe account ID and default currency
    const { dbOrganization } = await getOrganizationById(dbUser.organizationId);
    if (!dbOrganization?.stripeAccountId || !dbOrganization?.defaultCurrency) {
        throw new Error("Stripe account ID not found");
    }
    const price = parseInt(checkoutData.price) * 100

    // Create the stripe product
    const stripeProduct = await createStripeProduct({
        name: checkoutData.name,
        ...(checkoutData.description ? { description: checkoutData.description } : {}),
        default_price_data: {
            unit_amount: price,
            currency: dbOrganization.defaultCurrency,
        },
    }, dbOrganization.stripeAccountId);

    // Create the checkout record
    const newCheckout: InsertCheckout = {
        id: checkoutData.checkoutId,
        organizationId: dbUser.organizationId,
        productName: checkoutData.name,
        productDescription: checkoutData.description,
        productPrice: price,
        billingType: "one_time",
        thumbnail: checkoutData.thumbnailPath,
        productFile: checkoutData.filePath,
        stripeProductId: stripeProduct.id,
        customerEmail: true,
        customerName: false,
        customerPhone: false,
        customerAddress: false,
    }

    // Insert the checkout record
    const { error } = await Checkout.create(newCheckout);

    if (error) {
        throw new Error(error);
    }

    return { success: true };
}
