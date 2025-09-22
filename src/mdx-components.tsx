import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  // Allows customizing built-in components, e.g. to add styling.
  h1: ({ children }) => <h1 id={String(children)}>{children}</h1>,
  h2: ({ children }) => <h2 id={String(children)}>{children}</h2>,
  h3: ({ children }) => <h3 id={String(children)}>{children}</h3>,
  a: ({ href, children, ...props }: any) => {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
  // img: ({ src }) => <Image src={src} alt={src} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
