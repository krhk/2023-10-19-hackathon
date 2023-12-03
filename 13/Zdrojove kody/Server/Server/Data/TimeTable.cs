namespace Server.Data;

public class TimeTable
{
    public Guid TimeTableId { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public string Type { get; set; }
    public List<Stop> Stops { get; set; }
}

public class Stop
{
    public Guid StopId { get; set; } = Guid.NewGuid();
    public string Place { get; set; }
    public List<string> Departures { get; set; }
    
    public virtual Guid TimeTableId { get; set; }
}

