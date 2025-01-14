'use server'

import { capitalizeFirstLetter } from "@/lib/utils";
import { updateOrganizationColumn } from "@/server/data/organization";

export async function editOrganizationAction(
    {
        id,
        name,
        email,
        country,
        logo
    }: {
        id: string;
        name: string;
        email: string;
        country: string;
        logo?: string;
    }
) {
    const countryCapitalized = capitalizeFirstLetter(country);
    const { error } = await updateOrganizationColumn({
        id,
        name,
        orgEmail: email,
        country: countryCapitalized,
        orgLogo: logo,
    })

    if (error) {
        return { error: error.message }
    }
    return { success: "Organization updated successfully" }
}