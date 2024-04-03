import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-10 w-full p-2 shadow-sm bg-white">
      <div className="container mx-auto flex items-center justify-between gap-3 md:gap-0">
        <Link href="/">
          <Image src="/airbnb.svg" alt="Airbnb Logo" width={80} height={80} />
        </Link>
        <Search />
        <UserMenu />
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
