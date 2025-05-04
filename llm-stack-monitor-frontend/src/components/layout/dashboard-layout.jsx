import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  BarChart,
  Briefcase,
  Calendar,
  Home,
  Layers,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
  DollarSign,
  AlertTriangleIcon,
  DatabaseIcon,
  Sliders,
} from "lucide-react";

import { Button } from "../ui/button";
import ModeToggle from "../mode-toggle";
import { useAuth } from "../../context/auth-context";
import { cn } from "../../lib/utils";
import { Sidebar } from "lucide-react";

const SidebarItem = ({ icon: Icon, label, href, isActive, collapsed }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

export const Layout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef();

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: DollarSign, label: "Cost Analysis", href: "/cost-analysis" },
    {
      icon: AlertTriangleIcon,
      label: "Anomaly Detection",
      href: "/anomaly-detection",
    },
    { icon: DatabaseIcon, label: "Integration", href: "/integration" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobileOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--secondary-background)]">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={cn(
            "flex flex-col gap-2 p-4 transition-all duration-300",
            "fixed z-40 inset-y-0 left-0 w-64 md:static",
            collapsed ? "md:w-20" : "md:w-64",
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className="flex items-center justify-center gap-2 py-2 text-2xl font-bold md:justify-start">
            <span className="text-primary">LLM</span>
            {!collapsed && (
              <span className="text-muted-foreground">Monitor</span>
            )}
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
                collapsed={collapsed}
              />
            ))}
            <div className="mt-auto">
              <ModeToggle />
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Content */}
          <main className="flex-1 p-2 m-2 bg-background rounded-xl">
            <header className="sticky top-0 z-30 flex items-center h-10 gap-4 border-b bg-background">
              {/* Sidebar Toggle Button */}
              <button
                className="pl-4 pr-4 border-r"
                size="icon"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsMobileOpen((prev) => !prev);
                  } else {
                    setCollapsed((prev) => !prev);
                  }
                }}
              >
                <Sidebar className="w-4 h-4" />
              </button>
              <div className="text-lg font-semibold">
                Dashboard
              </div>
            </header>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
