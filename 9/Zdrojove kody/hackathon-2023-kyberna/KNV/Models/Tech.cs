namespace KNV.Models
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class TP_Feature
    {
        public string Type { get; set; }
        public int Id { get; set; }
        public TP_Geometry Geometry { get; set; }
        public TP_Properties Properties { get; set; }
    }

    public class TP_Geometry
    {
        public string Type { get; set; }
        public List<double> Coordinates { get; set; }
    }

    public class TP_Properties
    {
        public string Nazev { get; set; }
        public string Popis { get; set; }
        public string Nazev_Vusc { get; set; }
        public string Kod_Vusc { get; set; }
        public string Nazev_Okresu { get; set; }
        public string Kod_Okresu { get; set; }
        public string Nazev_Orp { get; set; }
        public string Kod_Orp { get; set; }
        public string Nazev_Obce { get; set; }
        public string Kod_Obce { get; set; }
        public string Nazev_Ulice { get; set; }
        public string Cislo_Domovni { get; set; }
        public string Typ_Cisla_Domovniho { get; set; }
        public string Cislo_Orientacni { get; set; }
        public string Psc { get; set; }
        public string Www { get; set; }
        public string Telefon { get; set; }
        public string Wkt { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string DpId { get; set; }
        public string DsId { get; set; }
        public int OBJECTID { get; set; }
    }

    public class Tech
    {
        public string Type { get; set; }
        public List<TP_Feature> Features { get; set; }
    }


}
