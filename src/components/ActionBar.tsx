import type { service, vendorservices } from "@/types/types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ActionBarProps {
  setOpenService: (service: vendorservices) => void;
  openService: string;
  links: service[];
}

const ActionBar = ({ setOpenService, openService, links }: ActionBarProps) => {
  return (
    <div className="gap-3 grid grid-flow-col max-w-sm">
      {links.map((service, index) => (
        <Button
          key={index}
          variant={openService === service.serviceName ? "primary" : "outline"}
          className={cn("w-35 p-2 flex justify-center gap-2 border rounded-sm ")}
          onClick={() => setOpenService(service.serviceName)}
        >
          <span>{service.text}</span>
        </Button>
      ))}
    </div>
  );
};

export default ActionBar;
