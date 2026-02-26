import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import EmptyState from "@/components/ui/EmptyState";

export const metadata = {
    title: "Blog Post | SkillLinkup",
    description: "Read articles and guides on the SkillLinkup blog.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <section className="pt60 pb90">
                <div className="container">
                    <EmptyState
                        icon="📝"
                        title="Post not found"
                        description="This blog post doesn't exist or has been removed."
                        actionLabel="Back to Blog"
                        actionHref="/blog"
                    />
                </div>
            </section>
            <Footer14 />
        </>
    );
}
