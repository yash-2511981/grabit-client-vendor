import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { metric } from "@/types/types";

interface OverviewCardProps {
  cardTitle: string;
  cardDescription: string;
  metrics: metric[];
}

const DashboardOVerviewCard = ({
  cardDescription,
  cardTitle,
  metrics,
}: OverviewCardProps) => {
  return (
    <Card className="border-amber-200 shadow-sm bg-gradient-to-br from-amber-50 to-orange-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {cardTitle}
        </CardTitle>
        <CardDescription className="text-xs">{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-amber-100/50 transition-colors mb-3"
            >
              <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-amber-100 text-amber-600">
                <IconComponent size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{metric.label}</p>
                <div className="flex gap-1 items-center">
                  <p className="font-bold text-gray-800">{metric.value}</p>
                  <p className="text-[12px] text-green-600">{metric.trend}</p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default DashboardOVerviewCard;
