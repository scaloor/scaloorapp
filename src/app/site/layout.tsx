import NavigationBar from "@/app/site/_components/navigation/navigation-bar";
import Footer from "./_components/footer";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <NavigationBar />
            {children}
            <Footer />
        </section>
    );
}