import { Liked } from "@/types/Place";
import { Dispatch, SetStateAction } from "react";

export const postLike = (like: Liked, placeId: number, userId: number) => {
  // axios.post(
  //   `localhost:7216/api/like?id=${placeId}&like=${like}&userId=${userId}`
  // );
};

export const postWishlist = (
  setWishlisted: Dispatch<SetStateAction<boolean>>
) => {
  // axios.post(`localhost:7216/api/wishlist?id=${id}&wishlisted=${!wishlist}`);

  setWishlisted((prev) => !prev);
};

export const postVisited = (setVisited: Dispatch<SetStateAction<boolean>>) => {
  // axios.post(`localhost:7216/api/visited?id=${id}&visited=${!visited}`);

  setVisited((prev) => !prev);
};
