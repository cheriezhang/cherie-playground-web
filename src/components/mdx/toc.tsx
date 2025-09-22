"use client";
import type { TTOC } from "./server";

export const TOC = ({ headings }: { headings: TTOC[] }) => {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <h3 className="mb-4 text-primary">Table of Content</h3>
      <ul className="mb-4 text-text-secondary">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: (h.level - 1) * 8 }}
            className="cursor-pointer hover:text-primary"
            onClick={() => scrollToId(h.id)}
          >
            {h.text}
          </li>
        ))}
      </ul>
    </>
  );
};
