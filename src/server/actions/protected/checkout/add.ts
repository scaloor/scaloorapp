'use server'

import { InsertCheckout } from "@/server/db/schema";
import { z } from "zod";
import { getAuthUserDetails } from "../users";
import { createStripeProduct } from "../../stripe/product";
import { getBusinessById } from "@/server/data/business";
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
    if (!dbUser?.businessId) {
        throw new Error("Business ID not found");
    }

    // Get stripe account ID and default currency
    const { dbBusiness } = await getBusinessById(dbUser.businessId);
    if (!dbBusiness?.stripeAccountId || !dbBusiness?.defaultCurrency) {
        throw new Error("Stripe account ID not found");
    }
    const price = parseInt(checkoutData.price) * 100

    // Create the stripe product
    const stripeProduct = await createStripeProduct({
        name: checkoutData.name,
        description: checkoutData.description,
        default_price_data: {
            unit_amount: price,
            currency: dbBusiness.defaultCurrency,
        },
    }, dbBusiness.stripeAccountId);

    // Create the checkout record
    const newCheckout: InsertCheckout = {
        id: checkoutData.checkoutId,
        businessId: dbUser.businessId,
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
