"use client";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "@/hooks/useRegisterModal";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="hidden md:block text-sm font-semibold rounded-full p-4 cursor-pointer hover:bg-neutral-100 transition">
          Airbnb Your home
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:p-2 border border-neutral-200 rounded-full flex items-center gap-3 transition cursor-pointer hover:shadow-md"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute shadow-md rounded w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm right-0 top-12">
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="Login" onClick={() => {}} />
            <MenuItem label="Sign up" onClick={() => registerModal.open()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
