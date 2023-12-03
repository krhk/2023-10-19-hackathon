import React, { useEffect, useState } from "react";

// export const useData = () => {
//   const [data, setData] = useState([]);

//   const fetchData()

//   useEffect(() => {

//   })

// }

export const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/N%C3%A1rodn%C3%AD_kulturn%C3%AD_pam%C3%A1tky_bodov%C3%A9_objekty/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.features);
        //console.log(data.features);
      });
  }, [setData]);

  const extractedData = data.map((feature) => {
    // let x = features.attributes?.x;
    // let y = features.attributes?.y;
    //console.log(feature);
    //console.log(feature.properties?.nazev);
    return {
      //geocode: [y, x],
      Nazev_Pozemku: feature.properties?.nazev,
      Nazev_Objektu: feature.properties?.objekt,

      // x: features.attributes?.x,
      // y: features.attributes?.y,
      //popup: features.attributes?.
    };
  });
  return extractedData;
};