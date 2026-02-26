const menus = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Browse",
    children: [
      { id: 1, name: "Services", path: "/services" },
      { id: 2, name: "Projects", path: "/projects" },
      { id: 3, name: "Jobs", path: "/jobs" },
      { id: 4, name: "Freelancers", path: "/freelancers" },
    ],
  },
  {
    id: 3,
    name: "About",
    children: [
      { id: 1, name: "About Us", path: "/about" },
      { id: 2, name: "Pricing", path: "/pricing" },
      { id: 3, name: "FAQ", path: "/faq" },
      { id: 4, name: "Help", path: "/help" },
      { id: 5, name: "Blog", path: "/blog" },
    ],
  },
  {
    id: 4,
    name: "Contact",
    path: "/contact",
  },
];

export default menus;
