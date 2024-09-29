'use client'

import { Button } from '@/app/_components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/_components/ui/select'
import { updateFunnelDomainAction } from '@/server/actions/funnel/domains'
import { SelectDomain } from '@/server/db/schema'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    domains: SelectDomain[]
    selectedDomain: string
    funnelId: string
}

export default function DomainSelect({ domains, selectedDomain, funnelId }: Props) {
    const [selectedDomainValue, setSelectedDomainValue] = useState<string>(selectedDomain)
    const router = useRouter()

    useEffect(() => {
        console.log(selectedDomainValue)
    }, [selectedDomainValue])

    const handleDomainChange = async (domainId: string, funnelId: string) => {
        const { success, error } = await updateFunnelDomainAction(domainId, funnelId)
        if (error) {
            toast.error(error)
        }
        if (success) {
            toast.success('Domain updated')
        }
        router.refresh()
    }

    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-medium'>Funnel Domain</h3>
            <div className='max-w-md'>
                <Select onValueChange={setSelectedDomainValue} value={selectedDomainValue}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select a domain' />
                    </SelectTrigger>
                    <SelectContent>
                        {domains.map((domain) => (
                            <SelectItem key={domain.id} value={domain.id}>
                                {domain.domain}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='flex justify-end'>
                <Button onClick={() => handleDomainChange(selectedDomainValue, funnelId)}>Choose Domain</Button>
            </div>
        </div>
    )
}