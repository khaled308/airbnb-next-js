"use client";
import { useSearchParams } from "next/navigation";
import categories from "@/constants/categories";
import CategoryBox from "../CategoryBox";

const Categories = () => {
  const params = useSearchParams();
  const category = params.get("category");

  return (
    <div className="container mx-auto">
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map(({ icon, label }) => (
          <CategoryBox
            key={label}
            Icon={icon}
            label={label}
            selected={category === label}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
