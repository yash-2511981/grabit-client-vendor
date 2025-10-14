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
    <div className="gap-3 grid grid-flow-col w-fit">
      {links.map((service, index) => (
        <Button
          key={index}
          variant={openService === service.serviceName ? "primary" : "outline"}
          className={cn(
            "w-25 p-2 flex justify-center gap-2 border rounded-sm ",
            { "w-10": !service.text }
          )}
          onClick={() => setOpenService(service.serviceName)}
        >
          {service.text ? <span>{service.text}</span> : <service.icon />}
        </Button>
      ))}
    </div>
  );
};

export default ActionBar;
