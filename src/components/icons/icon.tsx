import * as Icons from "./index";

interface IIcon {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = ({ name, size = 20, color, className, ...rest }: IIcon) => {
  const SvgComponent = Icons[name];
  return (
    <SvgComponent
      width={size}
      height={size}
      className={className}
      color={color ?? "currentColor"}
      {...rest}
    />
  );
};
