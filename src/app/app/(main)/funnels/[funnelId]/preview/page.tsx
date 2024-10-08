import { getFirstPageAction } from "@/server/actions/protected/funnel/preview"
import { redirect } from "next/navigation"


type PreviewRouteProps = {
    params: {
        funnelId: string
    }
}

export default async function PreviewRoute({ params }: PreviewRouteProps) {
    const { funnelId } = params
    const { pathName } = await getFirstPageAction(funnelId)
    redirect(`/funnels/${funnelId}/preview/${pathName}`)
}