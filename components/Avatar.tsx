import Image from "next/image";

const Avatar = ({ url = "/placeholder.jpg" }: { url?: string }) => {
  return (
    <Image
      src={url}
      alt="avatar"
      width={30}
      height={30}
      className="rounded-full"
    />
  );
};

export default Avatar;
