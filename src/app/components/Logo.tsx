import Image from "next/image"

export default function Logo() {
  return (
    <div className="relative h-10 w-32">
      <Image src="/logo-ueats.png" alt="Logo" fill className="object-contain" />
    </div>
  )
}
