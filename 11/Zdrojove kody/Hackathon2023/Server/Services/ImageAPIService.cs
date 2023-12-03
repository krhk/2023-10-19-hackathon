using Server.APIModels.ImageAPI;
using System.Diagnostics;

namespace Server.Services
{
    public class ImageAPIService
    {
        private const string API_URL = "https://www.googleapis.com/customsearch/v1";
        private const string KEY = "AIzaSyDw75i_0sLQGSzfV7lV1xcW65E36lB-bI4";
        private const string CX = "55290a5fa606a4a8c";
        private const string SEARCH_TYPE = "image";

        private static ImageAPIService _instance;
        public static ImageAPIService Instance
        { 
            get
            { 
                if (_instance == null)
                    _instance = new();

                return _instance;
            }
        }

        public string GetImageUrl(string searchKeyword)
        {
            try
            {
                using (HttpClient client = new())
                {
                    Rootobject response = client.GetFromJsonAsync<Rootobject>($"{API_URL}?q={searchKeyword}&key={KEY}&cx={CX}&searchType={SEARCH_TYPE}").Result;
                    Thread.Sleep(1000);
                    return response.items[0].link;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                return null;
            }
        }
    }
}
