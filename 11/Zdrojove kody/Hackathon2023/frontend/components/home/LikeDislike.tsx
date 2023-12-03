import { Liked } from "@/types/Place";
import Icon from "../general/Icon";
import { postLike } from "../api/api";
import { Dispatch, SetStateAction } from "react";

export default function LikeDislike({
  liked,
  likes,
  dislikes,
  setLiked,
  id,
  color,
}: {
  liked: Liked;
  likes: number;
  dislikes: number;
  setLiked: Dispatch<SetStateAction<Liked>>;
  id: number;
  color: string;
}) {
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

  return (
    <div className="flex gap-4">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={thumbsUp}
      >
        <Icon
          icon="ThumbsUp"
          weight={liked === Liked.Liked ? "fill" : "bold"}
          className={`w-6 h-6 ${
            liked === Liked.Liked ? "text-primary" : color
          }`}
        />
        <p
          className={`${
            liked === Liked.Liked ? "text-primary" : color
          } font-bold transition-all`}
        >
          {likes}
        </p>
      </div>

      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={thumbsDown}
      >
        <Icon
          icon="ThumbsDown"
          weight={liked === Liked.Disliked ? "fill" : "bold"}
          className={`w-6 h-6 ${
            liked === Liked.Disliked ? "text-primary" : color
          }`}
        />
        <p
          className={`${
            liked === Liked.Disliked ? "text-primary" : color
          } font-bold transition-all`}
        >
          {dislikes}
        </p>
      </div>
    </div>
  );
}
