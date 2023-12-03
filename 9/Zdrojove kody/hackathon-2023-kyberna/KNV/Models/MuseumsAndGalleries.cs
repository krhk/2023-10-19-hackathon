namespace KNV.Models
{
    
        public class MG_Feature
        {
            public string Type { get; set; }
            public int Id { get; set; }
            public MG_Geometry Geometry { get; set; }
            public Properties Properties { get; set; }
        }

        public class MG_Geometry
        {
            public string Type { get; set; }
            public List<double> Coordinates { get; set; }
        }

        public class Properties
        {
            public string Nazev { get; set; }
            public string Ico { get; set; }
            public string Zrizovatel { get; set; }
            public string Typ__Muzea { get; set; }
            public string Zamereni_Muzea { get; set; }
            public string Bezbarierovost { get; set; }
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
            public string Wkt { get; set; }
            public double X { get; set; }
            public double Y { get; set; }
            public string Dp_Id { get; set; }
            public string Is_Id { get; set; }
            public int OBJECTID { get; set; }
        }

        public class MuseumsAndGalleries
        {
            public string Type { get; set; }
            public List<MG_Feature> Features { get; set; }
        }


    
}
