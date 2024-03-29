"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border w-full md:w-auto rounded-full py-2 shadow hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="font-semibold tex-sm px-6">Anywhere</p>
        <p className="hidden sm:block font-semibold text-sm px-6 border-x text-center flex-1">
          Any Week
        </p>
        <div className="flex items-center justify-between gap-2 pl-4 pr-2">
          <p className="hidden sm:block font-semibold text-sm text-gray-600">
            Add guests
          </p>
          <div className="text-white bg-rose-500 p-2 rounded-full">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
