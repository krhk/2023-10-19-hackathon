import { postVisited, postWishlist } from "@/components/api/api";
import Comment from "@/components/general/Comment";
import { Heading, HeadingSmall } from "@/components/general/Heading";
import Icon from "@/components/general/Icon";
import Layout from "@/components/general/Layout";
import LikeDislike from "@/components/home/LikeDislike";
import examplePlaces from "@/example-place";
import { Liked, Place } from "@/types/Place";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Place() {
  const { id } = useParams();

  const [place, setPlace] = useState<Place>(
    examplePlaces.find((place) => place.PlaceID === Number(id))!
  );

  const getPlace = () => {
    axios.get(`localhost:7216/api/places?id=${id}`).then((res) => {
      setPlace(res.data);
    });
  };

  useEffect(() => {
    // getPlace();
  }, []);

  const [liked, setLiked] = useState<Liked>(Liked.NoReaction);

  const [wishlisted, setWishlisted] = useState(false);
  const [visited, setVisited] = useState(false);

  return (
    <Layout>
      {place && (
        <div>
          <div className="flex gap-12 justify-between">
            <div className="py-4 flex flex-col gap-8 w-[30rem]">
              <Heading
                title={place.Name}
                description={`${place.Address.Street}, ${place.Address.City}, 
                  ${place.Address.Zip}`}
              />

              <div className="flex flex-col gap-1 mt-[-4rem]">
                <p className="font-semibold text-gray-600"></p>

                <p>{place.Description}</p>
              </div>

              <div className="flex gap-6">
                <LikeDislike
                  liked={liked}
                  likes={place.Likes}
                  dislikes={place.Dislikes}
                  id={place.PlaceID}
                  setLiked={setLiked}
                  color="text-black"
                />

                <p className="text-gray-300">•</p>

                <div
                  onClick={() => postWishlist(setWishlisted)}
                  data-tooltip-id="wishlist"
                  data-tooltip-content={
                    wishlisted
                      ? "Odebrat ze seznamu k návštěvě"
                      : "Přidat do seznamu k návštěvě"
                  }
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <Icon
                    icon="Heart"
                    weight={wishlisted ? "fill" : "bold"}
                    className={`w-6 h-6 transition-all cursor-pointer ${
                      wishlisted ? "text-primary" : "text-black"
                    }`}
                  />

                  <Tooltip id="wishlist" />
                </div>

                <div
                  onClick={() => postVisited(setVisited)}
                  data-tooltip-id="visited"
                  data-tooltip-content={
                    visited
                      ? "Odebrat ze seznamu již navštívěných"
                      : "Přidat do seznamu již navštívěných"
                  }
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <Icon
                    icon="UserPlus"
                    weight={visited ? "fill" : "bold"}
                    className={`w-6 h-6 transition-all cursor-pointer ${
                      visited ? "text-primary" : "text-black"
                    }`}
                  />

                  <Tooltip id="visited" />
                </div>
              </div>
            </div>

            <div className="w-1/2 h-[18rem] rounded-xl overflow-hidden">
              <img src={place.ImageUrl} alt={place.Name} />
            </div>
          </div>

          <div className="mt-12">
            <HeadingSmall title="Komentáře" />

            <div className="flex flex-col gap-6">
              {place.Comments.map((comment) => {
                return <Comment name={comment.Name} text={comment.Text} />;
              })}

              <hr />

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon icon="Tree" className="text-white w-4 h-4" />
                </div>

                <div className="w-fit">
                  <p className="font-bold">Testovací uživatel</p>
                  <input
                    className="bg-transparent outline-none text-sm"
                    placeholder="Váš komentář..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
