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
      to={`${link.navigate}`}
      className={cn("flex gap-2", { "bg-amber-500": active })}
    >
      <link.icon className="" />
      <span className="md:block hidden">{link.text}</span>
    </Link>
  );
};

export default SidebarLink;
