import Link from 'next/link'

const Nav = () => {
    
    return (
        <ul className="mainmenu">
            <li>
                <Link href="/">
                    <span className="hover-flip-item">
                        <span data-text="Home">Home</span>
                    </span>
                </Link>
            </li>
            <li>
                <Link href="/blog">
                    <span className="hover-flip-item">
                        <span data-text="Blog">Blog</span>
                    </span>
                </Link>
            </li>
            <li>
                <Link href="/post/4-types-of-research-methods-all-designers">
                    <span className="hover-flip-item">
                        <span data-text="Posts">Posts</span>
                    </span>
                </Link>
            </li>
            <li>
                <Link href="/about">
                    <span className="hover-flip-item">
                        <span data-text="About">About</span>
                    </span>
                </Link>
            </li>
            <li>
                <Link href="/contact">
                    <span className="hover-flip-item">
                        <span data-text="Contact">Contact</span>
                    </span>
                </Link>
            </li>
        </ul>
    );
}

export default Nav;
