using Microsoft.AspNetCore.Authentication;

namespace Server.DBModels
{
    public class User
    {
        public User(int userID, string name, string username, string password, string profilePicture)
        {
            UserID = userID;
            Name = name;
            Username = username;
            Password = password;
            ProfilePicture = profilePicture;
        }


        public int UserID { get; private set; }
        public string Name { get; private set; }
        public string Username { get; private set; }
        public string Password { get; private set; }
        public string ProfilePicture { get; private set; }
    }
}
