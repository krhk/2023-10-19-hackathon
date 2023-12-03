"use client";
import ConnectionComponent from "@/components/connection/Connection";
import Searcher from "@/components/searcher/Searcher";
import { Connection } from "@/types/data.types";
import { useState } from "react";
import { IconContext } from "react-icons";

export default function Home() {
  const [connections, setConnections] = useState<Array<Connection>>([]);

  return (
    <IconContext.Provider value={{ size: "20" }}>
      <div className="mt-24">
        <div>
          <h2 className="text-5xl font-bold">Počká na Vás vlak?</h2>
          <div className="mt-2 text-justify">
            Určitě jste se již někdy setkali s problémem, kdy měl Váš vlak či
            autobus zpoždění. A Vy jste se následně museli bát, zda stihnete
            včas přestoupit. A určitě se Vám také několikrát stalo, že Vám
            následující spoj ujel a Vy jste si včas nezajistili náhradní
            přepravu. Buďte si jistí a zkontrolujte si, zda na Vás Váš autobus
            nebo vlak počká! Případně zažádejte o to, aby čekal!
          </div>
        </div>

        <div className="flex">
          <div className="w-1/2">
            <Searcher
              connections={connections}
              setConnections={setConnections}
            />
          </div>
          <div className="w-1/2 my-5">
            <h3 className="text-3xl font-semibold">Čekající spoje</h3>
            {connections.map((connection, index) => (
              <ConnectionComponent connection={connection} key={index} />
            ))}
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
