'use server'
import { capitalizeFirstLetter } from "@/lib/utils";
import { addBusiness } from "@/server/data/business";
import { updateUserColumns } from "@/server/data/users";
import { stripeSession } from "../stripe";

export async function createBusiness(
    {
        name,
        email,
        country,
        logo,
        userId
    }: {
        name: string;
        email: string;
        country: string;
        logo: string;
        userId: string;
    }
) {
    const countryCapitalized = capitalizeFirstLetter(country)

    const businessDetails = {
        name,
        businessEmail: email,
        country: countryCapitalized,
        businessLogo: logo,
    }

    const { dbBusiness } = await addBusiness(businessDetails, userId);
    if (!dbBusiness) return { error: "Unable to create business" }

    const { dbUser, error: userError } = await updateUserColumns({
        id: userId,
        businessId: dbBusiness.id
    })
    if (userError) return { error: userError }
    if (!dbUser) return { error: "Unable to update user" }

    const url = await stripeSession('funnels');
    if (!url) return { error: "Unable to create subscription" }

    return { url }
}
