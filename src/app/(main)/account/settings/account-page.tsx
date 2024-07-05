import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { Business, User } from '@/server/db/types'
import React from 'react'

type AccountPageProps = {
    user: User
    business: Business
}

export default function AccountPage({ user, business }: AccountPageProps) {

    return (
        <div className='flex flex-col gap-4 justify-center px-5 w-full'>
            <h4>Account</h4>
            <div className='w-full flex justify-between gap-2'>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>User Details</CardTitle>
                    </CardHeader>
                    <CardContent className='my-4'>
                        <div className='mb-4'>
                            <Label>Email:</Label>
                            <Input className='mt-2' value={user.email} disabled />
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='gap-2 w-full'>
                                <Label>First Name:</Label>
                                <Input className='mt-2' value={user.firstName} disabled />
                            </div>
                            <div className='gap-2 w-full'>
                                <Label>Last Name:</Label>
                                <Input className='mt-2' value={user.lastName} disabled />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>Business Details</CardTitle>
                    </CardHeader>
                    <CardContent className='my-4'>
                        <div className='mb-4'>
                            <Label>Name:</Label>
                            <Input className='mt-2' value={business.name} disabled />
                        </div>
                        <div className='mb-4'>
                            <Label>Business Email:</Label>
                            <Input className='mt-2' value={business.businessEmail} disabled />
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col'>
                                <Label>Business Phone:</Label>
                                <Input className='mt-2' value={business.businessEmail} disabled />
                            </div>
                            <div className='flex flex-col'>
                                <Label>Business Address:</Label>
                                <Input className='mt-2' value={business.address!} disabled />
                            </div>
                            <div className='flex flex-col'>
                                <Label>City/Town:</Label>
                                <Input className='mt-2' value={business.city!} disabled />
                            </div>
                            <div className='flex flex-col'>
                                <Label>Post or Zip Code:</Label>
                                <Input className='mt-2' value={business.postCode!} disabled />
                            </div>
                            <div className='flex flex-col'>
                                <Label>State:</Label>
                                <Input className='mt-2' value={business.state!} disabled />
                            </div>
                            <div className='flex flex-col'>
                                <Label>Country:</Label>
                                <Input className='mt-2' value={business.country!} disabled />
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}