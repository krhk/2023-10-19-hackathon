export interface Place {
  PlaceID: number;
  Name: string;
  Web: string;
  Address: {
    Street: string;
    City: string;
    Zip: string;
    Longitude: number;
    Latitude: number;
  };
  Description: string;
  ImageUrl: string;
  Likes: number;
  Dislikes: number;
  Comments: {
    Name: string;
    // Avatar?: string;
    Text: string;
  }[];
}

export enum Liked {
  Liked = 1,
  Disliked = -1,
  NoReaction = 0,
}
