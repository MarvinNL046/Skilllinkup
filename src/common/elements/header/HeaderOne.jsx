'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import MobileMenu from './MobileMenu';
import Nav from './Nav';
import SocialData from '../../../data/social/SocialData.json';


const HeaderOne = ({pClass, darkLogo, lightLogo, postData}) => {
    const dateFormate = () => {
        var day = new Date().getDate();
        var month = new Date().toLocaleString("en-US", { month: "long" });
        var year = new Date().getFullYear();
        var todayDate = day + " " + month + "," + " " + year;
        return todayDate;
    };

    if (typeof window !== "undefined") {
        var colorMode = window.localStorage.getItem('color-mode');
    }

    const [showMMenu, SetShowMMenu] = useState(false);

    const MobileShowHandler = () => SetShowMMenu(true);
    const MobileHideHandler = () => SetShowMMenu(false);

    const [togglaClass, setTogglaClass] = useState(false);

   const toggleHandler = () => {
        setTogglaClass(active => !active);
   }

    return (
        <>
            <header className={`header axil-header header-style-3 ${pClass || ""}`}>
                {/* Header Top Bar */}
                <div className="header-top">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-8 col-sm-12">
                                <div className="header-top-bar d-flex flex-wrap align-items-center justify-content-center justify-content-md-start">
                                    <ul className="header-top-date liststyle d-flex flex-wrap align-items-center mr--20">
                                        <li>
                                            <Link href="#">{dateFormate()}</Link>
                                        </li>
                                    </ul>
                                    <ul className="header-top-nav liststyle d-flex flex-wrap align-items-center">
                                        <li>
                                            <Link href="/about">About</Link>
                                        </li>
                                        <li>
                                            <Link href="/contact">Contact</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog">Blog</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-12">
                                <ul className="social-share-transparent md-size justify-content-center justify-content-md-end">
                                    <li>
                                        <a href={SocialData.fb.url}>
                                            <i className={SocialData.fb.icon} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={SocialData.instagram.url}>
                                            <i className={SocialData.instagram.icon} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={SocialData.twitter.url}>
                                            <i className={SocialData.twitter.icon} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={SocialData.linked.url}>
                                            <i className={SocialData.linked.icon} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header Middle - Logo */}
                <div className="header-middle">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-12 text-center">
                                <div className="logo">
                                    <Link href="/">
                                        <Image
                                            className="dark-logo"
                                            width={200}
                                            height={113}
                                            src={(colorMode === "Dark" ? lightLogo || "/images/logo/Skilllinkup-whitebackground-logo.png" : darkLogo || "/images/logo/Skilllinkup_transparent-logo.png") || "/images/logo/Skilllinkup_transparent-logo.png" }
                                            alt="SkillLinkup logo"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header Bottom - Navigation */}
                <div className="header-bottom">
                    <div className="container">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-xl-8 col-12">
                                <div className="mainmenu-wrapper d-none d-xl-block">
                                    <nav className="mainmenu-nav">
                                        <Nav posts={postData}/>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-xl-4 col-12">
                                <div className="header-search d-flex flex-wrap align-items-center justify-content-center justify-content-xl-end">
                                    <form className="header-search-form d-sm-block d-none">
                                        <div className="axil-search form-group">
                                            <button type="submit" className="search-button">
                                                <i className="fal fa-search" />
                                            </button>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search"
                                            />
                                        </div>
                                    </form>
                                    <div className="mobile-search-wrapper d-sm-none d-block">
                                        <button className="search-button-toggle" onClick={toggleHandler}>
                                            <i className="fal fa-search" />
                                        </button>
                                        <form className={`header-search-form ${togglaClass ? "open": ""}`}>
                                            <div className="axil-search form-group">
                                                <button type="submit" className="search-button">
                                                    <i className="fal fa-search" />
                                                </button>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    {/* Start Hamburger Menu  */}
                                    <div className="hamburger-menu d-block d-xl-none">
                                        <div className="hamburger-inner">
                                            <div className="icon" onClick={MobileShowHandler}>
                                                <i className="fal fa-bars" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Hamburger Menu  */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <MobileMenu menuShow={showMMenu} menuHide={MobileHideHandler}/>
        </>
    )
}

export default HeaderOne;


