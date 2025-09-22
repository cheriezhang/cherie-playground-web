import { ComponentPropsWithoutRef } from "react";

type THeading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface IHeading extends ComponentPropsWithoutRef<THeading> {
  color?: "primary" | "secondary" | "disabled";
  component: THeading;
}

export const Heading = ({
  children,
  color = "primary",
  component,
  className = "",
  ...props
}: IHeading) => {
  const Component = component;

  // Map color to actual Tailwind class names
  const colorClass = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
    disabled: "text-text-disabled",
  }[color];

  // Map component to actual Tailwind class names
  const sizeClass = {
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    h4: "text-h4",
    h5: "text-h5",
    h6: "text-h6",
  }[component];

  return (
    <Component
      className={`font-bold ${colorClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
