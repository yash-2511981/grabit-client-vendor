import { cn } from "@/lib/utils";
import type { sidebarlink } from "@/types/types";
import { Link } from "react-router-dom";

const SidebarLink = ({
  link,
  active,
}: {
  link: sidebarlink;
  active: boolean;
}) => {
  return (
    <Link
      title={link.text}
      to={`${link.navigate}`}
      className={cn("flex gap-2 p-2 rounded-sm justify-start w-full", {
        "bg-primary": active,
      })}
    >
      <link.icon className="" />
      <span className="font-medium">{link.text}</span>
    </Link>
  );
};

export default SidebarLink;
