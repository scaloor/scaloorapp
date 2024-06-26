import { AuthenicatedRoute } from "../auth/provider/authenticated-route";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenicatedRoute>
            {children}
        </AuthenicatedRoute>
    );
}