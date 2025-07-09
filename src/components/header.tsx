"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

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
    label: "Demos",
    path: "/demos",
  },
];

export const Header = () => {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white p-4 text-lg font-medium text-gray-700">
      <Suspense fallback={<>Loading...</>}>
        <Link href="/">
          <Image
            src="/snowflake.svg"
            alt="logo"
            width={32}
            height={32}
            priority
          />
        </Link>
        {routes.map((route) => {
          return (
            <NavItem key={route.label} label={route.label} path={route.path} />
          );
        })}
      </Suspense>
    </header>
  );
};

const NavItem = ({ label, path }: TRoute) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;
  return (
    <Link href={path}>
      <h4 className={clsx("font-bold", isActive && "text-blue-600")}>
        {label}
      </h4>
    </Link>
  );
};
