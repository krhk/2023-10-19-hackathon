import { ConnectionComponentType } from "@/types/seacher.types";
import { BsBusFront } from "react-icons/bs";
import { FaTrainSubway } from "react-icons/fa6";

export default function ConnectionComponent({
  connection,
}: ConnectionComponentType) {
  const early = () => {
    const now = new Date(
      0,
      0,
      0,
      new Date().getHours(),
      new Date().getMinutes(),
      0
    );

    const time = connection.odjezd.split(":");
    const conn = new Date(0, 0, 0, Number(time[0]), Number(time[1]), 0);

    // Rozdíl v minutách
    const difference = (conn.getTime() - now.getTime()) / (1000 * 60);

    const differenceWithWaiting = difference + Number(connection.vyckaMin);

    if (differenceWithWaiting >= 0) {
      return true;
    }

    return false;
  };

  return (
    <div className="bg-gray-200 my-2 p-1 rounded-md" onClick={early}>
      <div className="flex w-full justify-between border-b-2 border-gray-800 px-2">
        <div className="flex">
          <div>
            {connection.linka}/{connection.spoj}
          </div>
          <div className="flex justify-center items-center ml-5">
            {connection.typ.toUpperCase() === "A" ? (
              <BsBusFront />
            ) : (
              <FaTrainSubway />
            )}
          </div>
        </div>
        <div className="text-xs">{connection.dopravce} </div>
      </div>
      <div className="p-1">
        <div className="flex justify-between mt-2">
          <div>
            <strong>Pravidelný odjezd spoje: </strong> {connection.odjezd}
          </div>
          <div>
            <strong>Spoj vyčká maximálně: </strong>
            {connection.vyckaMin} minut
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <strong>Stíhám spoj: </strong>{" "}
            {early() ? (
              <span className="p-1 rounded-md bg-green-400">Ano</span>
            ) : (
              <span className="p-1 rounded-md bg-red-400">Ne</span>
            )}
          </div>
          <div>
            <strong>Spoj pokračuje směrem do: </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
