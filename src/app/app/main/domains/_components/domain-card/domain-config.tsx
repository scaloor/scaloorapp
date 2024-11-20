'use client'

import React, { useState } from 'react'
import { type DomainConfig } from './index'

type DomainConfigProps = {
    domainConfig: DomainConfig
}

export default function DomainConfig({ domainConfig }: DomainConfigProps) {
    const [recordType, setRecordType] = useState<'CNAME' | 'A'>('CNAME')
    const subdomain = domainConfig.apex === domainConfig.name ? 'www' : domainConfig.name.replace(`.${domainConfig.apex}`, '')

    return (
        <>
            <div className="w-full border-t border-gray-100 mt-2 mb-8" />

            <div className="">
                <div className="flex justify-start space-x-4">
                    <button
                        onClick={() => setRecordType('CNAME')}
                        className={`${recordType == 'CNAME'
                                ? 'text-black border-black'
                                : 'text-gray-400 border-white'
                            } text-sm border-b-2 pb-1 transition-all ease duration-150`}
                    >
                        CNAME Record (subdomains)
                    </button>
                    <button
                        onClick={() => setRecordType('A')}
                        className={`${recordType == 'A'
                                ? 'text-black border-black'
                                : 'text-gray-400 border-white'
                            } text-sm border-b-2 pb-1 transition-all ease duration-150`}
                    >
                        A Record (apex domain)
                    </button>
                </div>
                <div className="my-3 text-left">
                    <p className="my-5 text-sm">
                        Set the following record on your DNS provider to continue:
                    </p>
                    <div className="flex justify-start items-center space-x-10 bg-gray-50 p-2 rounded-md">
                        <div>
                            <p className="text-sm font-bold">Type</p>
                            <p className="text-sm font-mono mt-2">{recordType}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Name</p>
                            <p className="text-sm font-mono mt-2">
                                {recordType == 'CNAME' ? `${subdomain}` : '@'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Value</p>
                            <p className="text-sm font-mono mt-2">
                                {recordType == 'CNAME'
                                    ? `cname.vercel-dns.com`
                                    : `76.76.21.21`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}