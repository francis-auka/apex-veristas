// ─── Navigation ───────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Solutions",       href: "/solutions" },
  { label: "Industries",      href: "/industries" },
  { label: "Compliance Hub",  href: "/compliance-hub" },
  { label: "Resources",       href: "/resources" },
  { label: "Templates",       href: "/templates" },
  { label: "Pricing",         href: "/pricing" },
  { label: "About",           href: "/about" },
  { label: "Contact",         href: "/contact" },
] as const;

export const PORTAL_NAV = [
  { label: "Dashboard",   href: "/portal",              icon: "LayoutDashboard" },
  { label: "Compliance",  href: "/portal/compliance",   icon: "ShieldCheck"    },
  { label: "Documents",   href: "/portal/documents",    icon: "FolderOpen"     },
  { label: "Audits",      href: "/portal/audits",       icon: "ClipboardList"  },
  { label: "Incidents",   href: "/portal/incidents",    icon: "AlertTriangle"  },
  { label: "Training",    href: "/portal/training",     icon: "GraduationCap"  },
  { label: "Tasks",       href: "/portal/tasks",        icon: "CheckSquare"    },
  { label: "Reports",     href: "/portal/reports",      icon: "BarChart2"      },
  { label: "Messages",    href: "/portal/messages",     icon: "MessageSquare"  },
  { label: "Expert Marketplace", href: "/portal/experts", icon: "Users" },
  { label: "Professional Profile", href: "/portal/professional-profile", icon: "UserCircle" },
  { label: "Settings",    href: "/portal/settings",     icon: "Settings"       },
] as const;

export const ADMIN_NAV = [
  { label: "Overview",      href: "/admin",                icon: "LayoutDashboard" },
  { label: "Clients",       href: "/admin/clients",        icon: "Building2"       },
  { label: "Subscriptions", href: "/admin/subscriptions",  icon: "CreditCard"      },
  { label: "Team",          href: "/admin/team",           icon: "Users"           },
  { label: "Regulations",   href: "/admin/regulations",    icon: "BookOpen"        },
  { label: "Templates",     href: "/admin/templates",      icon: "FileText"        },
  { label: "Content",       href: "/admin/content",        icon: "Edit3"           },
  { label: "Analytics",     href: "/admin/analytics",      icon: "LineChart"       },
  { label: "Settings",      href: "/admin/settings",       icon: "Settings"        },
] as const;
