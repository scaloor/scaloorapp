export type Product = {
    id: number;
    name: string;
    image: string;
    defaultPrice: number;
    lastModified: Date;
};

export type Products = Product[];


export const sampleProducts: Products = [

    {
        id: 1,
        name: "Ergonomic Chair",
        image: "/placeholder.svg?height=50&width=50",
        defaultPrice: 199.99,
        lastModified: new Date("2023-06-15T10:30:00Z")
    },
    {
        id: 2,
        name: "Standing Desk",
        image: "/placeholder.svg?height=50&width=50",
        defaultPrice: 349.99,
        lastModified: new Date("2023-06-14T14:45:00Z")
    },
    {
        id: 3,
        name: "Wireless Mouse",
        image: "/placeholder.svg?height=50&width=50",
        defaultPrice: 29.99,
        lastModified: new Date("2023-06-13T09:15:00Z")
    },
    {
        id: 4,
        name: "Mechanical Keyboard",
        image: "/placeholder.svg?height=50&width=50",
        defaultPrice: 129.99,
        lastModified: new Date("2023-06-12T16:20:00Z")
    },
    {
        id: 5,
        name: "4K Monitor",
        image: "/placeholder.svg?height=50&width=50",
        defaultPrice: 399.99,
        lastModified: new Date("2023-06-11T11:00:00Z")
    }
]