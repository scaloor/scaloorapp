'use server'

import { getBusinessById } from "@/server/data/business";
import { getAuthUserDetails } from "../users";
import { getSubscriptionById } from "@/server/data/subscription";

export async function getSettingsDetailsAction() {
    const { dbUser: user } = await getAuthUserDetails();
    if (!user) return { error: "User not found" }
    const { dbBusiness: business } = await getBusinessById(user.businessId!)
    if (!business) return { error: "Business not found" }
    const { dbSubscription: subscription } = await getSubscriptionById(business.currentSubscriptionId!)
    if (!subscription) return { error: "Subscription not found" }
    return { user, business, subscription }
}

export async function editBusinessSettingsAction() {
    const { dbUser: user } = await getAuthUserDetails();
    if (!user) return { error: "User not found" }
    const { dbBusiness: business } = await getBusinessById(user.businessId!)
    if (!business) return { error: "Business not found" }
    return { user, business }
}