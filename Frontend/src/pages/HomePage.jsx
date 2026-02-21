import Hero from "../components/homepage/Hero";
import SectionDivider from "../components/homepage/SectionDivider";
import Features from "../components/homepage/Features";
import FAQ from "../components/homepage/FAQ";
import HomepageFooter from "../components/homepage/HomepageFooter";

export default function HomePage() {
    return (
        <div className="min-h-screen w-full text-white relative bg-black -mt-16">
            <main className="flex max-w-screen-2xl mx-auto gap-4 flex-col items-center justify-between overflow-x-hidden relative z-10">
                {/* Hero Section */}
                <div className="relative overflow-hidden w-full">
                    <Hero />
                </div>

                <SectionDivider className="translate-y-5 mt-2" />

                {/* Features Section */}
                <div className="relative overflow-hidden w-full">
                    <div className="relative z-10 max-w-screen-2xl mx-auto">
                        <Features />
                    </div>
                </div>

                <SectionDivider />

                {/* FAQ Section */}
                <div className="relative overflow-hidden w-full">
                    <div className="max-w-screen-2xl mx-auto">
                        <FAQ />
                    </div>
                </div>

                <SectionDivider />

                {/* Footer */}
                <div className="relative overflow-hidden w-full">
                    <div className="relative z-10 max-w-screen-2xl mx-auto">
                        <HomepageFooter />
                    </div>
                </div>
            </main>
        </div>
    );
}
