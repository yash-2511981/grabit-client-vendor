import CustomToast from "@/components/CustomToast";
import { toast } from "sonner";

export const useToast = () => {
  return {
    success: (title: string, message?: string) => {
      toast.custom(() => (
        <CustomToast title={title} message={message} type="success" />
      ));
    },
    info: (title: string, message?: string) => {
      toast.custom(() => (
        <CustomToast title={title} message={message} type="info" />
      ));
    },
    error: (title: string, message?: string) => {
      toast.custom(() => (
        <CustomToast title={title} message={message} type="error" />
      ));
    },
    warning: (title: string, message?: string) => {
      toast.custom(() => (
        <CustomToast title={title} message={message} type="warning" />
      ));
    },
    order: (title: string, message?: string) => {
      toast.custom(() => (
        <CustomToast title={title} message={message} type="order" />
      ));
    },
  };
};
