using System.ComponentModel.DataAnnotations;
using Server.Models;
using Server.Models;

namespace Server.Data;

public class Connection
{
    [Key]
    public Guid ConnectionId { get; set; } = Guid.NewGuid();
    public string? Linka { get; set; }
    public string? Spoj { get; set; }
    public string? Dopravce { get; set; }
    public string? Prijezd { get; set; }
    public string? Ceka { get; set; }
    public string? Odjezd { get; set; }
    public string? Zastavka { get; set; }
    public string? VyckaMin { get; set; }
    public string? Typ { get; set; }
    public string? LinkaD { get; set; }
    public string? SpojD { get; set; }
    public string? DopravceD { get; set; }
    public string? ZeZast { get; set; }
    public string? NavCas { get; set; }

    public DateTime? DateOfUpload { get; set; }
}