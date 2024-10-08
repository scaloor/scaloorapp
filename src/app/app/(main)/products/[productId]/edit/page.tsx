import { getEditProductAction } from "@/server/actions/protected/product/edit-product";
import EditProductForm from "./edit-product-form";
import ErrorPage from "@/app/_components/common/error-page";
import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";

type Props = {
    params: {
        productId: string
    }
}

export default async function EditProductPage({ params }: Props) {
    const { productId } = params;
    const { dbProduct } = await getEditProductAction(productId);

    if (!dbProduct) return <ErrorPage errorMessage="Product not found" />
    
    return (
        <MaxWidthWrapper>
            <EditProductForm product={dbProduct} />
        </MaxWidthWrapper>
    )
}
