using Server.APIModels.CirkevniPamatkyAPI;
using System.Diagnostics;
using Server.APIModels;
using Server.APIModels.TechnickePamatkyAPI;
using Server.APIModels.MuzeaGalerieAPI;
using Server.APIModels.LanovkyAPI;
using Server.APIModels.KulturniDomyAPI;
using Server.APIModels.KnihovnyAPI;
using Server.APIModels.KinaAPI;
using Server.APIModels.DivadlaFilharmonieAPI;
using Server.APIModels.SkolyAPI;
using Server.APIModels.RozhlednyVyhlidkyAPI;
using Server.APIModels.PevnostiOpevneniAPI;
using Server.APIModels.ZamkyAPI;
using Server.APIModels.ZabavniCentraAPI;
using Server.APIModels.HradyAPI;
using Server.APIModels.KlubyAPI;

namespace Server.Services
{
    //SingletonClass, třída pro komunikaci s api
    public class DataAPIService
    {
        private static DataAPIService _instance;

        public static DataAPIService Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new DataAPIService();

                return _instance;
            }
        }

        const string CIRKEVNI_PAMATKY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/C%C3%ADrkevn%C3%AD_pam%C3%A1tky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string TECHNICKE_PAMATKY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Technické_památky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string MUZEA_GALERIE_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Muzea_a_galerie/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string LANOVKY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/L/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string KULTURNI_DOMY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Kulturní_domy/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string KNIHOVNY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Knihovny/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string KINA_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Kina/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string DIVADLA_FILHARMONIE_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Divadla_a_filharmonie/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string SKOLY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Seznam_škol_a_školských_zařízení/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string ROZHLEDNY_VYHLIDKY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Rozhledny_a_vyhlídky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string PEVNOSTI_OPEVNENI_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Pevnosti_a_opevnění/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string ZAMKY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Zámky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string ZABAVNI_CENTRA_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Zábavní_centra/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string HRADY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Hrady/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const string KLUBY_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Kluby/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

        //Vytahne vsechny cirkevni pamatky
        public CirkevniPamatkyAPI GetCirkevniPamatkyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<CirkevniPamatkyAPI>(CIRKEVNI_PAMATKY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public HradyAPI GetHradyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<HradyAPI>(HRADY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public KlubyAPI GetKlubyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<KlubyAPI>(KLUBY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public TechnickePamatkyAPI GetTechnickePamatkyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<TechnickePamatkyAPI>(TECHNICKE_PAMATKY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public MuzeaGalerieAPI GetMuzeaGalerieFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<MuzeaGalerieAPI>(MUZEA_GALERIE_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public LanovkyAPI GetLanovkyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<LanovkyAPI>(LANOVKY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public KulturniDomyAPI GetKulturniDomyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<KulturniDomyAPI>(KULTURNI_DOMY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public KnihovnyAPI GetKnihovnyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<KnihovnyAPI>(KNIHOVNY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public KinaAPI GetKinaFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<KinaAPI>(KINA_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public DivadlaFilharmonieAPI GetDivadlaFilharmonieFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<DivadlaFilharmonieAPI>(DIVADLA_FILHARMONIE_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public SkolyAPI GetSkolyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<SkolyAPI>(SKOLY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public RozhlednyVyhlidkyAPI GetRozhlednyVyhlidkyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<RozhlednyVyhlidkyAPI>(ROZHLEDNY_VYHLIDKY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public PevnostiOpevneniAPI GetPevnostiOpevneniFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<PevnostiOpevneniAPI>(PEVNOSTI_OPEVNENI_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public ZamkyAPI GetZamkyFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<ZamkyAPI>(ZAMKY_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }

        public ZabavniCentraAPI GetZabavniCentraFromAPI()
        {
            using (HttpClient client = new())
            {
                try
                {
                    return client.GetFromJsonAsync<ZabavniCentraAPI>(ZABAVNI_CENTRA_URL).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                    throw;
                }
            }
        }


    }
}
