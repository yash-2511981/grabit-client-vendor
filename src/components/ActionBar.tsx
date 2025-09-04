import type { service } from "@/types/types";
import Service from "./Service";
import { Edit2, PlusIcon, StoreIcon, Trash } from "lucide-react";

const productsServices: service[] = [
  { text: "View Products", icon: StoreIcon, serviceName: "view" },
  { text: "Add Products", icon: PlusIcon, serviceName: "add" },
  { text: "Edit Product", icon: Edit2, serviceName: "edit" },
  { text: "Delete Products", icon: Trash, serviceName: "delete" },
];

interface ActionBarProps {
  setOpenService: (service: string) => void;
  openService: string;
}

const ActionBar = ({ setOpenService, openService }: ActionBarProps) => {
  return (
    <div className="p-4 md:w-fit gap-3 rounded-md mx-auto border grid grid-flow-col drop-shadow-lg shadow-lg">
      {productsServices.map((service, index) => (
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
