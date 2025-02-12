import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className="bg-[#0de034] sticky top-0 flex-wrap text-white z-20 mx-auto flex justify-between items-center p-10">
      <Link href="/">
        <h1 className="text-2xl">UEATSS</h1>
      </Link>
      <Navbar />
    </div>
  );
}
