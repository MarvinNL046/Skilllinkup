import InstagramOne from "../../src/common/components/instagram/InstagramOne";
import FooterThree from "../../src/common/elements/footer/FooterThree";
import HeaderOne from "../../src/common/elements/header/HeaderOne";
import { getAllPosts } from '../../lib/api';
import SidebarOne from "../../src/common/components/sidebar/SidebarOne";
import BlogList from "./BlogList";
import { SortingByDate } from "../../src/common/utils/functions";

export const metadata = {
  title: 'Blog - SkillLinkup',
  description: 'Browse our latest articles and insights',
}

export default function BlogPage() {
    const allPosts = getAllPosts([
        'id',
        'title',
        'featureImg',
        'featured',
        'sticky',
        'postFormat',
        'playBtn',
        'date',
        'slug',
        'cate',
        'cate_img',
        'author_img',
        'author_name',
        'post_views',
        'read_time',
        'author_social',
    ])

    const sortedPosts = SortingByDate(allPosts);

    return (
        <>
            <HeaderOne
                pClass="header-light header-sticky header-with-shadow"
                darkLogo="/images/logo/logo-black.webp"
                lightLogo="/images/logo/logo-white.webp"
                postData={sortedPosts}
            />
            <div className="axil-post-list-area axil-section-gap bg-color-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-xl-8">
                            <BlogList allPosts={sortedPosts} />
                        </div>
                        <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                            <SidebarOne dataPost={sortedPosts} />
                        </div>
                    </div>
                </div>
            </div>
            <InstagramOne parentClass="bg-color-grey" />
            <FooterThree
                bgColor="bg-color-grey"
                darkLogo="/images/logo/logo-black.webp"
                lightLogo="/images/logo/logo-white.webp"
            />
        </>
    );
}
