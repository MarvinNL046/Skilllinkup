export interface NavItem {
  id: number;
  label: string;
  icon: string;
  href: string;
  roles?: ('freelancer' | 'client')[];
}

export const dashboardNavigation: NavItem[] = [
  // START section
  { id: 1, label: 'Dashboard', icon: 'flaticon-home', href: '/dashboard' },
  { id: 2, label: 'My Proposals', icon: 'flaticon-document', href: '/dashboard/proposals', roles: ['freelancer'] },
  { id: 3, label: 'Saved', icon: 'flaticon-like', href: '/dashboard/saved' },
  { id: 4, label: 'Message', icon: 'flaticon-chat', href: '/dashboard/messages' },
  { id: 5, label: 'Reviews', icon: 'flaticon-review-1', href: '/dashboard/reviews' },
  { id: 6, label: 'Invoice', icon: 'flaticon-receipt', href: '/dashboard/invoice' },
  { id: 7, label: 'Payouts', icon: 'flaticon-dollar', href: '/dashboard/payouts', roles: ['freelancer'] },
  { id: 8, label: 'Statements', icon: 'flaticon-web', href: '/dashboard/statements' },
  // ORGANIZE & MANAGE section
  { id: 9, label: 'Manage Services', icon: 'flaticon-presentation', href: '/dashboard/manage-services', roles: ['freelancer'] },
  { id: 10, label: 'Manage Jobs', icon: 'flaticon-briefcase', href: '/dashboard/manage-jobs', roles: ['client'] },
  { id: 11, label: 'Manage Projects', icon: 'flaticon-content', href: '/dashboard/manage-projects', roles: ['client'] },
  { id: 12, label: 'Add Services', icon: 'flaticon-document', href: '/dashboard/add-services', roles: ['freelancer'] },
  { id: 13, label: 'Create Project', icon: 'flaticon-content', href: '/dashboard/create-projects', roles: ['client'] },
  // ACCOUNT section
  { id: 14, label: 'My Profile', icon: 'flaticon-photo', href: '/dashboard/my-profile' },
  { id: 15, label: 'Logout', icon: 'flaticon-logout', href: '/sign-out' },
];

export const navigationSections = [
  { title: 'Start', items: [1, 2, 3, 4, 5, 6, 7, 8] },
  { title: 'Organize and Manage', items: [9, 10, 11, 12, 13] },
  { title: 'Account', items: [14, 15] },
];
