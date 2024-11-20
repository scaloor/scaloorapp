import { getAuthUserDetails } from '@/server/actions/protected/users';
import CreateProductForm from './create-product-form';
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper';
import ErrorPage from '@/app/_components/common/error-page';

export default async function CreateProductPage() {
    const { dbUser } = await getAuthUserDetails()
    if (!dbUser?.businessId) return <ErrorPage errorMessage='Cannot find business details' />
    return (
        <MaxWidthWrapper>
            <CreateProductForm businessId={dbUser.businessId} />
        </MaxWidthWrapper>
    );
}
