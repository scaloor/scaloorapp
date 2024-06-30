import AuthenicatedRoute from "../auth/provider/authenticated-route";
import React from "react";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenicatedRoute>
            {children}
        </AuthenicatedRoute>
    );
}