'use server'

import { getAuthUserDetails } from "@/server/actions/users"
import { deleteProductById, getProductsByBusinessId } from "@/server/data/product"

export async function productPageAction() {
    try {
        const { dbUser } = await getAuthUserDetails()
        if (!dbUser?.businessId) return { error: 'Cannot find business details' }
        const { products, error } = await getProductsByBusinessId(dbUser.businessId)
        if (error) return { error: error }
        return { products }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function deleteProductByIdAction(productId: string) {
    try {
        const { dbUser } = await getAuthUserDetails()
        if (!dbUser?.businessId) return { error: 'Cannot find business details' }
        const { error } = await deleteProductById(productId, dbUser.businessId)
        if (error) return { error: error }
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
