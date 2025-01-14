import useSWR from 'swr'
import useUserStore from '../stores/user-store'
import useOrganizationStore from '../stores/organization-store'
import { getAuthUserDetails } from '@/server/actions/protected/users'

export function useAppStore() {
    const setUser = useUserStore((state) => state.setUser)
    const setOrganizations = useOrganizationStore((state) => state.setOrganizations)
    const user = useUserStore((state) => state.user)
    const organizations = useOrganizationStore((state) => state.organizations)

    const { data, error, isLoading, mutate } = useSWR('app-details', getAuthUserDetails, {
        refreshInterval: 10 * 60 * 1000,
        isPaused: () => !!user && !!organizations?.length,
        onSuccess: (data) => {
            if (data.dbUser) setUser(data.dbUser)
            if (data.dbOrganization) setOrganizations([data.dbOrganization])
        }
    })

    return {
        user,
        organizations,
        error,
        isLoading: !user && !organizations?.length,
        refresh: mutate
    }
}