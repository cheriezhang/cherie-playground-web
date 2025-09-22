import { Icon } from "../icons";

export const ServerLoading = () => {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <div className="animate-spin-slow text-accent">
        <Icon name="logo" size={36} />
      </div>
    </div>
  );
};
