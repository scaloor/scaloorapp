'use server'
import { capitalizeFirstLetter } from "@/lib/utils";
import { addOrganization } from "@/server/data/organization";
import { updateUserColumns } from "@/server/data/users";
import { stripeSession } from "../stripe";

export async function createOrganization(
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

    const organizationDetails = {
        name,
        orgEmail: email,
        country: countryCapitalized,
        orgLogo: logo,
    }

    const { dbOrganization } = await addOrganization(organizationDetails, userId);
    if (!dbOrganization) return { error: "Unable to create organization" }

    const { dbUser, error: userError } = await updateUserColumns({
        id: userId,
        organizationId: dbOrganization.id
    })
    if (userError) return { error: userError }
    if (!dbUser) return { error: "Unable to update user" }

    const url = await stripeSession('funnels');
    if (!url) return { error: "Unable to create subscription" }

    return { url }
}
