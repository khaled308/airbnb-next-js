"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import queryString from "query-string";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  Icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox = ({ selected, label, Icon }: CategoryBoxProps) => {
  const params = useSearchParams();
  const router = useRouter();
  const handleCategoryClick = useCallback(() => {
    let currentQuery = {};

    if (params) currentQuery = queryString.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // toggle category
    if (params.get("category") === label) delete updatedQuery.category;

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleCategoryClick}
      className={`
    flex 
    flex-col 
    items-center 
    justify-center 
    gap-2
    p-3
    border-b-2
    hover:text-neutral-800
    transition
    cursor-pointer
    ${selected ? "border-b-neutral-800" : "border-transparent"}
    ${selected ? "text-neutral-800" : "text-neutral-500"}
  `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
