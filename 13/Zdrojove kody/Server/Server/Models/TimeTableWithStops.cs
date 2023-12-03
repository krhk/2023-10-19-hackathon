using Server.Data;

namespace Server.Models;

public class TimeTableWithStops
{
    public TimeTable TimeTables { get; set; }
    public Stop Stops { get; set; }
}