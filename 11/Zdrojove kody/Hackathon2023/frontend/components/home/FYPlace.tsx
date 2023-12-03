import { useState } from "react";
import Icon from "../general/Icon";
import { Liked, Place } from "@/types/Place";
import axios from "axios";
import Link from "next/link";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Comment from "../general/Comment";
import LikeDislike from "./LikeDislike";

export default function FYPlace({
  PlaceID,
  Name,
  Address,
  Likes,
  Dislikes,
  ImageUrl,
  Comments,
}: Place) {
  return (
    <div className="flex flex-col gap-8 w-fit">
      <ImagePlace
        id={PlaceID}
        place={Name}
        address={`${Address.Street}, ${Address.City}`}
        image={ImageUrl}
        likes={Likes}
        dislikes={Dislikes}
      />

      <div className="pl-12">
        <Comment name={Comments[0].Name} text={Comments[0].Text} />
      </div>
    </div>
  );
}

function ImagePlace({
  id,
  place,
  address,
  likes,
  dislikes,
  image,
}: {
  id: number;
  place: string;
  address: string;
  likes: number;
  dislikes: number;
  image: string;
}) {
  const [liked, setLiked] = useState<Liked>(Liked.NoReaction);
  const userId = 2;

  const thumbsUp = () => {
    if (liked === Liked.Liked) {
      setLiked(Liked.NoReaction);
      postLike(Liked.NoReaction, id, userId);
    } else {
      setLiked(Liked.Liked);
      postLike(Liked.Liked, id, userId);
    }
  };

  const thumbsDown = () => {
    if (liked === Liked.Disliked) {
      setLiked(Liked.NoReaction);
      postLike(Liked.NoReaction, id, userId);
    } else {
      setLiked(Liked.Disliked);
      postLike(Liked.Disliked, id, userId);
    }
  };

  const postLike = (like: Liked, placeId: number, userId: number) => {
    // axios.post(
    //   `localhost:7216/api/like?id=${placeId}&like=${like}&userId=${userId}`
    // );
  };

  const [wishlisted, setWishlisted] = useState(false);

  const postWishlist = () => {
    // axios.post(`localhost:7216/api/wishlist?id=${id}&wishlisted=${!wishlist}`);

    setWishlisted(!wishlisted);
  };

  const [visited, setVisited] = useState(false);

  const postVisited = () => {
    // axios.post(`localhost:7216/api/visited?id=${id}&visited=${!visited}`);

    setVisited(!visited);
  };

  return (
    <div className="border rounded-xl w-[50rem] h-[25rem] overflow-hidden relative">
      <Link href={`/places/${id}`}>
        <img src={image} alt={place} height={400} width={800} />
      </Link>

      <div className="absolute top-12 right-12 flex gap-4 select-none">
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

      <div className="pointer-events-none flex items-end justify-between px-12 py-6 h-48 bg-gradient-to-b from-transparent to-black w-full absolute bottom-0 select-none">
        <div className="flex flex-col">
          <p className="text-white font-bold text-xl">{place}</p>
          <p className="text-gray-300">{address}</p>
        </div>

        <LikeDislike
          liked={liked}
          likes={likes}
          dislikes={dislikes}
          id={id}
          setLiked={setLiked}
          color="text-white"
        />
      </div>
    </div>
  );
}
