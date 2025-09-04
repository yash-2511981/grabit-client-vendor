import { cn } from "@/lib/utils";
import type { service } from "@/types/types";

interface ServiceProps {
  setOpen: (service: string) => void;
  service: service;
  open: boolean;
}

const Service = ({ service, setOpen, open }: ServiceProps) => {
  return (
    <div
      className={cn("w-full p-2 flex justify-center gap-4 border rounded-sm", {
        "bg-amber-600": open,
      })}
      onClick={() => setOpen(service.serviceName)}
    >
      <service.icon /> <span>{service.text}</span>
    </div>
  );
};

export default Service;
