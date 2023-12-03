"use client";
import { useEffect, useState } from "react";
import Input from "../commons/input/Input";
import { InputEnum } from "@/types/commons.types";
import Button from "../commons/button/Button";
import { get } from "@/utils/client";
import { toastifyError } from "@/utils/toasts";
import {
  getConnectionsWithStart,
  getConnectionsWithoutStart,
} from "@/utils/methods";
import { SearcherType } from "@/types/seacher.types";

/** Komponenta představující vyhledávač spojů */
export default function Searcher({
  connections,
  setConnections,
}: SearcherType) {
  const [station, setStation] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [stations, setStations] = useState<Array<string>>([]);
  const [fromStations, setFromStations] = useState<Array<string>>([]);

  const handleClick = async () => {
    try {
      if (station && stations.includes(station)) {
        if (from && fromStations.includes(from)) {
          if (time) {
            const connections = await getConnectionsWithStart(
              station,
              from,
              time
            );

            setConnections(connections);
          } else {
            const connections = await getConnectionsWithStart(station, from);
            console.log("test");

            setConnections(connections);
          }
        } else {
          if (time) {
            const connections = await getConnectionsWithoutStart(station, time);

            setConnections(connections);
          } else {
            const connections = await getConnectionsWithoutStart(station);

            setConnections(connections);
          }
        }
      } else {
        toastifyError("Zadal jsi neplatnou přestupní stanici");
      }
    } catch (ex) {}
  };

  useEffect(() => {
    const downloadData = async () => {
      try {
        const respStations = await get("stations");

        if (respStations.status === 200) {
          setStations(respStations.data);
        }
      } catch (ex) {}

      try {
        const respFromStations = await get("fromstations");

        if (respFromStations.status === 200) {
          setFromStations(respFromStations.data);
        }
      } catch (ex) {}
    };

    downloadData();
  }, []);

  return (
    <div className="w-[500px] my-5">
      <h3 className="text-3xl font-semibold">Vyhledat čekající spoje</h3>
      <div className="text-sm mt-2">
        <em>
          Pole označená <span className="text-redberry">*</span> jsou povinná.
        </em>
      </div>
      <Input
        label="Přestupní stanice"
        value={station}
        required
        onChange={(content) => setStation(content)}
        helpers={stations}
      />

      <Input
        label="Výchozí stanice mého vlaku"
        value={from}
        onChange={(content) => setFrom(content)}
        helpers={fromStations}
      />

      <Input
        label="Čas"
        type={InputEnum.Time}
        value={time}
        onChange={(content) => setTime(content)}
      />
      <em className="text-sm">Pokud nezadáte čas, je použit aktuální</em>

      <Button
        text="Vyhledat čekající spoje"
        onClick={handleClick}
        className="mt-5"
      />
    </div>
  );
}
