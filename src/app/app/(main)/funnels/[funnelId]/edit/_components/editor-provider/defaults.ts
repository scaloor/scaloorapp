import { SelectPage } from "@/server/db/schema";
import { scaloorId } from "@/server/db/schema/defaults";
import { defaultContent, defaultLandingPageContent, defaultThankYouPageContent } from "../tiptap/default-content";

export const PageTypes = [
    {
        name: 'Landing Page',
        slug: 'landing',
    },
    {
        name: 'Thank You Page',
        slug: 'thank_you',
    },
    {
        name: 'Upsell Page',
        slug: 'upsell',
    },
    {
        name: 'Downsell Page',
        slug: 'downsell',
    },
]

export const defaultLandingPage = (funnelId: string): SelectPage => {
    return {
        id: scaloorId('page'),
        name: 'Landing Page',
        pathName: 'landing-page',
        funnelId,
        order: 1,
        type: 'landing',
        content: defaultLandingPageContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Add other necessary fields
    }
}

export const defaultThankYouPage = (funnelId: string, order: number): SelectPage => {
    return {
        id: scaloorId('page'),
        name: 'Thank you',
        pathName: 'thank-you',
        funnelId,
        order,
        type: 'thank_you',
        content: defaultThankYouPageContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
}


