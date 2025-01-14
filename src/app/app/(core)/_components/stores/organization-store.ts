import { SelectOrganization } from "@/server/db/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware"

type OrganizationStore = {
    organizations: SelectOrganization[] | null;
    setOrganizations: (organizations: SelectOrganization[]) => void;
}

const useOrganizationStore = create<OrganizationStore>()(
    persist(
        (set) => ({
            organizations: null,
            setOrganizations: (organizations: SelectOrganization[]) => set({ organizations }),
        }),
        {
            name: 'org-storage', // unique name for localStorage key
        }
    )
);

export default useOrganizationStore;