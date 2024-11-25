'use server'

import { InsertCheckout } from "@/server/db/schema";
import { z } from "zod";
import { getAuthUserDetails } from "../users";
import { createStripeProduct } from "../../stripe/product";
import { addCheckout } from "@/server/data/checkout";
import { getBusinessById } from "@/server/data/business";

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
    console.log("dbBusiness", dbBusiness)
    if (!dbBusiness?.stripeAccountId || !dbBusiness?.defaultCurrency) {
        throw new Error("Stripe account ID not found");
    }

    // Create the stripe product
    const stripeProduct = await createStripeProduct({
        name: checkoutData.name,
        description: checkoutData.description,
        default_price_data: {
            unit_amount: parseInt(checkoutData.price) * 100,
            currency: dbBusiness.defaultCurrency,
        },
    }, dbBusiness.stripeAccountId);

    console.log("Stripe product created: ", stripeProduct);

    // Create the checkout record
    const newCheckout: InsertCheckout = {
        id: checkoutData.checkoutId,
        businessId: dbUser.businessId,
        productName: checkoutData.name,
        productDescription: checkoutData.description,
        productPrice: parseInt(checkoutData.price),
        billingType: "one_time",
        thumbnail: checkoutData.thumbnailPath,
        productFile: checkoutData.filePath,
        stripeProductId: stripeProduct.id,
    }

    // Insert the checkout record
    const { error } = await addCheckout(newCheckout);

    if (error) {
        throw new Error(error);
    }

    return { success: true };
}
