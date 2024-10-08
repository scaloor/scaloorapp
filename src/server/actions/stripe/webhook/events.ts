
import "server-only"
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { cancelSubscriptionAction } from "./cancel-subscription";
import { upsertSubscriptionAction } from "./upsert-subscription";


async function getCustomerEmail(customerId: string): Promise<string | null> {
    try {
        const customer = await stripe.customers.retrieve(customerId);
        return (customer as Stripe.Customer).email;
    } catch (error) {
        console.error("Error fetching customer:", error);
        return null;
    }
}

export async function handleSubscriptionEvent(
    event: Stripe.Event,
    type: "created" | "updated" | "deleted"
) {
    console.log("Customer subscription ", type)
    const subscription = event.data.object as Stripe.Subscription;

    if (type === "deleted") {
        const { success: cancelSuccess, error: cancelError } = await cancelSubscriptionAction(subscription.id)
        if (cancelSuccess) {
            return NextResponse.json({
                status: 200,
                message: "Subscription cancelled"
            })
        }
        if (cancelError) {
            return NextResponse.json({
                status: 500,
                error: cancelError
            })
        }
    } else {
        const { success: upsertSuccess, error: upsertError } = await upsertSubscriptionAction(subscription)
        if (upsertSuccess) {
            return NextResponse.json({
                status: 200,
                message: `Subscription ${type} successfully`
            })
        }
        if (upsertError) {
            return NextResponse.json({
                status: 500,
                error: upsertError
            })
        }
    }

}

export async function handleInvoiceEvent(
    event: Stripe.Event,
    status: "succeeded" | "failed"
) {
    const invoice = event.data.object as Stripe.Invoice;
    
    console.log("Invoice ", status)
    // If we wanted to save invoice data to our database we would do so here.
    // At the moment I am happy to use stripe to manage this.

    return NextResponse.json({
        status: 200,
        message: `Invoice ${status}`
    })
}

export async function handleCheckoutSessionCompleted(
    event: Stripe.Event
) {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;

    console.log("Checkout session completed")
    // If I wanted to have subscriptions AND one time payments this would handle that.

    return NextResponse.json({
        status: 200,
        message: "Checkout session completed"
    })
}