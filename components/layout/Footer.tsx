"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const aboutLinks = [
  { name: "About Us", path: "/about" },
  { name: "Platforms", path: "/platforms" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const categoryLinks = [
  { name: "Web Development", path: "/services?category=web-development" },
  { name: "Design", path: "/services?category=design" },
  { name: "Marketing", path: "/services?category=marketing" },
  { name: "Writing", path: "/services?category=writing" },
];

const supportLinks = [
  { name: "Help & Support", path: "/contact" },
  { name: "FAQ", path: "/faq" },
  { name: "Terms of Service", path: "/terms" },
  { name: "Privacy Policy", path: "/privacy" },
];

export default function Footer() {
  const locale = useLocale();
  const localePath = (p: string) => `/${locale}${p}`;

  return (
    <section className="footer-style1 at-home8 pb-0 pt60">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="footer-widget mb-4 mb-lg-5">
              <div className="mailchimp-widget mb90">
                <h6 className="title mb20">Subscribe</h6>
                <div className="mailchimp-style1 at-home20 bdrs12 overflow-hidden">
                  <input type="email" className="form-control" placeholder="Your email address" />
                  <button className="text-thm" type="submit">Send</button>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-auto">
                  <div className="link-style1 at-home8 mb-3">
                    <h6 className="mb25">About</h6>
                    <div className="link-list">
                      {aboutLinks.map((item, i) => (
                        <Link key={i} href={localePath(item.path)}>{item.name}</Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="link-style1 at-home8 mb-3">
                    <h6 className="mb25">Categories</h6>
                    <ul className="ps-0">
                      {categoryLinks.map((item, i) => (
                        <li key={i}><Link href={localePath(item.path)}>{item.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="link-style1 at-home8 mb-3">
                    <h6 className="mb25">Support</h6>
                    <ul className="ps-0">
                      {supportLinks.map((item, i) => (
                        <li key={i}><Link href={localePath(item.path)}>{item.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-4 offset-xl-2">
            <div className="footer-widget mb-4 mb-lg-5">
              <Link className="footer-logo" href={localePath("/")}>
                <Image height={40} width={133} className="mb40 object-fit-contain" src="/images/header-logo2.svg" alt="SkillLinkup" />
              </Link>
              <div className="row mb-4 mb-lg-5">
                <div className="col-auto">
                  <div className="contact-info">
                    <p className="info-title mb-2">Need help?</p>
                    <h5 className="info-mail">
                      <Link href="mailto:info@skilllinkup.com">info@skilllinkup.com</Link>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="social-widget">
                <div className="social-style1">
                  <Link href="#"><i className="fab fa-facebook-f" /></Link>
                  <Link href="#"><i className="fab fa-twitter" /></Link>
                  <Link href="#"><i className="fab fa-instagram" /></Link>
                  <Link href="#"><i className="fab fa-linkedin-in" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container bdrt1 py-4">
        <div className="row">
          <div className="col-sm-6">
            <div className="text-center text-lg-start">
              <p className="copyright-text mb-0 at-home8 ff-heading">
                &copy; SkillLinkup {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="footer_bottom_right_btns at-home8 text-center text-lg-end">
              <Link href={localePath("/terms")} className="me-3">Terms</Link>
              <Link href={localePath("/privacy")}>Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
