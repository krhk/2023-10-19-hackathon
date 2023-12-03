using Server.APIModels.CirkevniPamatkyAPI;
using Server.APIModels.DivadlaFilharmonieAPI;
using Server.APIModels.HradyAPI;
using Server.APIModels.KinaAPI;
using Server.APIModels.KlubyAPI;
using Server.APIModels.KnihovnyAPI;
using Server.APIModels.KulturniDomyAPI;
using Server.APIModels.LanovkyAPI;
using Server.APIModels.MuzeaGalerieAPI;
using Server.APIModels.PevnostiOpevneniAPI;
using Server.APIModels.RozhlednyVyhlidkyAPI;
using Server.APIModels.SkolyAPI;
using Server.APIModels.TechnickePamatkyAPI;
using Server.APIModels.ZabavniCentraAPI;
using Server.APIModels.ZamkyAPI;
using Server.DBModels;
using Server.FrontendModel;

namespace Server.Services
{
    public static class ConverterService
    {
        public static List<Place> ConvertPlace(CirkevniPamatkyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i<src.features.Length && i < 20; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);
                
                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(DivadlaFilharmonieAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(KinaAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.typ_kina);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(KnihovnyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.typ_knihovny);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(KulturniDomyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.technicka_vybavenost);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(LanovkyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(MuzeaGalerieAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.typ__muzea);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(PevnostiOpevneniAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(RozhlednyVyhlidkyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(SkolyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.zarizeni_druh);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(TechnickePamatkyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(ZabavniCentraAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(ZamkyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(HradyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static List<Place> ConvertPlace(KlubyAPI src)
        {
            List<Place> places = new List<Place>();

            for (int i = 0; i < src.features.Length; i++)
            {
                Place place = new(0, src.features[i].properties.nazev, src.features[i].properties.www, src.features[i].properties.popis);

                if (DBService.Instance.CheckIfPlaceIsInDBByPlace(place))
                {
                    continue;
                }

                Address address = new(0, src.features[i].properties.nazev_obce, src.features[i].properties.nazev_ulice + " " + src.features[i].properties.cislo_domovni, src.features[i].properties.psc, src.features[i].geometry.coordinates[0], src.features[i].geometry.coordinates[1]);

                //Přidání adresy do db
                DBService.Instance.AddAddress(address);

                //Získání id adresy
                int addressID = DBService.Instance.GetAddressIDByAddress(address);

                //Získání url obrázku
                string imageUrl = ImageAPIService.Instance.GetImageUrl(src.features[i].properties.nazev);

                place.AddressID = addressID;
                place.ImageUrl = imageUrl;

                places.Add(place);
            }
            return places;
        }

        public static FrontendPlace DBPlaceToFrontendPlace(Place place, Address address)
        {
            //Dočasné řešení pro liky
            Random r = new();

            FrontendPlace fPlace = new()
            {
                PlaceID = place.PlaceID,
                Name = place.Name,
                Web = place.Web,
                Address = DBAddressToFrontedPlace(address),
                Description = place.Description,
                ImageUrl = place.ImageUrl,
                Likes = r.Next(0, 10),
                Dislikes = r.Next(0, 10),
                Comments = new FrontendComment[0]
            };

            return fPlace;
        }

        public static FrontendAddress DBAddressToFrontedPlace(Address address)
        {
            FrontendAddress fAddress = new()
            {
                Street = address.Street,
                City = address.City,
                Zip = address.Zip,
                Longitude = address.Longitude,
                Latitude = address.Latitude
            };

            return fAddress;
        }
    }
}
