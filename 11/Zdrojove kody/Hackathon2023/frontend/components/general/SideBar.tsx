import { Tree } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "./Icon";

export default function SideBar() {
  return (
    <aside className="w-[25rem] border-r border-gray-200 h-screen p-16 flex flex-col gap-16 fixed">
      <Profile />
      <MenuList />
    </aside>
  );
}

function Profile() {
  return (
    <div className="flex gap-6 items-center">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
        <Icon icon="Tree" className="text-white w-6 h-6" />
      </div>

      <div>
        <p className="font-bold text-xl">Testovací účet</p>
        <p className="text-gray-500">@testaccount</p>
      </div>
    </div>
  );
}

function MenuList() {
  const menu = [
    { name: "Pro vás", route: "/", icon: "Compass" },
    { name: "K návštěvě", route: "/wishlist", icon: "Heart" },
    { name: "Profil", route: "/profile", icon: "User" },
  ];

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-2">
        {menu.map((item) => {
          return <MenuItem key={item.name} {...item} />;
        })}
      </div>

      <MenuItem name="Příhlásit se" icon="SignIn" route="/sign-in" />
    </div>
  );
}

function MenuItem({
  name,
  route,
  icon,
}: {
  name: string;
  route: string;
  icon: string;
}) {
  const router = useRouter();
  const active = router.pathname === route;

  return (
    <Link href={route}>
      <div
        className={`px-8 py-3 rounded-2xl flex gap-2 items-center transition-all ${
          active ? "bg-primary" : "bg-white hover:bg-orange-100"
        }`}
      >
        <Icon
          icon={icon}
          className={`h-5 w-5 ${active ? "text-white" : "text-black"}`}
        />
        <p className={`font-bold ${active ? "text-white" : "text-black"}`}>
          {name}
        </p>
      </div>
    </Link>
  );
}
