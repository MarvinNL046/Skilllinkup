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
                <Link href="/platforms">
                    <span className="hover-flip-item">
                        <span data-text="Platforms">Platforms</span>
                    </span>
                </Link>
            </li>
            <li>
                <Link href="/comments">
                    <span className="hover-flip-item">
                        <span data-text="Comments">Comments</span>
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
