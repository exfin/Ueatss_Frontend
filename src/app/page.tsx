import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div >
      <Header></Header>
      
      <a href="/api/auth/logout">Logout</a>

    </div>
  );
}
