import type React from "react"
import ProfileServer from "./ProfileServer"
import Header from "../components/Header"
import Footer from "../components/Footer"

const PerfilLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Perfil de Usuario</h3>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <ProfileServer />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PerfilLayout
