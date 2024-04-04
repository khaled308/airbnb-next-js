"use client";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { signOut, useSession } from "next-auth/react";
import { useRentModal } from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, data } = useSession();
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const handleHomeClick = useCallback(() => {
    if (status !== "authenticated") {
      return loginModal.open();
    }

    return rentModal.open();
  }, [status, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={handleHomeClick}
          className="hidden md:block text-sm font-semibold rounded-full p-4 cursor-pointer hover:bg-neutral-100 transition"
        >
          Airbnb Your home
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:p-2 border border-neutral-200 rounded-full flex items-center gap-3 transition cursor-pointer hover:shadow-md"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar url={data?.user?.image ?? undefined} />
          </div>
        </div>
      </div>
      {isOpen && status === "unauthenticated" && (
        <div className="absolute shadow-md rounded w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm right-0 top-12">
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="Login" onClick={() => loginModal.open()} />
            <MenuItem label="Sign up" onClick={() => registerModal.open()} />
          </div>
        </div>
      )}
      {isOpen && status === "authenticated" && (
        <div className="absolute shadow-md rounded w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm right-0 top-12">
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="Trips" onClick={() => router.push("/trips")} />
            <MenuItem
              label="Favorites"
              onClick={() => router.push("/favorites")}
            />
            <MenuItem
              label="Reservations"
              onClick={() => router.push("/reservations")}
            />
            <MenuItem
              label="Properties"
              onClick={() => router.push("/properties")}
            />
            <MenuItem label="Airbnb your home" onClick={rentModal.open} />
            <hr />
            <MenuItem label="Log out" onClick={() => signOut()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
