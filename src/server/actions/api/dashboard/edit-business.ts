'use server'

import { capitalizeFirstLetter } from "@/lib/utils";
import { updateBusinessColumn } from "@/server/data/business";

export async function editBusinessAction(
    {
        id,
        name,
        businessEmail,
        country,
        businessLogo
    }: {
        id: string;
        name: string;
        businessEmail: string;
        country: string;
        businessLogo?: string;
    }
) {
    const countryCapitalized = capitalizeFirstLetter(country);
    const { error } = await updateBusinessColumn({
        id,
        name,
        businessEmail,
        country: countryCapitalized,
        businessLogo,
    })

    if (error) {
        return { error: error.message }
    }
    return { success: "Business updated successfully" }
}