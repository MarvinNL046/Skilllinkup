"use client";
import { useState } from "react";
import { toast } from "sonner";
import { about, category, support } from "@/data/footer";
import Link from "next/link";
import Image from "next/image";
import FooterSelect1 from "./ui/FooterSelect1";
import FooterSocial4 from "./ui/FooterSocial4";
import FooterSocial from "./ui/FooterSocial";
import FooterSocial2 from "./ui/FooterSocial2";
import FooterSocial3 from "./ui/FooterSocial3";

export default function Footer14() {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email address.");
            return;
        }
        toast.success("Thanks for subscribing! We'll keep you updated.");
        setEmail("");
    };

    return (
        <>
            <section className="footer-style1 at-home8 pb-0 pt60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="footer-widget mb-4 mb-lg-5">
                                <div className="mailchimp-widget mb90">
                                    <h6 className="title mb20">Subscribe</h6>
                                    <div className="mailchimp-style1 at-home20 bdrs12 overflow-hidden">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <button
                                            className="text-thm"
                                            type="submit"
                                            onClick={handleSubscribe}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col-auto">
                                        <div className="link-style1 at-home8 mb-3">
                                            <h6 className="mb25">About</h6>
                                            <div className="link-list">
                                                {about.map((item, i) => (
                                                    <Link
                                                        key={i}
                                                        href={item.path}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="link-style1 at-home8 mb-3">
                                            <h6 className="mb25">Categories</h6>
                                            <ul className="ps-0">
                                                {category.map((item, i) => (
                                                    <li key={i}>
                                                        <Link href={item.path}>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="link-style1 at-home8 mb-3">
                                            <h6 className=" mb25">Support</h6>
                                            <ul className="ps-0">
                                                {support.map((item, i) => (
                                                    <li key={i}>
                                                        <Link href={item.path}>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4 offset-xl-2">
                            <div className="footer-widget mb-4 mb-lg-5">
                                <Link className="footer-logo" href="/">
                                    <Image
                                        height={40}
                                        width={172}
                                        className="mb40 object-fit-contain"
                                        src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                                        alt="SkillLinkup"
                                    />
                                </Link>
                                <div className="row mb-4 mb-lg-5">
                                    <div className="col-auto">
                                        <div className="contact-info">
                                            <p className="info-title mb-2">
                                                Contact
                                            </p>
                                            <h5 className="info-mail">
                                                <Link href="mailto:info@skilllinkup.com">
                                                    info@skilllinkup.com
                                                </Link>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <FooterSocial3 />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container bdrt1 py-4">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="text-center text-lg-start">
                                <p className="copyright-text mb-0 at-home8 ff-heading">
                                    © {new Date().getFullYear()} SkillLinkup. All rights reserved.
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="footer_bottom_right_btns at-home8 text-center text-lg-end">
                                <FooterSelect1 />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
