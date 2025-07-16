import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  PanelLeftClose,
  PanelRightClose,
  LayoutDashboard,
  LogOut,
  Building2,
  Menu,
} from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-gray-100/40 p-2 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex h-14 items-center gap-3 font-bold px-3">
          <Building2 className="h-6 w-6 text-orange-400 flex-shrink-0" />
          {!isCollapsed && <span className="text-lg">TaskFlow</span>}
        </div>

        {/* Main Navigation Link(s) */}
        <div className="flex-1 space-y-2">
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-3 px-3", "bg-gray-200/70")}
            asChild
          >
            <Link to="/">
              <LayoutDashboard className="h-5 w-5" />
              {!isCollapsed && "Dashboard"}
            </Link>
          </Button>
        </div>

        {/* Direct Logout Button at the bottom */}
        <div className="mt-auto">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 p-3 text-red-500 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="truncate">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
          {/* Sidebar Toggle for Desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <PanelRightClose className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-4 w-64">
              <div className="flex h-14 items-center gap-3 font-bold">
                <Building2 className="h-6 w-6 text-orange-400" />
                <span className="text-lg">TaskFlow</span>
              </div>
              <div className="flex-1 space-y-2 mt-4">
                <Button
                  variant="secondary"
                  className="w-full justify-start gap-3"
                  asChild
                >
                  <Link to="/">
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                </Button>
              </div>
              <div className="mt-auto">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start gap-3 text-red-500"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="flex-1 text-xl font-semibold text-gray-800">
            Dashboard
          </h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-gray-50/50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
