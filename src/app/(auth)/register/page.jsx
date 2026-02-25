"use client";
import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
    return (
        <>
            <div className="bgc-thm4">
                <Header20 />
                <section className="our-register">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 m-auto wow fadeInUp" data-wow-delay="300ms">
                                <div className="main-title text-center">
                                    <h2 className="title">Register</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row wow fadeInRight" data-wow-delay="300ms">
                            <div className="col-xl-6 mx-auto d-flex justify-content-center">
                                <SignUp
                                    routing="hash"
                                    afterSignUpUrl="/dashboard"
                                    signInUrl="/login"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
