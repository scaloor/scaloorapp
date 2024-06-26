'use client';

import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<User | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined)
    const supabase = createClient()

    useEffect(() => {
        const setData = async () => {
            try {
                const { data } = await supabase.auth.getUser()
                if (data.user) {
                    setUser(data.user)
                }
            } catch (error) {
                throw new Error('Error fetching user data');
            }
        }
        setData();
    }, [])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

export const useClientAuth = () => {
    return useContext(AuthContext);
}