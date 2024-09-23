import { getDynamicFunnelAction } from "@/server/actions/public/dynamic"
import { redirect } from "next/navigation"


type DynamicFunnelPageProps = {
    params: {
      domain: string
      funnel: string
    }
  }

export default async function DynamicFunnelPage({ params }: DynamicFunnelPageProps) {
    const { domain, funnel } = params
    //console.log('domain', domain)
    const { path, error } = await getDynamicFunnelAction({ domainName: domain, funnelPath: funnel })
    const redirectUrl = `https://${domain}/${path}` //TODO add https

    if (error || !path) {
        return <div>404</div>
    }

    redirect(redirectUrl)
}