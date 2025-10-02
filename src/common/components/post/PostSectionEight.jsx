'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from '../../utils/functions';


const PostSectionEight = ({ postData }) => {
	// Handle empty postData gracefully
	if (!postData || postData.length === 0) {
		return (
			<div className="axil-seo-post-banner seoblog-banner axil-section-gap bg-color-grey">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<p className="text-center">No posts available yet.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const firstPost = postData[0];

  return (
    <div className="axil-seo-post-banner seoblog-banner axil-section-gap bg-color-grey">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-7 col-md-12 col-12">
            <div className="content-block post-grid post-grid-large">
            {firstPost.featureImg ? 
              <div className="post-thumbnail">
                <Link href={`/post/${firstPost.slug}`}>
                    <Image
                      src={firstPost.featureImg}
                      alt={firstPost.title}
                      height={600}
                      width={705}
                      priority={true}
                    />
                  </Link>
              </div>
              :""}
              <div className="post-grid-content">
                <div className="post-content">
                  <div className="post-cat">
                    <div className="post-cat-list">
                      <Link href={`/category/${slugify(firstPost.cate)}`}>
                          <span className="hover-flip-item">
                            <span data-text={firstPost.cate}>
                              {firstPost.cate}
                            </span>
                          </span>
                        </Link>
                    </div>
                  </div>
                  <h3 className="title">
                    <Link href={`/post/${firstPost.slug}`}>{firstPost.title}</Link>
                  </h3>
                  <div className="post-meta-wrapper">
                    <div className="post-meta">
                      <div className="post-author-avatar border-rounded">
                        <Image
                          src={firstPost.author_img}
                          alt={firstPost.author_name}
                          height={50}
                          width={50}
                        />
                      </div>
                      <div className="content">
                        <h6 className="post-author-name">
                          <Link href={`/author/${slugify(firstPost.author_name)}`}
                          >
                              <span className="hover-flip-item">
                                <span data-text={firstPost.author_name}>
                                  {firstPost.author_name}
                                </span>
                              </span>
                            </Link>
                        </h6>
                        <ul className="post-meta-list">
                          <li>{firstPost.date}</li>
                          <li>{firstPost.post_views}</li>
                        </ul>
                      </div>
                    </div>
                    {firstPost.author_social && firstPost.author_social.length > 0 && (
                      <ul className="social-share-transparent justify-content-end">
                        {firstPost.author_social.map((data) => (
                          <li key={data.url}>
                            <a href={data.url}>
                              <i className={data.icon} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-12 col-12 mt_md--30 mt_sm--30">
            <div className="row g-4">
			{postData.slice(1, 5).map((data) => (
				<div className="col-md-6 col-sm-6 col-12" key={data.slug}>
                  <div className="content-block post-grid post-grid-small">
          {data.featureImg ?
					<div className="post-thumbnail">
					<Link href={`/post/${data.slug}`}>
						<Image
						src={data.featureImg}
						alt={data.title}
						height={210}
						width={280}
						priority={true}
						/>
					</Link>
				</div>
        : ""}
				<div className="post-grid-content">
                  <div className="post-content">
					<div className="post-cat">
						<div className="post-cat-list">
						<Link href={`/category/${slugify(data.cate)}`}>
							<span className="hover-flip-item">
								<span data-text={data.cate}>
								{data.cate}
								</span>
							</span>
							</Link>
						</div>
					</div>
					<h4 className="title">
						<Link href={`/post/${data.slug}`}>{data.title}</Link>
					</h4>
				</div>
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

export default PostSectionEight;
