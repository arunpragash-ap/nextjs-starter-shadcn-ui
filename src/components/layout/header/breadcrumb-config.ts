// Breadcrumb configuration for the app
// Maps path segments to { label, href }
interface BreadcrumbItem {
  label: string;
  href?: string;
  isLast?: boolean;
}

const breadcrumbConfig: Record<string, BreadcrumbItem> = {
  '': { label: 'Home', href: '/' },
  dashboard: { label: 'Dashboard', href: '/dashboard' },
  'lemon-send': { label: 'Lemon Send', href: '/lemon-send' },
  bill: { label: 'Bill', href: '/bill' },
  expense: { label: 'Expense', href: '/expense' },
  income: { label: 'Income', href: '/income' },
  workspace: { label: 'Workspace', href: '/workspace' },
  // Add more as needed
};

export default breadcrumbConfig;
export type { BreadcrumbItem }; 