import { Heading } from "@/components/general/Heading";
import Layout from "@/components/general/Layout";
import FYPlace from "@/components/home/FYPlace";
import { Place } from "@/types/Place";
import axios from "axios";
import { useEffect, useState } from "react";
import examplePlaces from "../example-place";

export default function HomePage() {
  const [places, setPlaces] = useState<Place[]>(examplePlaces);

  const getPlaces = () => {
    axios.get(`localhost:7216/api/places`).then((res) => {
      setPlaces(res.data);
    });
  };

  useEffect(() => {
    // getPlaces();
  }, []);

  return (
    <Layout>
      <Heading title="Pro vás" icon="Compass" />

      <div className="flex flex-col gap-20">
        {places?.map((place) => {
          return <FYPlace {...place} />;
        })}
      </div>
    </Layout>
  );
}
