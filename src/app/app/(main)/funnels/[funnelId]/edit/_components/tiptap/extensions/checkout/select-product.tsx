'use client'


import { NodeViewWrapper } from '@tiptap/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/_components/ui/select'
import { Button } from '@/app/_components/ui/button'
import { SelectProduct } from '@/server/db/schema'
import { useEffect, useState } from 'react'
import { getProductsForFunnel } from '@/server/actions/api/editor/checkout'
import { useFunnelEditor } from '../../../editor-provider'


export default function SelectProductComponent() {
    const [products, setProducts] = useState<SelectProduct[]>([])
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
    const { state, dispatch } = useFunnelEditor();

    useEffect(() => {
        const fetchProducts = async () => {
            const { dbProducts, error } = await getProductsForFunnel()
            console.log('dbProducts', dbProducts)
            if (error || !dbProducts) {
                return
            }
            setProducts(dbProducts)
        }
        fetchProducts()
    }, [])

    const initializeCheckout = () => {
        if (selectedProductId) {
            const selectedProduct = products.find(p => p.id.toString() === selectedProductId)
            if (selectedProduct) {
                dispatch({ type: 'SET_CHECKOUT_PRODUCT', productId: selectedProduct.id })
            }
        }
    }

    return (
        <NodeViewWrapper className='flex flex-col justify-center items-center no-drag-handle'>
            <div contentEditable={false} className='max-w-md'>
                <Card>
                    <CardHeader className='py-0'>
                        <CardTitle>Choose one of your products</CardTitle>
                    </CardHeader>
                    <CardContent className=''>
                        <Select onValueChange={(value) => setSelectedProductId(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent>
                                {products.map((product) => (
                                    <SelectItem key={product.id} value={product.id.toString()}>{product.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className='flex justify-end pt-2'>
                            <Button onClick={initializeCheckout} disabled={!selectedProductId}>
                                Add to checkout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </NodeViewWrapper>
    )
}