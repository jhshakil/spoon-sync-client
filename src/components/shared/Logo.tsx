import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-2 items-end">
      <Image width={40} height={40} src="/images/logo/logo.png" alt="Logo" />
      <h1 className="text-xl font-bold">
        Spoon <span className="text-primary">Sync</span>
      </h1>
    </Link>
  );
};

export default Logo;
