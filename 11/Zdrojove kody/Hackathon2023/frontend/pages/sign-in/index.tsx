import { Heading } from "@/components/general/Heading";
import Icon from "@/components/general/Icon";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className="w-[30rem] border rounded-xl p-16 bg-white">
        <Link href={"/"}>
          <div className="flex gap-2 items-center mb-4">
            <Icon icon="CaretLeft" className="w-4 h-4 text-primary" />
            <p className="font-bold text-primary">Zpět</p>
          </div>
        </Link>

        <Heading title="Přihlásit se" />

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <p>Přihlašovací jméno</p>
            <input
              className="bg-gray-100 rounded-xl px-6 py-2 w-full"
              placeholder="Zadejte přihlašovací jméno"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>Heslo</p>
            <input
              className="bg-gray-100 rounded-xl px-6 py-2 w-full"
              placeholder="Zadejte heslo"
            />
          </div>
        </div>
        <button className="px-6 py-2 rounded-xl bg-primary text-white font-bold w-full mt-8">
          Přihlásit
        </button>
      </div>
    </main>
  );
}
