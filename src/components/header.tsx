"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, use } from "react";

import { Icon, Loading, ThemeContext } from "@/components";

type TRoute = {
  label: string;
  path: string;
};

const routes: TRoute[] = [
  {
    label: "Blogs",
    path: "/blogs",
  },
  {
    label: "Notes",
    path: "/notes",
  },
  {
    label: "AI Assistant",
    path: "/ai",
  },
];

// const LanguageSwitch = () => {
//   return <Icon name="translate" />;
// };

const ThemeSwitch = () => {
  // react 19+ use replace useContext
  const { theme, setTheme } = use(ThemeContext);
  return (
    <div onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Icon name={theme === "light" ? "moon" : "sun"} />
    </div>
  );
};

// const Profile = () => {
//   return <Icon name="profile" />;
// };

export const Header = () => {
  const pathname = usePathname();
  const showHeader =
    !pathname.startsWith("/demos") && !pathname.startsWith("/login");
  return showHeader ? (
    <header className="md:rounded-4xl h-14 bg-surface px-2 md:px-3 lg:px-4">
      <Suspense fallback={<Loading />}>
        <div className="flex min-h-14 items-center justify-center gap-8 text-h6">
          <Link href="/">
            <Icon name="logo" size={32} className="text-primary" />
          </Link>
          <div className="flex items-center justify-center gap-6">
            {routes.map((route) => {
              return (
                <NavItem
                  key={route.label}
                  label={route.label}
                  path={route.path}
                />
              );
            })}
          </div>

          <div className="flex-1" />
          <div className="flex items-center justify-center gap-2 text-text-primary">
            {/* <LanguageSwitch /> */}
            <ThemeSwitch />
            {/* <Profile /> */}
          </div>
        </div>
      </Suspense>
    </header>
  ) : null;
};

const NavItem = ({ label, path }: TRoute) => {
  const currentPath = usePathname();
  const isActive = currentPath.includes(path);

  return (
    <div
      className={clsx(
        "font-semibold hover:text-primary",
        isActive ? "text-primary" : "text-text-primary",
      )}
    >
      <Link href={path}>
        <h4>{label}</h4>
      </Link>
    </div>
  );
};
