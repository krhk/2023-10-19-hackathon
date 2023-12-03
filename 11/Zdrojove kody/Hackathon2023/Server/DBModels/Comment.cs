namespace Server.DBModels
{
    public class Comment
    {
        public Comment(int commendID, int userID, string text, DateTime dateCommented, int placeID)
        {
            CommendID = commendID;
            UserID = userID;
            Text = text;
            DateCommented = dateCommented;
            PlaceID = placeID;
        }

        public int CommendID { get; private set; }
        public int UserID { get; private set; }
        public string Text { get; private set; }
        public DateTime DateCommented { get; private set; }
        public int PlaceID { get; private set; }

    }
}
