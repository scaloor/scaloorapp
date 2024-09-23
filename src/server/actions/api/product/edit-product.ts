'use server'

import { editProduct, getProductById } from "@/server/data/product"
import { InsertProduct } from "@/server/db/schema"

export async function getEditProductAction(productId: string) {
    try {
        const { dbProduct } = await getProductById(productId)
        return { dbProduct }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function editProductAction(productDetails: InsertProduct) {
    try {
        const { dbProduct, error } = await editProduct(productDetails)
        if (error || !dbProduct) return { error: error || "Unable to edit product" }
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

