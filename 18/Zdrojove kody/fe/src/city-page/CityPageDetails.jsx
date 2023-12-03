import "./tav.css";

function Table({ data }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.2)",
        width: "100%",
        borderRadius: "20px",
      }}
    >
      <table
        className="tablel"
        style={{
          width: "100%",
        }}
      >
        <tbody>
          {Object.keys(data).map((key) => (
            <tr>
              <th>{key}</th>
              <td>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CityPageDetails({ data }) {
  return (
    <div style={{ paddingTop: "50px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "5px" }}>
          <h2>Vydělávání</h2>
          <Table
            data={{
              "Mateřská škola":
                data?.score?.education?.details["Mateřská škola"],
              "Základní škola":
                data?.score?.education?.details["Základní škola"],
              "Vyšší odborná škola":
                data?.score?.education?.details["Vyšší odborná škola"],
              Konzervatoře: data?.score?.education?.details["Konzervatoře"],
            }}
          />
        </div>
        <div style={{ flex: 1, padding: "5px" }}>
          <h2>Bydlení</h2>
          <Table
            data={{
              Byty: data?.score?.housing?.details["Počet dokončených bytů"],
              "Počet bytů v bytových domech":
                data?.score?.housing?.details[
                  "Počet dokončených bytů v bytových domech"
                ],
              "Počet bytů v rodinných domech":
                data?.score?.housing?.details[
                  "Počet dokončených bytů v rodinných domech"
                ],
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "5px" }}>
          <h2>Finance</h2>
          <Table
            data={{
              "Celkové výdaje obce":
                Math.round(data?.score?.income?.details["Výdaje celkem"]) +
                ",-",
              "Vlastní příjmy":
                Math.round(data?.score?.income?.details["Vlastní příjmy"]) +
                ",-",
              "Přijaté dotace":
                Math.round(
                  data?.score?.income?.details["Přijaté dotace celkem"]
                ) + ",-",
            }}
          />
        </div>
        <div style={{ flex: 1, padding: "5px" }}>
          <h2>Pozemky</h2>
          <Table
            data={{
              "Celková výměra pozemku":
                Math.round(
                  data?.score?.nature?.details["Celková výměra pozemku"]
                ) + " km²",
              Silnice:
                Math.round(data?.score?.nature?.details["Silnice"]) + " km²",
              Dálnice:
                Math.round(data?.score?.nature?.details["Dálnice"]) + " km²",
              "Železniční dráha":
                Math.round(data?.score?.nature?.details["Dráha"]) + " km²",
              "Ostatní komunikace":
                Math.round(data?.score?.nature?.details["Ostatní kumunikace"]) +
                " km²",
              Lesy:
                Math.round(data?.score?.nature?.details["Lesní půda"]) + " km²",
              "Zemědělská půda":
                Math.round(data?.score?.nature?.details["Zemědělská půda"]) +
                " km²",
              Skládka:
                Math.round(data?.score?.nature?.details["Skládka"]) + " km²",
              Sportoviště:
                Math.round(
                  data?.score?.nature?.details["Sportoviště a rekreační plocha"]
                ) + " km²",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "5px" }}>
          <h2>Zdravotnictví</h2>
          <Table
            data={{
              "Zdravotní střediska":
                data?.score?.medical?.details["Zdravotní střediska"],
              Lékarny:
                data?.score?.medical?.details[
                  "Zařízení lékárenské péče (lékárny)"
                ],
              "Středisko záchranné služby a rychlé zdravotní pomoci":
                data?.score?.medical?.details[
                  "Středisko záchranné služby a rychlé zdravotní pomoci"
                ],
              Zubaři:
                data?.score?.medical?.details[
                  "Samostatná ordinace praktického lékaře stomatologa"
                ],
              "Ordinace lékař pro děti a dorost":
                data?.score?.medical?.details[
                  "Samostatná ordinace praktického lékaře pro děti a dorost"
                ],
              "Ordinace lékaře pro dospělé":
                data?.score?.medical?.details[
                  "Samostatná ordinace praktického lékaře pro dospělé"
                ],
              Gynekologové:
                data?.score?.medical?.details[
                  "Samostatná ordinace praktického lékaře gynekologa"
                ],
              Nemocnice: data?.score?.medical?.details["Nemocnice"],
            }}
          />
        </div>
        <div style={{ flex: 1, padding: "5px" }}>
          <h2>Populace</h2>
          <Table
            data={{
              "Počet obyvatel":
                data?.score?.population?.details[
                  "Počet bydlících obyvatel k 31.12."
                ],
              "Přírustek narozených":
                data?.score?.population?.details["Přirozený přírůstek celkem"],
              "Saldo migrace":
                data?.score?.population?.details["Saldo migrace celkem"],
            }}
          />
        </div>
      </div>
    </div>
  );
}
