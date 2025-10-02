'use client'

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { slugify } from '../../utils/functions';

const PostSeoHero = ({ postData }) => {
    // Get 1 featured post and 4 other posts
    const featuredPost = postData.filter(post => post.featured === true)[0];
    const sidePosts = postData.filter(post => post.featured !== true).slice(0, 4);

    if (!featuredPost) return null;

    return (
        <div className="axil-post-grid-area axil-section-gap bg-color-grey">
            <div className="container">
                <div className="row g-5">
                    {/* Main Featured Post - Left Side */}
                    <div className="col-lg-6">
                        <div className="content-block post-grid post-grid-large">
                            {/* Thumbnail */}
                            {featuredPost.featureImg && (
                                <div className="post-thumbnail">
                                    <Link href={`/post/${featuredPost.slug}`}>
                                        <Image
                                            src={featuredPost.featureImg}
                                            alt={featuredPost.title}
                                            width={600}
                                            height={450}
                                            priority
                                        />
                                    </Link>
                                </div>
                            )}

                            {/* Content */}
                            <div className="post-grid-content">
                                {/* Category */}
                                <div className="post-cat">
                                    <div className="post-cat-list">
                                        <Link href={`/category/${slugify(featuredPost.cate)}`}>
                                            <span className="hover-flip-item">
                                                <span data-text={featuredPost.cate}>{featuredPost.cate}</span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="title">
                                    <Link href={`/post/${featuredPost.slug}`}>
                                        {featuredPost.title}
                                    </Link>
                                </h3>

                                {/* Meta with Social Share */}
                                <div className="post-meta-wrapper with-button">
                                    <div className="post-meta">
                                        <div className="post-author-avatar border-rounded">
                                            <Image
                                                src={featuredPost.author_img}
                                                alt={featuredPost.author_name}
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="content">
                                            <h6 className="post-author-name">
                                                <Link href={`/author/${slugify(featuredPost.author_name)}`}>
                                                    <span className="hover-flip-item">
                                                        <span data-text={featuredPost.author_name}>
                                                            {featuredPost.author_name}
                                                        </span>
                                                    </span>
                                                </Link>
                                            </h6>
                                            <ul className="post-meta-list">
                                                <li>{featuredPost.date}</li>
                                                <li>{featuredPost.post_views}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Social Share Buttons */}
                                    <ul className="social-share-transparent justify-content-end">
                                        {featuredPost.author_social?.map((social, index) => (
                                            <li key={index}>
                                                <a href={social.url}>
                                                    <i className={social.icon} />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Posts Grid - Right Side */}
                    <div className="col-lg-6">
                        <div className="row g-4">
                            {sidePosts.map((post) => (
                                <div className="col-md-6" key={post.slug}>
                                    <div className="content-block post-grid post-grid-small">
                                        {/* Thumbnail */}
                                        {post.featureImg && (
                                            <div className="post-thumbnail">
                                                <Link href={`/post/${post.slug}`}>
                                                    <Image
                                                        src={post.featureImg}
                                                        alt={post.title}
                                                        width={280}
                                                        height={210}
                                                    />
                                                </Link>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="post-grid-content">
                                            {/* Category */}
                                            <div className="post-cat">
                                                <div className="post-cat-list">
                                                    <Link href={`/category/${slugify(post.cate)}`}>
                                                        <span className="hover-flip-item">
                                                            <span data-text={post.cate}>{post.cate}</span>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h4 className="title">
                                                <Link href={`/post/${post.slug}`}>
                                                    {post.title}
                                                </Link>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostSeoHero;
