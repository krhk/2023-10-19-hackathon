import { Place } from "@/types/Place";
import Link from "next/link";
import { useState } from "react";
import Icon from "../general/Icon";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function SmallPlace({
  PlaceID,
  Name,
  ImageUrl,
  type,
}: Place & { type: "wishlist" | "visited" }) {
  return (
    <ImageSmallPlace id={PlaceID} place={Name} image={ImageUrl} type={type} />
  );
}

function ImageSmallPlace({
  id,
  place,
  image,
  type,
}: {
  id: number;
  place: string;
  image: string;
  type: "wishlist" | "visited";
}) {
  const [wishlisted, setWishlisted] = useState(true);

  const postWishlist = () => {
    // axios.post(`localhost:7216/api/wishlist?id=${id}&wishlisted=${!wishlist}`);

    setWishlisted(!wishlisted);
  };

  const [visited, setVisited] = useState(true);

  const postVisited = () => {
    // axios.post(`localhost:7216/api/visited?id=${id}&visited=${!visited}`);

    setVisited(!visited);
  };

  return (
    <div className="border rounded-xl h-[12rem] overflow-hidden relative">
      <Link href={`/places/${id}`}>
        <img src={image} alt={place} height={400} width={800} />
      </Link>

      <div className="absolute top-6 right-8 flex gap-4 select-none">
        <div
          onClick={postWishlist}
          data-tooltip-id="wishlist"
          data-tooltip-content={
            wishlisted
              ? "Odebrat ze seznamu k návštěvě"
              : "Přidat do seznamu k návštěvě"
          }
        >
          <Icon
            icon="Heart"
            weight={wishlisted ? "fill" : "bold"}
            className={`w-6 h-6 transition-all cursor-pointer ${
              wishlisted ? "text-primary" : "text-white"
            }`}
          />

          <Tooltip id="wishlist" />
        </div>

        <div
          onClick={postVisited}
          data-tooltip-id="visited"
          data-tooltip-content={
            visited
              ? "Odebrat ze seznamu již navštívěných"
              : "Přidat do seznamu již navštívěných"
          }
        >
          <Icon
            icon="UserPlus"
            weight={visited ? "fill" : "bold"}
            className={`w-6 h-6 transition-all cursor-pointer ${
              visited ? "text-primary" : "text-white"
            }`}
          />

          <Tooltip id="visited" />
        </div>
      </div>

      <div className="pointer-events-none flex items-end justify-between px-8 py-6 h-32 bg-gradient-to-b from-transparent to-black bg-opacity-75 w-full absolute bottom-0 select-none">
        <p className="text-white font-bold text-xl">{place}</p>
      </div>
    </div>
  );
}
