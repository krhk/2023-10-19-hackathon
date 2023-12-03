namespace Server.DBModels
{
    public class Address
    {
        public Address(int addressID, string city, string street, string zip, float latitude, float longitude)
        {
            AddressID = addressID;
            City = city;
            Street = street;
            Zip = zip;
            Latitude = latitude;
            Longitude = longitude;
        }

        public int AddressID { get; private set; }
        public string City { get; private set; }
        public string Street { get; private set; }
        public string Zip { get; private set; }
        public float Latitude { get; private set; }
        public float Longitude { get; private set; }
    }
}
