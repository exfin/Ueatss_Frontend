import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  console.log(process.env.DATABASE_URL);
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className="justify-around items-center  flex flex-col flex-[2] p-4">
              <h1 className="text-3xl font-bold text-black">Bienvenido!</h1>
              <p className="w-[800]">En Ueatss, hacemos que tus compras sean rápidas y sencillas. Pide en línea desde la comodidad de tu hogar y elige la opción que más te convenga:

                ✅ Recoge tu pedido en el establecimiento sin esperas.
                ✅ Recibe tu compra en la puerta de tu oficina, departamento o área dentro de la institución.

                Explora nuestro catálogo, selecciona tus productos y deja el resto en nuestras manos. ¡Compras fáciles, rápidas y sin complicaciones! 🚀

                🛒 Haz tu pedido ahora y disfruta de la mejor experiencia de compra.
              </p>
          </div>
          <div 
            className="bg-gray-500 bg-opacity-50 flex-[2] p-4 flex flex-col items-center justify-around   bg-no-repeat w-full" 
            style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/02/97/67/70/360_F_297677001_zX7ZzRq8DObUV5IWTHAIhAae6DuiEQh4.jpg')", backgroundSize: "100% auto" }}
          >
            
            <Link href="/restaurantes">
              <button className="relative z-10 bg-gray-700 text-white px-6 py-3 text-xl font-bold rounded-lg hover:bg-gray-800 w-60">
                Restaurantes
              </button>
            </Link>
            <h1 className="text-white">Dale un vistazo a los restaurantes disponibles</h1>
          </div>

          <div className=" flex-[2] p-4"></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
