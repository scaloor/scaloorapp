import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { handleCheckoutSessionCompleted, handleInvoiceEvent, handleSubscriptionEvent } from "@/server/actions/stripe/webhook/events";



export async function POST(req: NextRequest) {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    try {
        // Verify the signature
        const event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!)
        // Handle the request based on the event type
        switch (event.type) {
            case 'customer.subscription.created':
                return handleSubscriptionEvent(event, "created")
            case 'customer.subscription.updated':
                return handleSubscriptionEvent(event, "updated")
            case "customer.subscription.deleted": // Cancelled subscription
                return handleSubscriptionEvent(event, "deleted")
            case 'invoice.payment_succeeded': // Renewed subscription // WIP
                return handleInvoiceEvent(event, "succeeded")
            case 'invoice.payment_failed':
                return handleInvoiceEvent(event, "failed")
            case 'checkout.session.completed': // New subscription
                return handleCheckoutSessionCompleted(event)
            default:
                return NextResponse.json({
                    status: 400,
                    error: "Unhandled event type",
                });
        }
    } catch (error) {
        console.error("Error constructing Stripe event:", error);
        return NextResponse.json({
            status: 500,
            error: "Webhook Error: Invalid Signature",
        });
    }
}

