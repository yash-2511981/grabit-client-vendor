import { Badge } from "@/components/ui/badge";

const CategoryBadge = ({ category }: { category: string }) => {
  const getBadgeStyle = () => {
    if (category === "veg")
      return "bg-green-100 text-green-700 border border-green-300";
    if (category === "non-veg")
      return "bg-red-100 text-red-700 border border-red-300";
    return "bg-purple-100 text-purple-700 border border-purple-300";
  };

  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium rounded-full ${getBadgeStyle()}`}
    >
      {category === "both" ? "Veg & Non-Veg" : category.toUpperCase()}
    </Badge>
  );
};

export default CategoryBadge;
