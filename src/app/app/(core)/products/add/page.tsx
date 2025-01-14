import React from 'react'
import CreateProductForm from './create-product-form'


export default async function AddProductPage() {
    return (
        <div className="flex justify-center items-center md:mt-10">
            <CreateProductForm />
        </div>
    )
}