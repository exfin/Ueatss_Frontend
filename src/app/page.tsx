import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className=" flex-[1] p-4">First Div</div>
          <div className="bg-gray-500 bg-opacity-50 flex-[3] p-4">Second Div (Bigger)</div>
          <div className=" flex-[1] p-4">Third Div</div>
        </div>
      </div>
    </div>
  );
}
