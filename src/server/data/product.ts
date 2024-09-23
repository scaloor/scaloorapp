import 'server-only'
import { InsertProduct, product } from '../db/schema'
import { canAccessProduct } from '../authorization/product'
import { db } from '../db'
import { eq } from 'drizzle-orm' 


export async function addProduct(productDetails: InsertProduct, businessId: string) {
    try {
        if (!await canAccessProduct(businessId)) {
            return { error: "You are not authorized to add a product" }
        }
        const insertProduct = async (productDetails: InsertProduct) => {
            return await db.insert(product).values(productDetails).returning().then(res => res[0])
        }
        const dbProduct = await insertProduct(productDetails)
        return { dbProduct }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function getProductById(productId: string) {
    try {
        // There is no authorization check here, I don't think it is needed
        const dbProduct = await db.select().from(product).where(eq(product.id, productId)).then(res => res[0])
        return { dbProduct }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function getProductsByBusinessId(businessId: string) {
    try {
        if (!await canAccessProduct(businessId)) {
            return { error: "You are not authorized to view these products" }
        }
        const products = await db.select().from(product).where(eq(product.businessId, businessId))
        return { products }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function editProduct(productDetails: InsertProduct) {
    try {
        if (!await canAccessProduct(productDetails.businessId)) {
            return { error: "You are not authorized to edit this product" }
        }
        const dbProduct = await db.update(product).set(productDetails).where(eq(product.id, productDetails.id!)).returning().then(res => res[0])
        return { dbProduct }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function deleteProductById(productId: string, businessId: string) {
    try {
        if (!await canAccessProduct(businessId)) {
            return { error: "You are not authorized to delete this product" }
        }
        await db.delete(product).where(eq(product.id, productId))
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

