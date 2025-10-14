const CategoryBadge = ({ category }: { category: string }) => {
  const getBadgeStyle = () => {
    if (category === "veg")
      return "bg-green-100 text-green-700 border-green-300";
    if (category === "non-veg") return "bg-red-100 text-red-700 border-red-300";
    return "bg-purple-100 text-purple-700 border-purple-300";
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border ${getBadgeStyle()}`}
    >
      {category === "both" ? "Veg & Non-Veg" : category.toUpperCase()}
    </span>
  );
};

export default CategoryBadge;
