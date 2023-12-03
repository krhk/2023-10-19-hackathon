namespace Server.FrontendModel
{
    public class FrontendPlace
    {
        public int PlaceID { get; set; }
        public string Name { get; set; }
        public string Web { get; set; }
        public FrontendAddress Address { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public FrontendComment[] Comments { get; set; }
    }
}
