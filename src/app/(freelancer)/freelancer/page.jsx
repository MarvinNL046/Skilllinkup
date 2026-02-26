import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import EmptyState from "@/components/ui/EmptyState";

export const metadata = {
    title: "Freelancer Profile | SkillLinkup",
    description: "View freelancer profiles on SkillLinkup.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <section className="pt60 pb90">
                <div className="container">
                    <EmptyState
                        icon="👤"
                        title="Freelancer not found"
                        description="This profile doesn't exist or has been removed."
                        actionLabel="Browse Freelancers"
                        actionHref="/freelancers"
                    />
                </div>
            </section>
            <Footer14 />
        </>
    );
}
