using KNV.Models;
using KNV.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace KNV.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApiService _api;

        public HomeController(ILogger<HomeController> logger, ApiService api)
        {
            _logger = logger;
            _api = api;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Random()
        {
            int amountOfActions = 6;
            Random r = new();
            // MuseumAndGallery, Monument, Castle, Cultural
            switch (r.Next(0,amountOfActions))
            {
                case 0:
                    return RedirectToAction("MuseumAndGallery");
                case 1:
                    return RedirectToAction("Monument");
                case 2:
                    return RedirectToAction("Castle");
                case 3:
                    return RedirectToAction("Cultural");
                case 4:
                    return RedirectToAction("Tech");
            }
            return RedirectToAction("index");

        }
        public IActionResult Tech()
        {
            Tech data = _api.DownloadTech().GetAwaiter().GetResult();


            if (data != null)
            {
                return View(data);
            }
            return View("ErrorModel");

        }
        public IActionResult MuseumAndGallery()
        {
            MuseumsAndGalleries data = _api.DownloadMuseumAndGalleriesData().GetAwaiter().GetResult();


            if (data != null)
            {
                return View(data);
            }
            return View("ErrorModel");
        }

        public IActionResult Lookouts()
        {
            Lookouts data = _api.DownloadLookouts().GetAwaiter().GetResult();


            if (data != null)
            {
                return View(data);
            }
            return View("ErrorModel");

        }
       

        public IActionResult Monument()
        {

            var mon = _api.DownloadMonuments().GetAwaiter().GetResult();
            if(mon != null)
            {
                return View(mon);
            }

            return View("ErrorModel");
        }

        public IActionResult Castle()
        {
            var cas = _api.DownloadCastles().GetAwaiter().GetResult();
            if (cas != null)
            {
                return View(cas);
            }

            return View("ErrorModel");
        }

        public IActionResult Cultural()
        {
            var cul = _api.DownloadCulturals().GetAwaiter().GetResult();

            if (cul != null)
            {
                return View(cul);
            }

            return View("ErrorModel");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}