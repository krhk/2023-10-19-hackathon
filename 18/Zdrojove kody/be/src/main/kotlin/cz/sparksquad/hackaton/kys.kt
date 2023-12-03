package cz.sparksquad.hackaton

import org.springframework.web.bind.annotation.*
import java.io.File
import kotlin.jvm.optionals.getOrNull
import kotlin.math.sqrt

fun parseCSV(data: String): List<CSVRecord> {
    val sep = if (data.contains("\r\n")) "\r\n" else "\n"

    val lines = data
            .split(sep)
            .let { if (it.last().isBlank()) { it.dropLast(1) } else { it } }
            .map {
                it.split(",").map { it.strip() }.map {
                    if (it == "\"\"") return@map ""
                    if (it == "\"") return@map ""
                    if (it.startsWith("\"") && it.endsWith("\"")) {
                        return@map it.substring(1 until it.length-1)
                    }
                    if (it == "") null else it
                }
            }

    val header = lines[0] as List<String>

    return lines.drop(1).map { CSVRecord(header, it) }
}

data class CSVRecord(val header: List<String>, val values: List<String?>) {
    operator fun get(key: String): String? {
        val index = header.indexOfFirst { it == key }

        return values.getOrNull(index)
    }

    fun toMap(): Map<String, String?> = header.zip(values).toMap()

    fun toMap(vararg keys: String): Map<String, String?> {
        val lookup = keys.toSet()

        return header.zip(values).filter { lookup.contains(it.first) }.toMap()
    }
}


/*fun main() {
    println(mosStatistics.take(100))
    println(calculateTownStatistic("500011"))
}*/

data class TableEntry(val name: String, val id: String, val znak: String?, val  vlajka:  String?, val score:  Map<String, Double>?)

val mosStatistics = parseCSV(File("/home/vasabi/IdeaProjects/Hackaton/src/main/mos_data_2021.csv").readText())
val mosLookup = parseCSV(File("/home/vasabi/IdeaProjects/Hackaton/src/main/mos_ukaz.csv").readText())
val mosLocations = parseCSV(File("/home/vasabi/IdeaProjects/Hackaton/src/main/mos_uzemi.csv").readText())
val _mostStatLookup = mosStatistics.map { it["koduzemi"]!! to (it["kodukaz"]!! to it["hodnota"]!!) }.groupBy({it.first}) { it.second }
val mostStatLookup = _mostStatLookup.map { it.key to (it.value.map { it.first to (it.second.toDoubleOrNull() ?: -1.0) }.toMap())  }.toMap()

data class Town(val name: String, val id: String, val znak: String?, val vlajka: String?, val score: Map<String, StatEntry>)

fun lookupPrettyName(code: String): String {
    return mosLookup.find { look -> look["kodukaz"] == code }!!["nazev"]!!
}

fun calculateTownStatistic(townId: String): Map<String, Double> {
    return mostStatLookup[townId]!!
}

fun calculateTownStatistic1(townId: String): Map<String, Double>? {
    // println(mostStatLookup[mostStatLookup.keys.take(1)[0]])
    return mostStatLookup[townId]
}

var eduTypes = listOf("040765", "040755", "040745", "040837", "040731", "040741", "040751", "040761")
fun calculateEducation(entries: Map<String, Double>): Double {
    val nastavb = entries["040765"]?:0.0
    val uciliste = entries["040755"]?:0.0
    val stredni = entries["040745"]?:0.0
    val konzervatore = entries["040837"]?:0.0

    val skolGymp = entries["040731"]?:0.0
    val skolStred = entries["040741"]?:0.0
    val skolUciliste = entries["040751"]?:0.0
    val skolNastav = entries["040761"]?:0.0

    val sumZaci = nastavb+uciliste+stredni+konzervatore
    val sumSkoly = skolGymp+skolStred+skolUciliste+skolNastav

    val obyvatele = entries["420101"] ?: 1.0


    return ((sumZaci/(obyvatele*obyvatele))*sumSkoly)
}

fun String.toDob(): Double {
    if (this == null) return 0.0

    return this.toDoubleOrNull() ?: 0.0
}


val helthTypes = listOf("070320", "070420", "070420", "070520")
fun calculateHelthcare(entries: Map<String, Double>): Double {
    val obyvatele = entries["420101"]?: 1.0

    val luzNem = entries["070320"]?: 0.0
    val luzOdb = entries["070420"]?: 0.0
    val luzDlouho = entries["070520"]?: 0.0

    val sumLuz = luzNem + luzDlouho  +  luzOdb

    if (sumLuz == 0.0) return Double.NaN


    return sumLuz/obyvatele
}

val housingType = listOf("420701", "420601")
fun calculateHousing(entries: Map<String, Double>): Double {
    val obyvatele = entries["420101"]?:1.0

    val byty = entries["420701"] ?: 0.0
    val domy = entries["420601"] ?: 0.0

    return (domy+byty)/obyvatele
}

var minHosing = Double.MAX_VALUE
var maxHosing = Double.MIN_VALUE
var minHelthCare = Double.MAX_VALUE
var maxHelthCare = Double.MIN_VALUE
var minPopulation = Double.MAX_VALUE
var maxPopulation = Double.MIN_VALUE
var minEducation = Double.MAX_VALUE
var maxEducation = Double.MIN_VALUE
var minIncome = Double.MAX_VALUE
var maxIncome = Double.MIN_VALUE
var minNature = Double.MAX_VALUE
var maxNature = Double.MIN_VALUE
var minEmployment = Double.MAX_VALUE
var maxEmployment = Double.MIN_VALUE

fun initialize() {
    mostStatLookup.forEach {
       val ed =  calculateEducation(it.value)
        if (ed.isFinite())  {
            if (ed > maxEducation) maxEducation = ed
            if (ed < minEducation) minEducation = ed
        }

        val hous =  calculateHousing(it.value)
        if (hous.isFinite()) {
            if (hous > maxHosing) maxHosing = hous
            if (hous < minHosing) minHosing = hous
        }

        val inco =  calculateIncome(it.value)
        if (inco.isFinite()) {
            if (inco > maxIncome) maxIncome = inco
            if (inco < minIncome) minIncome = inco
        }

        val pop = calculatePopulation(it.value)
        if (pop.isFinite()) {
            if (pop > maxPopulation) maxPopulation = pop
            if (pop < minPopulation) minPopulation = pop
        }

        val health = calculateHelthcare(it.value)
        if (health.isFinite()) {
            if (health > maxHelthCare) maxHelthCare = health
            if (health < minHelthCare) minHelthCare = health
        }

        val nature = calculateNature(it.value)
        if  (nature.isFinite()) {
            if (nature > maxNature) maxNature = nature
            if (nature < minNature) minNature = nature
        }

        val employment = calculateEmployment(it.value)
        if  (employment.isFinite()) {
            if (employment > maxEmployment) maxEmployment = employment
            if (employment < minEmployment) minEmployment = employment
        }
    }

/*    println("$minEmployment - $maxEmployment")
    println("$minNature - $maxNature")
    println("$minEducation - $maxEducation")
    println("$minHosing - $maxHosing")
    println("$minIncome - $maxIncome")
    println("$minHelthCare - $maxHelthCare")
    println("$minPopulation - $maxPopulation")*/
}


val natureTypes = setOf("140400", "140500", "140600", "140700", "140800", "141000", "141200", "141431")
fun calculateNature(entries: Map<String, Double>): Double {
    val vinice = entries["140400"]?:0.0
    val zahrady = entries["140500"]?:0.0
    val ovocneZahrady = entries["140600"]?:0.0
    val porosty = entries["140700"]?:0.0
    val pastviny = entries["140800"]?:0.0
    val lesy = entries["141000"]?:0.0
    val vodni = entries["141200"]?:0.0
    val zelen = entries["141431"]?:0.0
    val obyvatele = entries["420101"]?:1.0

    val sum = vinice+zahrady+ovocneZahrady+porosty+pastviny+lesy+vodni+zelen

    return sum/sqrt(obyvatele)
}


val employmentTypes = setOf("160410", "160420", "160421", "160422", "160430", "160431", "160432", "160440", "160441", "160442", "160443", "160444")
fun calculateEmployment(entries: Map<String, Double>): Double {
    val obyvatele = entries["420101"]?:1.0

    val zamestnani1_9 = (entries["160410"]?:0.0)*5
    val zamestnani10_49 = (entries["160420"]?:0.0)*29
    val zamestnani10_19 = (entries["160421"]?:0.0)*15
    val zamestnani20_49 = (entries["160422"]?:0.0)*35
    val zamestnani50_249 = (entries["160430"]?:0.0)*150
    val zamestnani50_99 = (entries["160431"]?:0.0)*75
    val zamestnani100_249 = (entries["160432"]?:0.0)*175
    val zamestnani249more = (entries["160440"]?:0.0)*250
    val zamestnani250_499 = (entries["160441"]?:0.0)*325
    val zamestnani500_999 = (entries["160442"]?:0.0)*750
    val zamestnani1000_2499 = (entries["160443"]?:0.0)*1500
    val zamestnani2500more = (entries["160444"]?:0.0)*2500

    val sum = zamestnani1_9+zamestnani10_49+zamestnani10_19+zamestnani20_49+
            zamestnani50_249+zamestnani50_99+zamestnani100_249+zamestnani249more+
            zamestnani250_499+zamestnani500_999+zamestnani1000_2499+zamestnani2500more

    val x = sum/obyvatele

    // println("idk $x")

    return x
}

val incoType = listOf("200002", "200102", "200502")
fun  calculateIncome(entries: Map<String, Double>): Double {
    val obyvatele = entries["420101"]?:1.0

    val allZdaneny = entries["200002"]?:0.0
    val nezdaneny = entries["200102"]?:0.0
    val vydaje = entries["200502"]?:0.0


    val suma = allZdaneny+nezdaneny+vydaje

    return suma/obyvatele
}

fun Double.percentil(min:  Double, max: Double): Double {
    val res = (this - min) / (max - min)
    // println("$min - $max - $this - $res")
    return res
}

val popType = listOf("110400", "110200", "110300", "110500")
fun calculatePopulation(entries: Map<String, Double>): Double {
    val pristehovali = entries["110400"]?:0.0
    val born = entries["110200"] ?:0.0

    val ded = entries["110300"]?:1.0
    val out = entries["110500"]?:1.0


    return (born+pristehovali)/(ded+out)
}


fun calcTable(townId: String, medical: Double, education: Double, population: Double, housing: Double, nature: Double, work: Double, income:  Double): Map<String, Double>? {
    val map = mutableMapOf<String, Double>()

    val mosStatistics = calculateTownStatistic1(townId) ?: return null

    fun put(key: String, value: Double) {
        if (map.contains(key)) {
            map[key] = map[key]!! + value
        }
        else {
            map[key] = value
        }
    }

    map["education"] = calculateEducation(mosStatistics).percentil(minEducation, maxEducation)*education
    map["medical"] = calculateHelthcare(mosStatistics).percentil(minHelthCare, maxHelthCare)*medical
    map["population"] = calculatePopulation(mosStatistics).percentil(minPopulation, maxPopulation)*population
    map["housing"] = calculateHousing(mosStatistics).percentil(minHosing, maxHosing)*housing
    map["nature"] = calculateNature(mosStatistics).percentil(minNature, maxNature)*nature
    map["work"] = calculateEmployment(mosStatistics).percentil(minEmployment, maxEmployment)*work
    map["income"] = calculateIncome(mosStatistics).percentil(minIncome, maxIncome)*income

    map["total"] = map.values.sumOf { if (it.isFinite()) it else 0.0 }/6.0
    map["populationCount"] = mosStatistics["420101"] ?: 1.0

    return map
}


data class StatEntry(var value: Double = 0.0,  val details: MutableMap<String, Double> = mutableMapOf())

fun calculateFinalScore(townId: String): Map<String, StatEntry> {
    val map = mutableMapOf<String, StatEntry>()

    val mosStatistics = calculateTownStatistic1(townId)!!

    fun put(key: String, value: Double, detail: String) {
        if (map.contains(key)) {
            map[key]!!.value += value
            map[key]!!.details[detail] = value
        }
        else {
            map[key] =  StatEntry(value, mutableMapOf(detail to value))
        }
    }

    map["education"] = StatEntry(calculateEducation(mosStatistics).percentil(minEducation, maxEducation), mosStatistics.map { lookupPrettyName(it.key) to it.value }.toMap().toMutableMap())
    map["medical"] = StatEntry(calculateHelthcare(mosStatistics).percentil(minHelthCare, maxHelthCare), mosStatistics.map { lookupPrettyName(it.key) to it.value }.toMap().toMutableMap())
    map["population"] = StatEntry(calculatePopulation(mosStatistics).percentil(minPopulation, maxPopulation), mosStatistics.map { lookupPrettyName(it.key) to it.value }.toMap().toMutableMap())
    map["housing"] = StatEntry(calculateHousing(mosStatistics).percentil(minHosing, maxHosing), mosStatistics.map { lookupPrettyName(it.key) to it.value }.toMap().toMutableMap())
    map["nature"] = StatEntry(calculateNature(mosStatistics).percentil(minNature, maxNature), mosStatistics.map { lookupPrettyName(it.key) to it.value }.toMap().toMutableMap())
    map["work"] = StatEntry(calculateEmployment(mosStatistics).percentil(minEmployment, maxEmployment), mosStatistics.map { lookupPrettyName(it.key) to it.value }.toMap().toMutableMap())
    map["income"] = StatEntry(calculateIncome(mosStatistics).percentil(minIncome, maxIncome), mosStatistics.map { lookupPrettyName(it.key) to it.value }.toMap().toMutableMap())


    map["total"] = StatEntry(map.map { it.value }.sumOf { if (it.value.isFinite()) it.value else 0.0 }/6.0)
    map["populationCount"] = StatEntry(mosStatistics["420101"] ?: 1.0)

    return map
}

data class Score(val toal: Double, val medical: Double, val enviroment: Double)

@RestController
@RequestMapping("/")
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class DataController {
/*    @PostConstruct
    fun aaaaa() {
        repeat(100)  {
            println("KYS")
        }
    }*/


    @GetMapping("kys")
    fun test(): String {
        return "adsadasd";
    }

    @GetMapping("/table")
    fun getTable(
            @RequestParam("medical", defaultValue = "1") medical: String = "1",
            @RequestParam("education", defaultValue = "1") education: String = "1",
            @RequestParam("income", defaultValue = "1") income: String = "1",
            @RequestParam("work", defaultValue = "1") work: String = "1",
            @RequestParam("housing", defaultValue = "1") housing: String = "1",
            @RequestParam("population", defaultValue = "1") population: String = "1",
            @RequestParam("nature", defaultValue = "1") nature: String = "1"
    ): List<TableEntry> {
        val ddd = mosLocations.map { record ->
            val iko = Ikonkokotiny.ikonkyById[record["koduzemi"]!!]

            TableEntry(record["obec"]!!, record["koduzemi"]!!, iko?.znak, iko?.vlajka?.getOrNull(), calcTable(record["koduzemi"]!!, medical.toDoubleOrNull()?:1.0, education.toDoubleOrNull()?:1.0, population.toDoubleOrNull()?:1.0, housing.toDoubleOrNull()?:1.0, nature.toDoubleOrNull()?:1.0, work.toDoubleOrNull()?:1.0, income.toDoubleOrNull()?:1.0))
        }.sortedByDescending { it.score?.get("total") ?: 0.0 }

        return ddd
    }

    @GetMapping("/town/{id}")
    fun getTown(@PathVariable("id") id: String): Town? {
        val loc = mosLocations.find { it["koduzemi"] == id } ?: return null

        val statistics = calculateFinalScore(id)

        // println(statistics)

        val iko = Ikonkokotiny.ikonkyById[loc["koduzemi"]!!]

        return Town(loc["obec"]!!, loc["koduzemi"]!!, iko?.znak, iko?.vlajka?.getOrNull(), statistics)
    }

    @GetMapping("/locations")
    fun allLocation(): List<Map<String,  String?>> {
        return mosLocations.map { it.toMap("koduzemi", "obec") }
    }

    @GetMapping("lookup")
    fun query(@RequestParam("q") q: String): List<Pair<String, String>> {
        return Kokote.findIdsByName(q)
    }
}
