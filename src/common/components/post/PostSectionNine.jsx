import Link from "next/link";
import Image from "next/image";
import { slugify } from '../../utils/functions';

const PostSectionNine = ({ postData, bgColor }) => {

  const firstPost = postData[0];

  return (
    <div className={`axil-tech-post-banner ${bgColor || "bg-color-grey"}`}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-12 col-12 mt--30">
            <div className="content-block post-grid post-grid-transparent">
            {firstPost.featureImg ? 
              <div className="post-thumbnail">
                <Link href={`/post/${firstPost.slug}`}>
                    <Image
                      src={firstPost.featureImg}
                      alt={firstPost.title}
                      height={600}
                      width={600}
                      priority={true}
                    />
                  </Link>
              </div>:""}
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
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-md-6 col-12">
            <div className="row">
              {postData.slice(1, 5).map((data) => (
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--30" key={data.slug}>
                  <div className="content-block post-default image-rounded">
                  {data.featureImg ? 
                    <div className="post-thumbnail">
                      <Link href={`/post/${data.slug}`}>
                        <Image
                          src={data.featureImg}
                          alt={data.title}
                          height={190}
                          width={285}
                          priority={true}
                        />
                      </Link>
                    </div>
                    :""}
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
                      <h5 className="title">
                      <Link href={`/post/${data.slug}`}>{data.title}</Link>
                      </h5>
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

export default PostSectionNine;
