import logo from "@public/logo.svg"
import find from "@public/find.svg"

import Link from "next/link";
import {ChevronDownIcon, User} from "lucide-react";

export default function Header() {
  return <div className="h-[90px] bg-teal-800 flex">
    <div className="stdcontainer flex justify-between align-center">
      <Link href="/" className="flex">
        <img src={logo.src} alt="Патриот" className="w-[100px]" />
      </Link>
      <nav className="flex gap-5 mr-2.5">
        <Link href="/lk" className="flex items-center">
          <User className="text-white"></User>
        </Link>
      </nav>
    </div>
  </div>
}