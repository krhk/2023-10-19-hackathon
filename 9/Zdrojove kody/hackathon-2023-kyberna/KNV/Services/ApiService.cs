using KNV.Models;
namespace KNV.Services
{
    public class ApiService
    {
        private readonly HttpClient _client;
        private readonly ILogger<ApiService> _logger;

        public const string API_URL_MONUMENTS =
         "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Přírodní_zajímavosti/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

        public const string API_URL_CASTLES =
            "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Zámky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

        public const string API_URL_MUSEUMSANDGALLERIES = 
            "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Muzea_a_galerie/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";


        public const string API_URL_CULTURALS = 
            "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/N%C3%A1rodn%C3%AD_kulturn%C3%AD_pam%C3%A1tky_bodov%C3%A9_objekty/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

        public const string API_URL_LOOKOUTS =
            "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Rozhledny_a_vyhlídky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        public const string API_URL_TECH =
            "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Technické_památky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

        public ApiService(HttpClient client, ILogger<ApiService> logger)
        {
            _client = client;
            _logger = logger;
          
        }
        
        private async Task<T?> Download<T>(string url)
        {
            try
            {
                var d = await _client.GetStringAsync(url);
                var da = await _client.GetFromJsonAsync<T>(url);

                return da;
            }
            catch (Exception ex)
            {
                _logger.LogError($"!!! {ex.Message}");
            }

            return default(T?);
        }
        public async Task<Lookouts> DownloadLookouts()
        {
            return await Download<Lookouts>($"{API_URL_LOOKOUTS}");

        }
        public async Task<Tech> DownloadTech()
        {
            return await Download<Tech>($"{API_URL_TECH}");

        }
        public async Task<MuseumsAndGalleries> DownloadMuseumAndGalleriesData()
        {
            return await Download<MuseumsAndGalleries>($"{API_URL_MUSEUMSANDGALLERIES}");

        }

        public async Task<Monuments> DownloadMonuments()
        {
            return await Download<Monuments>($"{API_URL_MONUMENTS}");
        }

        public async Task<Castles> DownloadCastles()
        {
            return await Download<Castles>($"{API_URL_CASTLES}");
        }

        public async Task<Culturals> DownloadCulturals()

        {
            return await Download<Culturals>(API_URL_CULTURALS);
        }
  
    }
}
