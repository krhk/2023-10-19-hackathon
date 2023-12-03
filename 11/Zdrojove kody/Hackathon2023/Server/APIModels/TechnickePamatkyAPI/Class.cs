namespace Server.APIModels.TechnickePamatkyAPI
{

    public class TechnickePamatkyAPI
    {
        public string type { get; set; }
        public Feature[] features { get; set; }
    }

    public class Feature
    {
        public string type { get; set; }
        public int id { get; set; }
        public Geometry geometry { get; set; }
        public Properties properties { get; set; }
    }

    public class Geometry
    {
        public string type { get; set; }
        public float[] coordinates { get; set; }
    }

    public class Properties
    {
        public string nazev { get; set; }
        public string popis { get; set; }
        public string nazev_vusc { get; set; }
        public string kod_vusc { get; set; }
        public string nazev_okresu { get; set; }
        public string kod_okresu { get; set; }
        public string nazev_orp { get; set; }
        public string kod_orp { get; set; }
        public string nazev_obce { get; set; }
        public string kod_obce { get; set; }
        public string nazev_ulice { get; set; }
        public string cislo_domovni { get; set; }
        public string typ_cisla_domovniho { get; set; }
        public string cislo_orientacni { get; set; }
        public string psc { get; set; }
        public string www { get; set; }
        public string telefon { get; set; }
        public string wkt { get; set; }
        public float x { get; set; }
        public float y { get; set; }
        public string dp_id { get; set; }
        public string ds_id { get; set; }
        public int OBJECTID { get; set; }
    }

}
