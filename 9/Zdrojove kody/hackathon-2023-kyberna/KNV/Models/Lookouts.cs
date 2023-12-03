namespace KNV.Models
{
    public class RAV_Feature
    {
        public string Type { get; set; }
        public int Id { get; set; }
        public RAV_Geometry Geometry { get; set; }
        public RAV_Properties Properties { get; set; }
    }

    public class RAV_Geometry
    {
        public string Type { get; set; }
        public List<double> Coordinates { get; set; }
    }

    public class RAV_Properties
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
        public string TypCisla_Domovniho { get; set; }
        public object Cislo_Orientacni { get; set; }
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

    public class Lookouts
    {
        public string Type { get; set; }
        public List<RAV_Feature> Features { get; set; }
    }

}
