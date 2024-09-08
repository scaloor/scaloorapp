export type Checkout = {
    id: number;
    product: string;
    image: string;
    upsell: { id: number; name: string } | null;
    downsell: { id: number; name: string } | null;
    price: number;
    lastModified: Date;
};


export const checkouts = [
    {
      id: 1,
      product: "Premium Subscription",
      image: "/placeholder.svg?height=50&width=50",
      upsell: { id: 3, name: "Pro Bundle" },
      downsell: { id: 2, name: "Basic Package" },
      price: 99.99,
      lastModified: new Date("2023-06-15T10:30:00Z")
    },
    {
      id: 2,
      product: "Basic Package",
      image: "/placeholder.svg?height=50&width=50",
      upsell: { id: 4, name: "Standard Plan" },
      downsell: null,
      price: 49.99,
      lastModified: new Date("2023-06-14T14:45:00Z")
    },
    {
      id: 3,
      product: "Pro Bundle",
      image: "/placeholder.svg?height=50&width=50",
      upsell: { id: 5, name: "Enterprise Solution" },
      downsell: { id: 4, name: "Standard Plan" },
      price: 199.99,
      lastModified: new Date("2023-06-13T09:15:00Z")
    },
    {
      id: 4,
      product: "Standard Plan",
      image: "/placeholder.svg?height=50&width=50",
      upsell: { id: 3, name: "Pro Bundle" },
      downsell: { id: 2, name: "Basic Package" },
      price: 79.99,
      lastModified: new Date("2023-06-12T16:20:00Z")
    },
    {
      id: 5,
      product: "Enterprise Solution",
      image: "/placeholder.svg?height=50&width=50",
      upsell: null,
      downsell: { id: 3, name: "Pro Bundle" },
      price: 499.99,
      lastModified: new Date("2023-06-11T11:00:00Z")
    }
  ]