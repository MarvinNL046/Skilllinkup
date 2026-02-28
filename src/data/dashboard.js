// ============================================================
// Shared nav items (reused across worlds)
// ============================================================
const _dashboard    = { id: 1,  name: "Dashboard",        icon: "flaticon-home",         path: "/dashboard" };
const _manageServ   = { id: 2,  name: "Manage Services",  icon: "flaticon-presentation", path: "/manage-services" };
const _addServ      = { id: 3,  name: "Add Services",     icon: "flaticon-document",     path: "/add-services" };
const _proposals    = { id: 4,  name: "My Proposals",     icon: "flaticon-document",     path: "/proposal" };
const _orders       = { id: 5,  name: "My Orders",        icon: "flaticon-receipt",      path: "/orders" };
const _message      = { id: 6,  name: "Message",          icon: "flaticon-chat",         path: "/message" };
const _reviews      = { id: 7,  name: "Reviews",          icon: "flaticon-review-1",     path: "/reviews" };
const _payouts      = { id: 8,  name: "Payouts",          icon: "flaticon-dollar",       path: "/payouts" };
const _statements   = { id: 9,  name: "Statements",       icon: "flaticon-web",          path: "/statements" };
const _invoice      = { id: 10, name: "Invoice",          icon: "flaticon-receipt",      path: "/invoice" };
const _profile      = { id: 11, name: "My Profile",       icon: "flaticon-photo",        path: "/my-profile" };
const _logout       = { id: 12, name: "Logout",           icon: "flaticon-logout",       path: "/login" };
const _credits      = { id: 13, name: "Credits",          icon: "flaticon-dollar",       path: "/dashboard/credits" };
const _leads        = { id: 14, name: "My Leads",         icon: "flaticon-place",        path: "/dashboard/my-leads" };
const _manageJobs   = { id: 15, name: "Manage Jobs",      icon: "flaticon-briefcase",    path: "/manage-jobs" };
const _myProjects   = { id: 16, name: "My Projects",      icon: "flaticon-content",      path: "/manage-projects" };
const _createProj   = { id: 17, name: "Create Project",   icon: "flaticon-content",      path: "/create-projects" };
const _saved        = { id: 18, name: "Saved",            icon: "flaticon-like",         path: "/saved" };
const _quoteReqs    = { id: 19, name: "My Quote Requests", icon: "flaticon-document",    path: "/dashboard/quote-requests" };

// ============================================================
// World-specific navigation: dashboardNavigation[role][world]
// Each entry has pre-split { start, organize, account } arrays
// ============================================================
export const dashboardNavigation = {
  freelancer: {
    online: {
      start:    [_dashboard, _manageServ, _addServ, _proposals, _orders],
      organize: [_message, _reviews, _payouts, _statements, _invoice],
      account:  [_profile],
    },
    local: {
      start:    [_dashboard, _leads, _credits, _orders],
      organize: [_message, _reviews, _payouts],
      account:  [_profile],
    },
    jobs: {
      start:    [_dashboard, _manageJobs, _proposals, _orders],
      organize: [_message, _reviews, _payouts],
      account:  [_profile],
    },
  },
  client: {
    online: {
      start:    [_dashboard, _myProjects, _createProj, _orders, _saved],
      organize: [_message, _reviews],
      account:  [_profile],
    },
    local: {
      start:    [_dashboard, _quoteReqs, _orders, _saved],
      organize: [_message, _reviews],
      account:  [_profile],
    },
    jobs: {
      start:    [_dashboard, _myProjects, _createProj, _orders, _saved],
      organize: [_message, _reviews],
      account:  [_profile],
    },
  },
};

// Backward compat: flat arrays = "online" world (default)
export const freelancerNavigation = [
  ...dashboardNavigation.freelancer.online.start,
  ...dashboardNavigation.freelancer.online.organize,
  ...dashboardNavigation.freelancer.online.account,
];

export const clientNavigation = [
  ...dashboardNavigation.client.online.start,
  ...dashboardNavigation.client.online.organize,
  ...dashboardNavigation.client.online.account,
];

export const dasboardNavigation = [
  _dashboard, _proposals, _orders, _saved, _message, _reviews,
  _invoice, _payouts, _statements, _manageServ, _manageJobs,
  _myProjects, _addServ, _createProj, _profile, _logout,
];

export const invoice = [
  {
    id: 1,
    invoiceId: 99,
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    amount: 1.2,
    status: 1,
  },
  {
    id: 2,
    invoiceId: 99,
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    amount: 1.2,
    status: 2,
  },
  {
    id: 3,
    invoiceId: 99,
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    amount: 1.2,
    status: 2,
  },
  {
    id: 4,
    invoiceId: 99,
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    amount: 1.2,
    status: 3,
  },
  {
    id: 5,
    invoiceId: 99,
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    amount: 1.2,
    status: 3,
  },
  {
    id: 6,
    invoiceId: 99,
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    amount: 1.2,
    status: 2,
  },
  {
    id: 7,
    invoiceId: 99,
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    amount: 1.2,
    status: 2,
  },
  {
    id: 8,
    invoiceId: 99,
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    amount: 1.2,
    status: 1,
  },
  {
    id: 9,
    invoiceId: 99,
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    amount: 1.2,
    status: 3,
  },
];

export const payout = [
  {
    id: 1,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Paypal",
    status: 1,
  },
  {
    id: 2,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Payoneer",
    status: 2,
  },
  {
    id: 3,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Bank Transfer",
    status: 2,
  },
  {
    id: 4,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Bank Transfer",
    status: 2,
  },
  {
    id: 5,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Paypal",
    status: 2,
  },
  {
    id: 6,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Bank Transfer",
    status: 2,
  },
  {
    id: 7,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Paypal",
    status: 1,
  },
  {
    id: 8,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Payoneer",
    status: 3,
  },
  {
    id: 9,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Payoneer",
    status: 1,
  },
  {
    id: 10,
    amount: 1.8,
    date: "April 9, 2023",
    method: "Paypal",
    status: 3,
  },
];

export const statement = [
  {
    id: 1,
    date: "April 9, 2023",
    type: 1,
    detail: "I will design website UI UX in adobe xd or figma",
    price: 829,
    amount: 829,
  },
  {
    id: 2,
    date: "April 9, 2023",
    type: 1,
    detail: "I will design website UI UX in adobe xd or figma",
    price: 829,
    amount: 829,
  },
  {
    id: 3,
    date: "April 9, 2023",
    type: 2,
    detail: "I will design website UI UX in adobe xd or figma",
    price: 829,
    amount: 829,
  },
  {
    id: 4,
    date: "April 9, 2023",
    type: 2,
    detail: "I will design website UI UX in adobe xd or figma",
    price: 829,
    amount: 829,
  },
  {
    id: 5,
    date: "April 9, 2023",
    type: 2,
    detail: "I will design website UI UX in adobe xd or figma",
    price: 829,
    amount: 829,
  },
  {
    id: 6,
    date: "April 9, 2023",
    type: 1,
    detail: "I will design website UI UX in adobe xd or figma",
    price: 829,
    amount: 829,
  },
  {
    id: 7,
    date: "April 9, 2023",
    type: 2,
    detail: "I will design website UI UX in adobe xd or figma",
    price: 829,
    amount: 829,
  },
  {
    id: 8,
    date: "April 9, 2023",
    type: 2,
    detail: "I will design website UI UX in adobe xd or figma",
    price: 829,
    amount: 829,
  },
];

export const manageService = [
  {
    id: 1,
    img: "/images/listings/g-1.jpg",
    title: "I will design modern websites in figma or adobe xd",
    list: [
      "Delivered within a day",
      "Delivery Time Decreased",
      "Upload apps to Stores",
    ],
    category: "Web & App Design",
    cost: 500,
  },
  {
    id: 2,
    img: "/images/listings/g-2.jpg",
    title: "I will design modern websites in figma or adobe xd",
    list: [
      "Delivered within a day",
      "Delivery Time Decreased",
      "Upload apps to Stores",
    ],
    category: "Web & App Design",
    cost: 500,
  },
  {
    id: 3,
    img: "/images/listings/g-3.jpg",
    title: "I will design modern websites in figma or adobe xd",
    list: [
      "Delivered within a day",
      "Delivery Time Decreased",
      "Upload apps to Stores",
    ],
    category: "Web & App Design",
    cost: 500,
  },
  {
    id: 4,
    img: "/images/listings/g-4.jpg",
    title: "I will design modern websites in figma or adobe xd",
    list: [
      "Delivered within a day",
      "Delivery Time Decreased",
      "Upload apps to Stores",
    ],
    category: "Web & App Design",
    cost: 500,
  },
  {
    id: 5,
    img: "/images/listings/g-5.jpg",
    title: "I will design modern websites in figma or adobe xd",
    list: [
      "Delivered within a day",
      "Delivery Time Decreased",
      "Upload apps to Stores",
    ],
    category: "Web & App Design",
    cost: 500,
  },
];

export const managejob = [
  {
    id: 1,
    img: "/images/team/client-2.png",
    title: "Marketing and Communications Manager",
    server: "Mailchimp",
    application: 3,
    created: "October 27, 2017",
    expired: "April 25, 2011",
    status: 1,
  },
  {
    id: 2,
    img: "/images/team/client-3.png",
    title: "Software Engineer",
    server: "Google",
    application: 10,
    created: "June 15, 2022",
    expired: "August 30, 2022",
    status: 1,
  },
  {
    id: 3,
    img: "/images/team/client-1.png",
    title: "Graphic Designer",
    server: "Adobe",
    application: 5,
    created: "April 8, 2023",
    expired: "July 15, 2023",
    status: 1,
  },
  {
    id: 4,
    img: "/images/team/client-4.png",
    title: "Sales Associate",
    server: "Salesforce",
    application: 2,
    created: "January 12, 2023",
    expired: "March 20, 2023",
    status: 1,
  },
  {
    id: 5,
    img: "/images/team/client-5.png",
    title: "Product Manager",
    server: "Amazon",
    application: 8,
    created: "September 5, 2022",
    expired: "December 10, 2022",
    status: 1,
  },
  {
    id: 6,
    img: "/images/team/client-6.png",
    title: "Customer Support Specialist",
    server: "Zendesk",
    application: 4,
    created: "March 20, 2023",
    expired: "June 30, 2023",
    status: 1,
  },
  {
    id: 7,
    img: "/images/team/client-7.png",
    title: "Data Analyst",
    server: "Microsoft",
    application: 6,
    created: "November 10, 2022",
    expired: "February 28, 2023",
    status: 1,
  },
];
