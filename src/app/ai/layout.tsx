import Link from "next/link";

const demos = [
  { path: "/fonts", label: "Fonts" },
  { path: "/theme", label: "Theme" },
];

const DemosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <aside className="flex w-64 flex-col border-l border-gray-100 bg-white p-4">
        {demos.map((demo) => {
          return (
            <Link key={demo.path} href={`/demos/${demo.path}`}>
              {demo.label}
            </Link>
          );
        })}
      </aside>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default DemosLayout;
