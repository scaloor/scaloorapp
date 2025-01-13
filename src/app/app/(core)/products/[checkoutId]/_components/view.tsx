'use client'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '@/app/_components/ui/card'
import { SelectCheckout } from '@/server/db/schema';
import { Input } from "@/app/_components/ui/input";
import FileUpload from '@/app/_components/common/file-upload';
import { Textarea } from '@/app/_components/ui/textarea';
import { Switch } from '@/app/_components/ui/switch';
import { Label } from '@/app/_components/ui/label';
import { useCheckout } from './checkout-provider';
import { Button } from '@/app/_components/ui/button';
import { updateCheckoutAction } from '@/server/actions/protected/checkout/update';
import { deleteFile, uploadFile } from '@/lib/supabase/client';

type CheckoutViewProps = {
  dbCheckout: SelectCheckout
}

export default function CheckoutView({ dbCheckout }: CheckoutViewProps) {
  const checkoutStore = useCheckout()
  const router = useRouter();

  const thumbnail = checkoutStore.checkout.thumbnail ?? '';
  const filename = checkoutStore.checkout.productFile.split("/").pop();

  const deleteCheckout = async () => {
    // TODO
    // This should be a dialog and delete from stripe also
    toast.success("Checkout deleted successfully");
    router.push(`/products`);
  }

  const saveCheckout = async () => {
    const uploadPromises = [];
    const deletePromises = [];

    // Handle upload operations
    if (checkoutStore.thumbnailFile) {
      uploadPromises.push(
        uploadFile(checkoutStore.thumbnailFile, `organization/${checkoutStore.checkout.organizationId}/checkout/thumbnail/${checkoutStore.checkout.id}/${checkoutStore.thumbnailFile.name}`)
      );
      if (dbCheckout.thumbnail) {
        deletePromises.push(deleteFile(dbCheckout.thumbnail))
      }
    }

    if (checkoutStore.productFile) {
      uploadPromises.push(
        uploadFile(checkoutStore.productFile, `organization/${checkoutStore.checkout.organizationId}/checkout/product/${checkoutStore.checkout.id}/${checkoutStore.productFile.name}`)
      );
      deletePromises.push(deleteFile(dbCheckout.productFile))
    }

    try {
      // First handle all deletions
      if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
      }

      // Then handle all uploads
      const uploadResults = await Promise.all(uploadPromises);

      // Check if any of the uploads failed
      const failedUploads = uploadResults.some(result => !result.data);
      if (failedUploads) {
        toast.error("Failed to upload one or more files");
        return;
      }

      // Update paths in store
      if (checkoutStore.thumbnailFile) {
        const thumbnailPath = uploadResults[0]!.data!.path;
        checkoutStore.updateThumbnailPath(thumbnailPath);
        checkoutStore.updateThumbnailFile(null); // Clear the file after upload
      }

      if (checkoutStore.productFile) {
        const productFilePath = uploadResults[uploadResults.length - 1]!.data!.path;
        checkoutStore.updateProductFilePath(productFilePath);
        checkoutStore.updateProductFile(null); // Clear the file after upload
      }

      // Update the checkout record
      const { success } = await updateCheckoutAction(checkoutStore.checkout);
      if (!success) {
        toast.error("Failed to update checkout");
        return;
      }

      toast.success("Checkout updated successfully");
      router.refresh();

    } catch (error) {
      console.error("Error during save:", error);
      toast.error("Failed to save changes");
    }
  }


  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>
            View your checkout.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => {
            console.log("CheckoutStore:", checkoutStore)
          }}>Check Store</Button>
          <Button onClick={deleteCheckout}>Delete</Button>
          <Button onClick={saveCheckout}>Save</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Product Name</Label>
          <Input
            defaultValue={checkoutStore.checkout.productName}
            onChange={(e) => {
              checkoutStore.updateName(e.target.value)
            }}
            //disabled={isPending}
            placeholder="Product Name"
          />
        </div>
        <div className="space-y-2">
          <Label>Product Description</Label>
          <Textarea
            defaultValue={checkoutStore.checkout.productDescription ?? ""}
            onChange={(e) => {
              checkoutStore.updateDescription(e.target.value)
            }}
            //disabled={isPending}
            placeholder="Enter your product description"
            className="resize-none"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Price</Label>
          <Input
            defaultValue={checkoutStore.checkout.productPrice.toString()}
            //disabled={isPending}
            onChange={(e) => {
              checkoutStore.updatePrice(Number(e.target.value))
            }}
            placeholder="100"
            onKeyDown={(e) => {
              // Allow: backspace, delete, tab, escape, enter, decimal point
              if (
                e.key === 'Backspace' ||
                e.key === 'Delete' ||
                e.key === 'Tab' ||
                e.key === 'Escape' ||
                e.key === 'Enter' ||
                e.key === '.'
              ) {
                // Check if there's already a decimal point
                if (e.key === '.' && e.currentTarget.value.includes('.')) {
                  e.preventDefault();
                }
                return;
              }

              // Allow numbers only
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
                return;
              }

              // Check decimal places
              if (e.currentTarget.value.includes('.')) {
                const decimals = e.currentTarget.value.split('.')[1];
                if (decimals && decimals.length >= 2) {
                  e.preventDefault();
                }
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Label>Customer Name</Label>
            <Switch defaultChecked={checkoutStore.checkout.customerName} onCheckedChange={checkoutStore.toggleCustomerName} />
          </div>
          <div className="flex justify-between items-center">
            <Label>Customer Mobile</Label>
            <Switch defaultChecked={checkoutStore.checkout.customerPhone} onCheckedChange={checkoutStore.toggleCustomerPhone} />
          </div>
          <div className="flex justify-between items-center">
            <Label>Customer Address</Label>
            <Switch defaultChecked={checkoutStore.checkout.customerAddress} onCheckedChange={checkoutStore.toggleCustomerAddress} />
          </div>
        </div>
        <FileUpload
          value="file"
          initialURL={filename}
          accept='DOCUMENT'
          onFileChange={(path: string, file: File | null) => {
            if (file) {
              checkoutStore.updateProductFile(file);
            }
          }}
        />

        <FileUpload
          className="w-1/2"
          value="thumbnail"
          initialURL={thumbnail}
          accept='IMAGE'
          onFileChange={(path: string, file: File | null) => {
            if (file) {
              checkoutStore.updateThumbnailFile(file);
            }
          }}
        />

      </CardContent>
    </Card>
  )
}