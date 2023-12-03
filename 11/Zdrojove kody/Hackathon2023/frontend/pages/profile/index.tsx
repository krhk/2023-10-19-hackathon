import { Heading, HeadingSmall } from "@/components/general/Heading";
import Layout from "@/components/general/Layout";
import SmallPlace from "@/components/home/SmallPlace";
import examplePlaces from "@/example-place";
import { Place } from "@/types/Place";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [visitedPlaces, setVisitedPlaces] = useState<Place[]>(examplePlaces);

  const getVisited = () => {
    axios.get(`localhost:7216/api/visited`).then((res) => {
      setVisitedPlaces(res.data);
    });
  };

  useEffect(() => {
    // getVisited();
  }, []);

  return (
    <Layout>
      <Heading title="Profil" />

      <HeadingSmall title="Seznam navštívěných míst" />

      <div className="grid grid-flow-row gap-4 grid-cols-3">
        {visitedPlaces?.map((place) => {
          return <SmallPlace key={place.PlaceID} {...place} type="visited" />;
        })}
      </div>
    </Layout>
  );
}
