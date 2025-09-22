type TText = "span" | "label" | "p" | "div";
interface IText {
  children?: React.ReactNode;
  color?: "primary" | "secondary" | "disabled";
  component: TText;
  className?: string;
}

export const Text = ({
  children,
  color = "primary",
  component = "p",
  className,
  ...props
}: IText) => {
  const Component = component;

  // Map color to actual Tailwind class names
  const colorClass = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
    disabled: "text-text-disabled",
  }[color];

  const textClass = component == "label" ? "text-label" : "text-body";

  return (
    <Component className={`${colorClass} ${textClass} ${className}`} {...props}>
      {children}
    </Component>
  );
};
