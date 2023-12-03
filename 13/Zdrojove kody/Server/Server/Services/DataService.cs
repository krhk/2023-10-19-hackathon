using System.Globalization;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices.ComTypes;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.Data;
using Server.Models;

namespace Server.Services;

public class DataService
{
    private readonly HttpClient _client;
    private readonly ILogger<DataService> _logger;
    private readonly ApplicationDbContext _db;

    public DataService(ILogger<DataService> logger, ApplicationDbContext db)
    {
        _logger = logger;

        _db = db;

        _client = new();
    }

    public async Task<List<Connection>> GetDataWithStart(string startingStation, string transferStation, string time, string fromStation)
    {
        var data = await Download();
        
        if (time == null)
        {
            time = DateTime.Now.ToString("HH:mm");
        }

        if (fromStation == null)
        {
            return data.Where(x => x.ZeZast == startingStation && x.Zastavka == transferStation &&
                                                        TimeSpan.TryParse(x.Odjezd, out var odjezdTimeSpan) &&
                                                        TimeSpan.TryParse(time, out var targetTimeSpan) &&
                                                        targetTimeSpan < odjezdTimeSpan &&
                                                        Math.Abs((targetTimeSpan - odjezdTimeSpan).TotalHours) <= 2)
                .ToList();
        }
        
        return data.Where(x => x.ZeZast == startingStation && x.ZeZast == fromStation && x.Zastavka == transferStation &&
                                                    TimeSpan.TryParse(x.Odjezd, out var odjezdTimeSpan) &&
                                                    TimeSpan.TryParse(time, out var targetTimeSpan) &&
                                                    targetTimeSpan < odjezdTimeSpan &&
                                                    Math.Abs((targetTimeSpan - odjezdTimeSpan).TotalHours) <= 2)
            .ToList();
    }
    
    public async Task<List<Connection>> GetDataWithoutStart(string transferStation, string time, string fromStation)
    {
        var data = await Download();
        
        if (time == null)
        {
            time = DateTime.Now.ToString("HH:mm");
        }

        if (fromStation == null)
        {

            return data
                .Where(x => x.Zastavka == transferStation &&
                            TimeSpan.TryParse(x.Odjezd, out var odjezdTimeSpan) &&
                            TimeSpan.TryParse(time, out var targetTimeSpan) &&
                            targetTimeSpan < odjezdTimeSpan &&
                            Math.Abs((targetTimeSpan - odjezdTimeSpan).TotalHours) <= 2)
                .ToList();
        }

        return data
            .Where(x => x.Zastavka == transferStation && x.ZeZast == fromStation &&
                        TimeSpan.TryParse(x.Odjezd, out var odjezdTimeSpan) &&
                        TimeSpan.TryParse(time, out var targetTimeSpan) &&
                        targetTimeSpan < odjezdTimeSpan &&
                        Math.Abs((targetTimeSpan - odjezdTimeSpan).TotalHours) <= 2)
            .ToList();
    }

    public async Task<List<string>> GetStations()
    {
        List<string> stations = new();

        var data = await Download();
        
        foreach (var station in data)
        {
            if (!stations.Contains(station.Zastavka) && station.Zastavka != null)
            {
                stations.Add(station.Zastavka.Trim());
            }
        }

        return stations;
    }
    
    public async Task<List<string>> GetFromStations()
    {
        List<string> stations = new();

        var data = await Download();
        
        foreach (var station in data)
        {
            if (!stations.Contains(station.ZeZast) && station.ZeZast != null)
            {
                stations.Add(station.ZeZast.Trim());
            }
        }

        return stations;
    }
    
    public async Task<List<TimeTableWithStops>> GetTimeTables(string stop, string time)
    {
        var dbStops = _db.Stops.Where(x => x.Place == stop).ToList();

        List<TimeTable> dbTimeTables = new();
        
        List<TimeTableWithStops> timeTableWithStops = new();
        
        if (time == null)
        {
            time = DateTime.Now.ToString("HH:mm");
        }

        foreach (var dbStop in dbStops)
        {
            var timeTable = _db.TimeTables.FirstOrDefault(x => x.TimeTableId == dbStop.TimeTableId);

            if (timeTable != null)
            {
                dbTimeTables.Add(timeTable);

                foreach (var stopTime in dbStop.Departures)
                {
                    timeTableWithStops.Add(new TimeTableWithStops()
                    {
                        Stops = dbStop,
                        TimeTables = timeTable
                    });
                }
            }
        }

        return timeTableWithStops;
    }

    private async Task<List<Connection>> Download()
    {
        try
        {
            var dataFromDb = _db.Connections.Where(x => x.DateOfUpload >= DateTime.Now.AddDays(-7)).ToList();

            if (dataFromDb.Count > 0)
            {
                return dataFromDb;
            }

            List<Connection> connections = new();
            
            _db.Connections.RemoveRange();
            
            var data = await _client.GetStringAsync(
                "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Seznam_zaručených_přípojů_(vyčkávání_autobusů_na_autobusy_a_vlaky)/FeatureServer/0/query?where=1%3D1&outFields=linka,spoj,dopravce,prijezd,ceka,odjezd,zastavka,vycka_min,typ,linka_d,dopravce_d,ze_zast,nav_cas,spoj_d&outSR=4326&f=json");

            var json = JsonConvert.DeserializeObject<ConnectionModel>(data);

            foreach (var attribute in json.features)
            {
                var connection = new Connection()
                {
                    Ceka = attribute.attributes.ceka,
                    Dopravce = attribute.attributes.dopravce,
                    Linka = attribute.attributes.linka,
                    Odjezd = attribute.attributes.odjezd,
                    Prijezd = attribute.attributes.prijezd,
                    Spoj = attribute.attributes.spoj,
                    Typ = attribute.attributes.typ,
                    Zastavka = attribute.attributes.zastavka,
                    ConnectionId = Guid.NewGuid(),
                    DopravceD = attribute.attributes.dopravce_d,
                    LinkaD = attribute.attributes.linka_d,
                    NavCas = attribute.attributes.nav_cas,
                    SpojD = attribute.attributes.spoj_d,
                    VyckaMin = attribute.attributes.vycka_min,
                    ZeZast = attribute.attributes.ze_zast,
                    DateOfUpload = DateTime.Now
                };
                
                connections.Add(connection);

                _db.Connections.Add(connection);
            }

            _db.SaveChanges();

            return connections;
        }
        catch (Exception ex)
        {
            _logger.LogError("Error on downloading data" + ex.Message);
        }

        return null;
    }
}