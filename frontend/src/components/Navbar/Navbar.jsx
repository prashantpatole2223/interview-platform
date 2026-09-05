import {
  useState
} from "react";

import {
  Link,
  NavLink
} from "react-router-dom";

import {
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
  DoorOpen,
  History,
  Code2
} from "lucide-react";

import {
  useAuth
} from "../../context/AuthContext";


export default function Navbar() {

  const {
    isAuthenticated,
    loading,
    logout
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);


  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };


  const navLinkClass = ({
    isActive
  }) =>
    `text-sm font-medium transition ${isActive
      ? "text-gray-950"
      : "text-gray-500 hover:text-gray-950"
    }`;


  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex h-16 items-center justify-between">

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-white shadow-sm">
              <Code2 size={18} />
            </div>

            <span className="text-lg font-bold tracking-tight text-gray-950">
              Interview<span className="text-gray-500">Platform</span>
            </span>
          </Link>


          <div className="hidden items-center gap-7 md:flex">

            {loading ? (

              <div className="h-5 w-20 animate-pulse rounded bg-gray-100" />

            ) : isAuthenticated ? (

              <>
                <NavLink
                  to="/dashboard"
                  className={navLinkClass}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/your-rooms"
                  className={navLinkClass}
                >
                  Your Rooms
                </NavLink>

                <NavLink
                  to="/history"
                  className={navLinkClass}
                >
                  History
                </NavLink>

                <NavLink
                  to="/profile"
                  className={navLinkClass}
                >
                  Profile
                </NavLink>

                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>

            ) : (

              <>
                <NavLink
                  to="/"
                  className={navLinkClass}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/login"
                  className={navLinkClass}
                >
                  Login
                </NavLink>

                <Link
                  to="/signup"
                  className="rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Get Started
                </Link>
              </>

            )}

          </div>


          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(
                (previous) =>
                  !previous
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-50 md:hidden"
            aria-label={
              mobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={
              mobileMenuOpen
            }
          >

            {mobileMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}

          </button>

        </div>


        {mobileMenuOpen && (

          <div className="border-t border-gray-100 py-4 md:hidden">

            {loading ? (

              <div className="px-2 py-3 text-sm text-gray-400">
                Loading...
              </div>

            ) : isAuthenticated ? (

              <div className="space-y-1">

                <NavLink
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive
                      ? "bg-gray-100 text-gray-950"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                    }`
                  }
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </NavLink>


                <NavLink
                  to="/your-rooms"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive
                      ? "bg-gray-100 text-gray-950"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                    }`
                  }
                >
                  <DoorOpen size={18} />
                  Your Rooms
                </NavLink>


                <NavLink
                  to="/history"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive
                      ? "bg-gray-100 text-gray-950"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                    }`
                  }
                >
                  <History size={18} />
                  History
                </NavLink>


                <NavLink
                  to="/profile"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive
                      ? "bg-gray-100 text-gray-950"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                    }`
                  }
                >
                  <User size={18} />
                  Profile
                </NavLink>


                <button
                  onClick={() => {
                    closeMobileMenu();
                    logout();
                  }}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>

            ) : (

              <div className="space-y-1">

                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-3 text-sm font-medium ${isActive
                      ? "bg-gray-100 text-gray-950"
                      : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  Home
                </NavLink>


                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-3 text-sm font-medium ${isActive
                      ? "bg-gray-100 text-gray-950"
                      : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  Login
                </NavLink>


                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="mt-2 block rounded-xl bg-gray-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Get Started
                </Link>

              </div>

            )}

          </div>

        )}

      </nav>

    </header>
  );
}