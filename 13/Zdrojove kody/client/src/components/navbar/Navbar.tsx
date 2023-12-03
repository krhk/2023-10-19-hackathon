import Image from "next/image";
import NavbarItem from "./NavbarItem";
import logo from "../../app/logo.svg";

/** Komponenta představující navbar */
export default function Navbar() {
  return (
    <div className="bg-blueberry text-white w-full h-20 flex items-center text-3xl px-32 font-bold">
      <NavbarItem className="text-4xl" url="" hideHoverColor={true}>
        {/*<Image src="test" alt="logo" width={50} height={50} />*/}
        <Image src={logo} alt="test" />
      </NavbarItem>

      <NavbarItem url="#search">Vyhledat čekající spoj</NavbarItem>

      <NavbarItem url="https://idos.idnes.cz" target="_blank">
        IDOS
      </NavbarItem>
    </div>
  );
}
