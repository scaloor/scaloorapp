import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper'
import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { formatDate } from '@/lib/utils'
import { InsertUser, InsertBusiness, SelectSubscription } from '@/server/db/schema'
import { Briefcase, BriefcaseBusiness, CircleDollarSign, Clock, CreditCard, Globe, Mail, UserCircle } from 'lucide-react'
import React from 'react'

type AccountPageProps = {
    user: InsertUser
    business: InsertBusiness
    subscription: SelectSubscription
}

export default function AccountPage({ user, business, subscription }: AccountPageProps) {

    // User details
    const capitalizedFirstName = user.firstName[0].toLocaleUpperCase() + user.firstName.slice(1).toLocaleLowerCase()
    const capitalizedLastName = user.lastName[0].toLocaleUpperCase() + user.lastName.slice(1).toLocaleLowerCase()
    const userSince = new Date(user.createdAt!).toUTCString();

    return (
        <MaxWidthWrapper>
            <div className='flex flex-col gap-4 justify-center px-5 mt-5'>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <Avatar>
                            <AvatarFallback>{user.firstName[0].toLocaleUpperCase()}{user.lastName[0].toLocaleUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h4 className='ml-2'>{capitalizedFirstName} {capitalizedLastName}</h4>

                    </div>
                    <div className='flex items-center'>
                        <Button className='dark:text-white h-8'>
                            Edit User
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col gap-4 justify-center'>
                    <Card className='w-full'>
                        <CardContent className='grid grid-cols-2 py-4'>
                            <div className='flex items-center mb-4 gap-2 text-sm'>
                                <UserCircle className='mr-2 h-5 w-5' />
                                <p className='font-semibold'>User ID</p>
                                <p className='text-muted-foreground'>{user.id}</p>
                            </div>
                            <div className='flex items-center mb-4 gap-2 text-sm'>
                                <Mail className='mr-2 h-5 w-5' />
                                <p className='font-semibold'>Email</p>
                                <p className='text-muted-foreground'>{user.email}</p>
                            </div>
                            <div>
                                <div className='flex items-center mb-4 gap-2 text-sm'>
                                    <Clock className='mr-2 h-5 w-5' />
                                    <p className='font-semibold'>Scaloor since</p>
                                    <p className='text-muted-foreground'>{userSince}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className='flex justify-between my-4'>
                        <div className='flex flex-col ml-2'>
                            <h4>{business.name}</h4>
                            {business.stripeAccountId ? <Badge className='dark:text-white w-fit mt-2'>Stripe Connected</Badge> : <Badge variant={'destructive'} className='dark:text-white w-fit mt-2'>Stripe Not Connected</Badge>}
                        </div>
                        <div className='flex gap-2 items-center'>
                            {business.stripeAccountId ?? <Button className='dark:text-white h-8'>Connect Stripe</Button>}
                            <Button className='dark:text-white h-8'>
                                Edit Business
                            </Button>
                        </div>
                    </div>
                    <Card className='w-full'>
                        <CardContent className='grid grid-cols-2 py-4'>
                            <div className='flex items-center mb-4 gap-2 text-sm'>
                                <Briefcase className='mr-2 h-5 w-5' />
                                <p className='font-semibold'>Business ID</p>
                                <p className='text-muted-foreground'>{business.id}</p>
                            </div>
                            <div className='flex items-center mb-4 gap-2 text-sm'>
                                <Mail className='mr-2 h-5 w-5' />
                                <p className='font-semibold'>Business Email</p>
                                <p className='text-muted-foreground'>{business.businessEmail}</p>
                            </div>
                            <div>
                                <div className='flex items-center mb-4 gap-2 text-sm'>
                                    <CircleDollarSign className='mr-2 h-5 w-5' />
                                    <p className='font-semibold'>Stripe account ID</p>
                                    <p className='text-muted-foreground'>{business.stripeAccountId ? business.stripeAccountId : 'You haven\'t connected your Stripe account yet'}</p>
                                </div>
                            </div>
                            <div className='flex items-center mb-4 gap-2 text-sm'>
                                <Globe className='mr-2 h-5 w-5' />
                                <p className='font-semibold'>Country</p>
                                <p className='text-muted-foreground'>{business.country ? business.country : 'Not set'}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <div className='flex justify-between my-4'>
                        <div className='flex flex-col ml-2'>
                            <h4>Subscription Details</h4>
                            {subscription.stripeSubscriptionId ? <Badge className='dark:text-white w-fit mt-2'>Subscribed</Badge> : <Badge variant={'destructive'} className='dark:text-white w-fit mt-2'>Not Subscribed</Badge>}
                        </div>
                        <div className='flex gap-2 items-center'>

                            <Button className='dark:text-white h-8'>
                                Manage Subscription
                            </Button>
                        </div>
                    </div>
                    <Card className='w-full'>
                        <CardContent className='grid grid-cols-2 py-4'>
                            <div className='flex items-center mb-4 gap-2 text-sm'>
                                <CreditCard className='mr-2 h-5 w-5' />
                                <p className='font-semibold'>Subscription Id</p>
                                <p className='text-muted-foreground'>{business.currentSubscriptionId ? business.currentSubscriptionId : 'Not subscribed!'}</p>
                            </div>
                            <div className='flex items-center mb-4 gap-2 text-sm'>
                                <CreditCard className='mr-2 h-5 w-5' />
                                <p className='font-semibold'>Plan</p>
                                <p className='text-muted-foreground'>{subscription.plan}</p>
                            </div>
                            <div className='flex items-center mb-4 gap-2 text-sm'>
                                <CreditCard className='mr-2 h-5 w-5' />
                                <p className='font-semibold'>Next Billing Date</p>
                                <p className='text-muted-foreground'>{formatDate(new Date(subscription.currentPeriodEndDate))}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}