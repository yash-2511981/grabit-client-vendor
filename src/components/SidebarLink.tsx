import { cn } from "@/lib/utils";
import type { sidebarlink } from "@/types/types";
import { Link } from "react-router-dom";

const SidebarLink = ({
  link,
  active,
  ...props
}: {
  link: sidebarlink;
  active: boolean;
  [key: string]: unknown;
}) => {
  return (
    <Link
      title={link.text}
      to={`${link.navigate}`}
      className={cn("flex gap-2 p-2 rounded-sm justify-start w-full", {
        "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg":
          active,
      })}
      {...props}
    >
      <link.icon className="" />
      <span className="font-medium">{link.text}</span>
    </Link>
  );
};

export default SidebarLink;
