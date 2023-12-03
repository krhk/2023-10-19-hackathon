namespace Server.DBModels
{
    public class Place
    {
        public Place(int placeID, string name, string web, int addressID, string description, string imageUrl)
        {
            PlaceID = placeID;
            Name = name;
            Web = web;
            AddressID = addressID;
            Description = description;
            ImageUrl = imageUrl;
        }

        public Place(int placeID, string name, string web, string description)
        {
            PlaceID = placeID;
            Name = name;
            Web = web;
            Description = description;
        }

        public int PlaceID { get; private set; }
        public string Name { get; private set; }
        public string Web { get; private set; }
        public int AddressID { get; set; }
        public string Description { get; private set; }
        public string ImageUrl { get; set; }
    }
}
