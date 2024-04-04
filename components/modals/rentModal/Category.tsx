"use client";
import Heading from "@/components/Heading";
import CategoryInput from "@/components/form/CategoryInput";
import categories from "@/constants/categories";

interface Props {
  selectedCategory?: string;
  onSelectCategory: (id: string, value: string) => void;
}

const Category = ({ onSelectCategory, selectedCategory }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              Icon={item.icon}
              label={item.label}
              onClick={(category) => onSelectCategory("category", category)}
              selected={selectedCategory === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
