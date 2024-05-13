import NavigationBar from "@/app/site/_components/navigation/navigation-bar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <NavigationBar />
            {children}
        </section>
    );
}