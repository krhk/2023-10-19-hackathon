// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);

using System.ComponentModel.DataAnnotations;

public class Attributes
{
    [Key]
    public Guid AttributeId { get; set; } = Guid.NewGuid();
    public string? navaznost { get; set; }
    public string? linka { get; set; }
    public string? spoj { get; set; }
    public string? dopravce { get; set; }
    public string? tc { get; set; }
    public string? prijezd { get; set; }
    public string? ceka { get; set; }
    public string? odjezd { get; set; }
    public string? zastavka { get; set; }
    public string? cislo_cis { get; set; }
    public string? vycka_min { get; set; }
    public string? typ { get; set; }
    public string? linka_d { get; set; }
    public string? spoj_d { get; set; }
    public string? dopravce_d { get; set; }
    public string? ze_zast { get; set; }
    public string? do_zast { get; set; }
    public string? nav_cas { get; set; }
    public string? dp_id { get; set; }
    public int? FID { get; set; }
}

public class Feature
{
    public Attributes attributes { get; set; }
}

public class Field
{
    public string name { get; set; }
    public string type { get; set; }
    public string alias { get; set; }
    public string sqlType { get; set; }
    public int length { get; set; }
    public object domain { get; set; }
    public object defaultValue { get; set; }
}

public class ConnectionModel
{
    public string objectIdFieldName { get; set; }
    public UniqueIdField uniqueIdField { get; set; }
    public string globalIdFieldName { get; set; }
    public List<Field> fields { get; set; }
    public bool exceededTransferLimit { get; set; }
    public List<Feature> features { get; set; }
}

public class UniqueIdField
{
    public string name { get; set; }
    public bool isSystemMaintained { get; set; }
}