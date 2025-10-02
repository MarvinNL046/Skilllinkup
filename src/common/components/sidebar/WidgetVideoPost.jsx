import Link from "next/link";
import Image from "next/image";

const WidgetVideoPost = ({ postData }) => {
    
    const videoPost = postData.filter((post) => post.postFormat === "video");
    
  return (
    <div className="axil-single-widget widget-style-2 widget widget_post mt--30">
      <h5 className="widget-title">Featured Videos</h5>
      <div className="video-post-wrapepr">
        {videoPost.slice(0, 3).map((data) => (
          <div className="content-block image-rounded mt--20" key={data.slug}>
            {data.featureImg ? (
              <div className="post-thumbnail">
                <Link href={`/post/${data.slug}`}>
                    <Image
                      src={data.featureImg}
                      alt={data.title}
                      height={220}
                      width={330}
                      priority={true}
                    />
                  </Link>
                <Link href={`/post/${data.slug}`}>
                    <span className="play-icon" />
                  </Link>
              </div>
            ) : (
              ""
            )}
            <div className="post-content">
              <h6 className="title">
                <Link href={`/post/${data.slug}`}>{data.title}</Link>
              </h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetVideoPost;
