import Service from "./Service";
import type { service, vendorservices } from "@/types/types";

interface ActionBarProps {
  setOpenService: (service: vendorservices) => void;
  openService: string;
  links: service[];
}

const ActionBar = ({ setOpenService, openService, links }: ActionBarProps) => {
  return (
    <div className="gap-3 grid grid-flow-col max-w-sm">
      {links.map((service, index) => (
        <Service
          key={index}
          service={service}
          setOpen={setOpenService}
          open={openService === service.serviceName}
        />
      ))}
    </div>
  );
};

export default ActionBar;
