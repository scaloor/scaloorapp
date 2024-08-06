import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { addSubscription, updateSubscription } from "@/server/data/subscription";
import { cancelSubscription } from "@/server/actions/subscription";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    let event: Stripe.Event;

    // Verify the signature
    try {
        event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, error })
    }

    // Handle the request based on the event type
    try {
        switch (event.type) {
            case 'checkout.session.completed': // New subscription
                console.log('Checkout session completed')
                const checkoutSession = event.data.object ;
                const checkoutSubscription = await stripe.subscriptions.retrieve(checkoutSession.subscription as string);
                await addSubscription({ stripeSubscription: checkoutSubscription });
                return NextResponse.json({ status: 'Success', event: event.type })
            case 'invoice.payment_succeeded': // Renewed subscription // WIP
                console.log('Invoice payment succeeded')
                const invoiceSession = event.data.object;
                /* await updateSubscription({ stripeSubscription }); */
                return NextResponse.json({ status: 'Success', event: event.type })
            case 'customer.subscription.deleted': // Cancelled subscription
                console.log('Customer subscription deleted')
                const cancelSubscriptionId = await event.data.object.id;
                await cancelSubscription({ stripeSubscriptionId: cancelSubscriptionId });
                return NextResponse.json({ status: 'Success', event: event.type })
            default:
        }
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}

