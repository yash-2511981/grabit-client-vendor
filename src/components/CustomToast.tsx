import {
  AlertCircle,
  Bell,
  CheckCircle,
  Info,
  ShoppingBag,
} from "lucide-react";


const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    textColor: "text-green-700",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-gradient-to-r from-red-50 to-rose-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-900",
    textColor: "text-red-700",
  },
  info: {
    icon: Info,
    bgColor: "bg-gradient-to-r from-blue-50 to-sky-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    textColor: "text-blue-700",
  },
  warning: {
    icon: Bell,
    bgColor: "bg-gradient-to-r from-amber-50 to-yellow-50",
    borderColor: "border-amber-200",
    iconColor: "text-amber-600",
    titleColor: "text-amber-900",
    textColor: "text-amber-700",
  },
  order: {
    icon: ShoppingBag,
    bgColor: "bg-gradient-to-r from-orange-50 to-amber-50",
    borderColor: "border-orange-200",
    iconColor: "text-orange-600",
    titleColor: "text-orange-900",
    textColor: "text-orange-700",
  },
};

interface CustomToastProps {
  type: "success" | "error" | "info" | "warning" | "order";
  title: string;
  message?: string;
}

const CustomToast = ({ type, title, message }: CustomToastProps) => {
  const config = toastConfig[type] || toastConfig.info;
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start justify-between w-full max-w-md p-4 ${config.bgColor} shadow-lg rounded-xl border ${config.borderColor} backdrop-blur-sm animate-in slide-in-from-top-5`}
    >
      <div className="flex items-start gap-3 flex-1">
        <div className={`p-2 rounded-lg bg-white/80 ${config.iconColor}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${config.titleColor} text-sm`}>
            {title}
          </h3>
          {message && (
            <p className={`text-sm ${config.textColor} mt-0.5`}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomToast;


