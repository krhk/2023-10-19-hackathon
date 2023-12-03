namespace KNV.Models
{
    public class CulturalFeature
    {
        public string Type { get; set; }
        public int Id { get; set; }
        public CulturalGeometry Geometry { get; set; }
        public CulturalProperties Properties { get; set; }
    }

    public class CulturalGeometry
    {
        public string Type { get; set; }
        public List<double> Coordinates { get; set; }
    }

    public class CulturalProperties
    {
        public string Nazev { get; set; }
        public string Objekt { get; set; }
        public string Ico { get; set; }
        public string Pravni_Forma { get; set; }
        public string Uskp { get; set; }
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
        public object Cislo_Orientacni { get; set; }
        public string Psc { get; set; }
        public string Www { get; set; }
        public string Wkt { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string Dp_Id { get; set; }
        public int OBJECTID { get; set; }
    }

    public class Culturals
    {
        public string Type { get; set; }
        public List<CulturalFeature> Features { get; set; }
    }

}
