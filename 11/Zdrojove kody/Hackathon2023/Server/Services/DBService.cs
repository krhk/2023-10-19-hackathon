using Microsoft.Data.SqlClient;
using Server.DBModels;
using System.Diagnostics;

namespace Server.Services
{
    public class DBService
    {
        private static DBService _instance;

        public static DBService Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new DBService();



                return _instance;
            }
        }

        private string _connectionString;
        private SqlConnection _con;

        public void BuildConnection()
        {
            SqlConnectionStringBuilder builder = new();

            builder.DataSource = "127.0.0.1";
            builder.InitialCatalog = "HackathonKHKdb";
            builder.UserID = "HackathonAppLogin";
            builder.Password = "cisco";

            builder.TrustServerCertificate = true;

            _connectionString = builder.ConnectionString;

            _con = new(_connectionString);
            _con.Open();
            Connect();
        }

        //Otevření připojení
        private void Connect()
        {
            try
            {
                //_con.Open();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        public void AddPlace(Place place, bool checkDuplicity = true)
        {
            //Pokud v db existuje
            if (checkDuplicity)
            {

                if (CheckIfPlaceIsInDBByPlace(place))
                {
                    return;
                }
            }

            using (SqlCommand cmd = new SqlCommand($"insert into [Place] ([Name],[Web],[AddressID],[Description],[ImageUrl]) values ('{place.Name}','{place.Web}','{place.AddressID}','{place.Description}','{place.ImageUrl}')", _con))
            {
                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public List<Place> GetTopPlaces(int count)
        {
            List<Place> places = new();
            using (SqlCommand cmd = new($"select top {count} [PlaceID],[Name],[Web],[AddressID],[Description],[ImageUrl] from [Place]", _con))
            {
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        places.Add(new(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetInt32(3), reader.GetString(4), reader.GetString(5)));
                    }
                }
            }

            return places;
        }

        //Kontrola duplicitních dat
        public bool CheckIfPlaceIsInDBByPlace(Place place)
        {
            using (SqlCommand cmd = new($"select [Name] from [Place] where [Name] = '{place.Name}' and [Web] = '{place.Web}' and [Description] = '{place.Description}'", _con))
            {
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    return reader.Read();
                }
            }
        }

        public void UpdatePlaceByID(int id)
        {

        }

        //Přidá adresu do db
        public void AddAddress(Address address)
        {
            if (GetAddressIDByAddress(address) > 0)
            {
                return;
            }

            using (SqlCommand cmd = new SqlCommand($"insert into [Address] ([City],[Street],[Zip],[Latitude],[Longitude]) values ('{address.City}','{address.Street}','{address.Zip}',{(address.Latitude).ToString().Replace(',', '.')},{(address.Longitude).ToString().Replace(',', '.')})", _con))
            {
                try
                {

                    cmd.ExecuteNonQuery();
                }
                catch (Exception)
                {

                    throw;
                }
            }
        }

        public List<Address> GetTopAddresses(int count)
        {
            List<Address> addresses = new();
            using (SqlCommand cmd = new($"select top {count} [AddressID],[City],[Street],[Zip],[Latitude],[Longitude] from [Address]", _con))
            {
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        addresses.Add(new(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), (float)reader.GetDouble(4), (float)reader.GetDouble(5)));
                    }
                }
            }
            return addresses;
        }

        public int GetAddressIDByAddress(Address address)
        {
            using (SqlCommand cmd = new($"select [AddressID] from [Address] where [City] = '{address.City}' and [Street] = '{address.Street}' and [Zip] = '{address.Zip}' and [Latitude] = {address.Latitude.ToString().Replace(',', '.')} and [Longitude] = {address.Longitude.ToString().Replace(',', '.')}", _con))
            {
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    try
                    {
                        reader.Read();

                        return reader.GetInt32(0);
                    }
                    catch (Exception e)
                    {
                        Debug.WriteLine(e);
                        return 0;
                    }
                }
            }
        }
    }
}
