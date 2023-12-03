using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Models;
using Server.Services;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly DataService _data;

    public HomeController(ILogger<HomeController> logger, DataService data)
    {
        _logger = logger;

        _data = data;
    }

    [HttpGet("/api/v1/connections/withstart")]
    public async Task<List<Connection>> GetConnectionWithStart(string startingStation, string transferStation, string time, string fromStation)
    {
        var data = await _data.GetDataWithStart(startingStation, transferStation, time, fromStation);

        return data;
    }
    
    [HttpGet("/api/v1/stations")]
    public async Task<List<string>> GetStations()
    {
        var data = await _data.GetStations();

        return data;
    }
    
    [HttpGet("/api/v1/fromstations")]
    public async Task<List<string>> GetFromStations()
    {
        var data = await _data.GetFromStations();

        return data;
    }
    
    [HttpGet("/api/v1/connections/withoutstart")]
    public async Task<List<Connection>> GetConnectionWithoutStart(string transferStation, string time, string fromStation)
    {
        var data = await _data.GetDataWithoutStart(transferStation, time, fromStation);

        return data;
    }
    
    [HttpGet("/api/v1/connections/getTimeTables")]
    public async Task<List<TimeTableWithStops>> GetTimeTables(string stop, string time)
    {
        var data = await _data.GetTimeTables(stop, time);

        return data;
    }

    public IActionResult Privacy()
    {
        return View();
    }
    
    public IActionResult Index()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}