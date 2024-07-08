'use server';
import { getBusinessById } from "@/server/data/business";
import { getAuthUserDetails } from "../users";
import { getSubscriptionById } from "@/server/data/subscription";
import { stripe } from "@/lib/stripe";
import { PLANS } from "@/lib/stripe/plans";



export async function stripeSession(plan_slug: string) {
    const plan = PLANS.find(plan => plan.slug === plan_slug);
    const dbUser = await getAuthUserDetails();
    if (!dbUser?.businessId) {
        throw new Error('No user found');
    }
    const dbBusiness = await getBusinessById(dbUser.businessId);
    if (!dbBusiness) {
        throw new Error('No business found');
    }

    if (!dbBusiness.currentSubscriptionId) {
        const stripeSession = await stripe.checkout.sessions.create({
            mode: 'subscription',
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: plan?.price.priceIds.test, // Update for production
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_URL}/onboarding/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/onboarding/cancel`,
            customer_email: dbBusiness.businessEmail,
            metadata: {
                business_id: dbBusiness.id,
            },
        });
        
        return stripeSession.url;
    }

    const subscription = await getSubscriptionById(dbBusiness.currentSubscriptionId);

    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.customerId,
        return_url: `${process.env.NEXT_PUBLIC_URL}/account/billing`,
    })

    return stripeSession.url;

}