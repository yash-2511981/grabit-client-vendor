import { cn } from "@/lib/utils";
import type { service, vendorservices } from "@/types/types";
import { Button } from "./ui/button";

interface ServiceProps {
  setOpen: (service: vendorservices) => void;
  service: service;
  open: boolean;
}

const Service = ({ service, setOpen, open }: ServiceProps) => {
  return (
    <Button
      className={cn("w-35 p-2 flex justify-center gap-2 border rounded-sm", {
        "bg-primary text-sm": open,
      })}
      onClick={() => setOpen(service.serviceName)}
    >
      {/* <service.icon />  */}
      <span>{service.text}</span>
    </Button>
  );
};

export default Service;
