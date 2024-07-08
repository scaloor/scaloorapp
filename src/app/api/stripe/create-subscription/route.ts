import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { addSubscription, updateSubscription } from "@/server/data/subscription";
import { getBusinessById } from "@/server/data/business";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    let event: Stripe.Event;

    // Verify the signature
    try {
        event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.metadata?.business_id) {
        return NextResponse.json({ status: 400, error: 'No business id found in metadata' })
    }

    const businessId = parseInt(session.metadata.business_id);
    const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription as string);

    try {
        switch (event.type) {
            case 'checkout.session.completed': // New subscription
                await addSubscription({ stripeSubscription, businessId });
                return NextResponse.json({ status: 200, event: event.type })
            case 'invoice.payment_succeeded': // Renewed subscription
                const dbBusiness = await getBusinessById(businessId);
                if (!dbBusiness) {
                    return NextResponse.json({ status: 400, error: 'Business not found' })
                }
                await updateSubscription({ stripeSubscription, dbBusiness });
                return NextResponse.json({ status: 'Success', event: event.type })
            default:
        }
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}

