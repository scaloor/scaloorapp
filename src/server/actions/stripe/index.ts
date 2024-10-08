'use server';
import { getBusinessById } from "@/server/data/business";
import { getAuthUserDetails } from "../protected/users";
import { getSubscriptionById } from "@/server/data/subscription";
import { stripe } from "@/lib/stripe";
import { PLANS } from "@/lib/stripe/plans";

export async function stripeSession(plan_slug: string) {
    const plan = PLANS.find(plan => plan.slug === plan_slug);
    const { dbUser } = await getAuthUserDetails();
    if (!dbUser?.businessId) {
        throw new Error('No user found');
    }
    const { dbBusiness } = await getBusinessById(dbUser.businessId);
    if (!dbBusiness) {
        throw new Error('No business found');
    }

    // Check if the user has a subscription
    if (!dbBusiness.currentSubscriptionId) {
        const stripeSession = await stripe.checkout.sessions.create({
            mode: 'subscription',
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: plan?.price.priceIds.test, // WIP: Update for production
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
            customer_email: dbBusiness.businessEmail,
            subscription_data: {
                metadata: {
                    business_id: dbBusiness.id,
                },
            },
            metadata: {
                business_id: dbBusiness.id,
            },
        });

        return stripeSession.url;
    }

    const { dbSubscription: subscription } = await getSubscriptionById(dbBusiness.currentSubscriptionId);

    if (!subscription) {
        throw new Error('No subscription found');
    }

    // Redirect to the billing portal if the user has an active subscription
    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
    })

    return stripeSession.url;

}


export async function cancelStripeSubscription(subscriptionId: string) {
    console.log('Cancelling subscription')
    await stripe.subscriptions.cancel(subscriptionId);
}