export type SampleFunnel = {
    name: string;
    published: boolean;
    lastModified: Date;
}

export const sampleFunnels: SampleFunnel[] = [
    {
        name: "Lead Generation Funnel",
        published: true,
        lastModified: new Date("2023-06-15"),
    },
    {
        name: "Product Launch Funnel",
        published: false,
        lastModified: new Date("2023-07-02"),
    },
    {
        name: "Webinar Registration Funnel",
        published: true,
        lastModified: new Date("2023-06-28"),
    },
    {
        name: "E-commerce Sales Funnel",
        published: true,
        lastModified: new Date("2023-07-10"),
    },
    {
        name: "Membership Signup Funnel",
        published: false,
        lastModified: new Date("2023-06-20"),
    },
];
