import { Heading } from "@/components/general/Heading";
import Layout from "@/components/general/Layout";
import SmallPlace from "@/components/home/SmallPlace";
import examplePlaces from "@/example-place";
import { Place } from "@/types/Place";
import axios from "axios";
import { useEffect, useState } from "react";

export default function WishListPage() {
  const [wishListPlaces, setWishListPlaces] = useState<Place[]>(examplePlaces);

  const getWishList = () => {
    axios.get(`localhost:7216/api/wishlist`).then((res) => {
      setWishListPlaces(res.data);
    });
  };

  useEffect(() => {
    // getWishList();
  }, []);

  return (
    <Layout>
      <Heading title="Seznam míst k návštěvě" />

      <div className="grid grid-flow-row gap-4 grid-cols-3">
        {wishListPlaces?.map((place) => {
          return <SmallPlace key={place.PlaceID} {...place} type="wishlist" />;
        })}
      </div>
    </Layout>
  );
}
