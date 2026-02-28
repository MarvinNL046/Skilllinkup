"use client";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    return (
        <>
            <div style={{ backgroundColor: "#fff" }}>
                <Header20 />
                <section className="our-login">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 m-auto wow fadeInUp" data-wow-delay="300ms">
                                <div className="main-title text-center">
                                    <h2 className="title">Log In</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row wow fadeInRight" data-wow-delay="300ms">
                            <div className="col-xl-6 mx-auto d-flex justify-content-center">
                                <SignIn
                                    routing="hash"
                                    fallbackRedirectUrl="/dashboard"
                                    signUpUrl="/register"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer14 />
            </div>
        </>
    );
}
