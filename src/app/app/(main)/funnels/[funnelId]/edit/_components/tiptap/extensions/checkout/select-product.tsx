'use client'


import { NodeViewWrapper } from '@tiptap/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/_components/ui/select'
import { Button } from '@/app/_components/ui/button'
import { Product, sampleProducts } from '@/app/app/(main)/products/_components/sample-products'


type SelectProductComponentProps = {
    selectedProductId: string | null
    setSelectedProduct: (product: Product) => void //This will be SelectProduct
    setSelectedProductId: (id: string) => void
}


export default function SelectProductComponent({ selectedProductId, setSelectedProduct, setSelectedProductId }: SelectProductComponentProps) {
    
    const initializeCheckout = () => {
        if (selectedProductId) {
            const selectedProduct = sampleProducts.find(p => p.id.toString() === selectedProductId)
            if (selectedProduct) {
                setSelectedProduct(selectedProduct)
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
                                {sampleProducts.map((product) => (
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