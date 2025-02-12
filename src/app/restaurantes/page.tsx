import Image from "next/image";
import Header from "../components/Header";
export default function page() {
    return (
        <div >
        <Header></Header>

        <div className="min-h-screen flex items-center justify-between ">
                   
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-y-10 md:gap-x-16">
        
        <div className="w-2/3 md:w-2/5 aspect-square bg-gray-100 flex items-center justify-center border-2 border-black rounded-lg shadow-lg">
            <p>Left Box</p>
        </div>

        
        <div className="w-2/3 md:w-2/5 aspect-square bg-gray-100 flex items-center justify-center border-2 border-black rounded-lg shadow-lg">
            <p>Right Box</p>
        </div>
        </div>




        </div>
        </div>
    );
  }
  