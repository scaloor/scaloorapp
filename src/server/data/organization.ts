import 'server-only';
import { db } from "@/server/db";
import { organization, InsertOrganization } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { canAccessOrganization, canCreateOrganization } from "@/server/authorization/organization";


/**
 * Find business object by id.
 * @param organization_id {number}
 * @returns {Organization}
 */
export async function getOrganizationById(organization_id: string) {
    try {
        const dbOrganization = await db.select().from(organization).where(
            eq(organization.id, organization_id)
        ).then(res => res[0]);
        return { dbOrganization }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

export async function addOrganization(organizationDetails: InsertOrganization, userId: string) {
    try {
        // Note: We might need a separate authorization check for adding a business
        if (!await canCreateOrganization(userId)) {
            return { error: "You are not authorized to add an organization" }
        }
        const insertOrganization = async (organizationDetails: InsertOrganization) => {
            return await db.insert(organization).values(organizationDetails).returning().then(res => res[0])
        }
        const dbOrganization = await insertOrganization(organizationDetails)

        return { dbOrganization }
    } catch (error: any) {
        console.log('Add Organization Error: ', error);
        return { error: error.message }
    }
}

export async function updateOrganization(organizationDetails: InsertOrganization) {
    try {
        if (!await canAccessOrganization(organizationDetails.id!)) {
            return { error: "You are not authorized to update this organization" }
        }
        const dbOrganization = await db
            .update(organization)
            .set({
                ...organizationDetails,
                updatedAt: new Date().toDateString(),
            })
            .where(eq(organization.id, organizationDetails.id!))
            .returning().then(res => res[0]);

        return { dbOrganization }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

export async function updateOrganizationSubscription(organizationId: string, subscriptionId: string | null) {
    try {
        await db
            .update(organization)
            .set({
                currentSubscriptionId: subscriptionId,
            })
            .where(eq(organization.id, organizationId));

        return { success: true }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

type UpdateOrganizationOptions = {
    id: string;
    name?: string;
    orgEmail?: string;
    orgLogo?: string;
    country?: string;
    currentSubscriptionId?: string;
    paymentsEnabled?: boolean;
    stripeAccountId?: string;
};

export async function updateOrganizationColumn(organizationDetails: UpdateOrganizationOptions) {
    try {
        const { dbOrganization } = await getOrganizationById(organizationDetails.id);
        if (!dbOrganization) {
            return { error: 'Organization not found' };
        }
        if (await canAccessOrganization(organizationDetails.id)) {
            const { id, ...updateData } = organizationDetails;
            const updatedOrganization = await db
                .update(organization)
                .set({
                    ...updateData,
                    updatedAt: new Date().toISOString(),
                })
                .where(eq(organization.id, id))
                .returning()
                .then(res => res[0]);
            return { dbOrganization: updatedOrganization };
        }
        return { error: 'You do not have access to update this organization' };
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
}

