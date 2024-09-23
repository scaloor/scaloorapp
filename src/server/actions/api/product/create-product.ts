'use server'

import { formatPriceToNumber } from "@/lib/utils";
import { addProduct } from "@/server/data/product";

export async function createProductAction({
    name,
    pricingType,
    defaultPrice,
    productImage,
    businessId

}: {
    name: string;
    pricingType: "one_time" | "recurring";
    defaultPrice: string;
    productImage: string;
    businessId: string;
}) {
    try {
        const priceInCents = formatPriceToNumber(defaultPrice);

        const { error } = await addProduct({
            name,
            defaultPrice: priceInCents,
            billingType: pricingType,
            image: productImage,
            businessId
        }, businessId)

        if (error) return { error: error }

        return { success: true }

    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}