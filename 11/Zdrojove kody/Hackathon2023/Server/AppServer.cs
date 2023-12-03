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
using Server.Services;

namespace Server
{
    //Singleton server, stará se o vše, má vřejné metody pro komunikaci s vlastní api
    public class AppServer
    {
        //Singleton setup
        private static AppServer _instance;
        public static AppServer Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new AppServer();

                return _instance;
            }
        }

        public void Run()
        {
            //Navaze spojeni s db
            DBService.Instance.BuildConnection();

            //Ziskani places
            CirkevniPamatkyAPI data = DataAPIService.Instance.GetCirkevniPamatkyFromAPI();

            //Prekonvertovani, prida addressy do databaze
            List<Place> places = ConverterService.ConvertPlace(data);

            //DivadlaFilharmonieAPI data1 = DataAPIService.Instance.GetDivadlaFilharmonieFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data1));

            //HradyAPI data2 = DataAPIService.Instance.GetHradyFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data2));

            //KinaAPI data3 = DataAPIService.Instance.GetKinaFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data3));

            //KlubyAPI data4 = DataAPIService.Instance.GetKlubyFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data4));

            //KnihovnyAPI data5 = DataAPIService.Instance.GetKnihovnyFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data5));


            //KulturniDomyAPI data6 = DataAPIService.Instance.GetKulturniDomyFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data6));


            //LanovkyAPI data7 = DataAPIService.Instance.GetLanovkyFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data7));


            //MuzeaGalerieAPI data8 = DataAPIService.Instance.GetMuzeaGalerieFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data8));


            //PevnostiOpevneniAPI data9 = DataAPIService.Instance.GetPevnostiOpevneniFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data9));


            //RozhlednyVyhlidkyAPI data10 = DataAPIService.Instance.GetRozhlednyVyhlidkyFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data10));


            //SkolyAPI data11 = DataAPIService.Instance.GetSkolyFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data11));

            //TechnickePamatkyAPI data12 = DataAPIService.Instance.GetTechnickePamatkyFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data12));

            //ZabavniCentraAPI data13 = DataAPIService.Instance.GetZabavniCentraFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data13));

            //ZamkyAPI data14 = DataAPIService.Instance.GetZamkyFromAPI();
            //places.AddRange(ConverterService.ConvertPlace(data14));



            //Pridani places do db
            foreach (var item in places)
            {
                DBService.Instance.AddPlace(item, false);
            }
        }

        public List<FrontendPlace> GetPlaces()
        {
            List<Place> places = DBService.Instance.GetTopPlaces(40);
            List<Address> addresses = DBService.Instance.GetTopAddresses(40);

            List<FrontendPlace> frontedPlaces = new();

            for (int i = 0; i < places.Count; i++)
            {
                frontedPlaces.Add(ConverterService.DBPlaceToFrontendPlace(places[i], addresses[i]));
            }

            return frontedPlaces;
        }
    }
}
