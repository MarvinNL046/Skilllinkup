'use client'

import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import PostLayoutTwo from "../../src/common/components/post/layout/PostLayoutTwo";

export default function BlogList({ allPosts }: { allPosts: any[] }) {
    const [pageNumber, setPageNumber] = useState(0);

    const blogsPerPage = 5;
    const pageVisited = pageNumber * blogsPerPage;
    const pageCount = Math.ceil(allPosts.length / blogsPerPage);

    const changePage = ({selected}: {selected: number}) => {
        setPageNumber(selected);
    }

    return (
        <>
            <PostLayoutTwo
                dataPost={allPosts}
                show={pageVisited + blogsPerPage}
                postStart={pageVisited}
                bgColor="bg-color-white"
            />

            <ReactPaginate
                previousLabel={<i className="fas fa-arrow-left"></i>}
                nextLabel={<i className="fas fa-arrow-right"></i>}
                pageCount= {pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"prev"}
                nextLinkClassName={"next"}
                disabledClassName={"disabled"}
                activeClassName={"current"}
            />
        </>
    );
}
