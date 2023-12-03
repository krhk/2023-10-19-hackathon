import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CityPageHeader } from "./city-page/Header";
import CityPageRating from "./city-page/Rating";
import CityPageReports from "./city-page/reports";
import CircularProgress from "@mui/material/CircularProgress";
import CityPageDetails from "./city-page/CityPageDetails";

export const CityPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const lastLoad = useRef();
  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      if (lastLoad.current === id) return;
      lastLoad.current = id;
      console.log("fetching data");
      const response = await axios
        .get("http://172.21.16.24:8080/town/" + id)
        .catch(() => {});
      setLoading(false);
      if (!response?.data) return;
      setData(response.data);
      console.log(response.data);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <CityPageHeader data={data} />
      <div
        style={{
          width: "90%",
          margin: "auto",
          position: "relative",
          top: "-50px",
        }}
      >
        <CityPageRating data={data} />
        <CityPageDetails data={data} />
        <CityPageReports data={data} />
      </div>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={"100px"} />
        </div>
      )}
    </>
  );
};
