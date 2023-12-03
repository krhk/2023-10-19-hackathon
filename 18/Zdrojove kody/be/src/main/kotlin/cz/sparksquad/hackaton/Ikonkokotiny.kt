package cz.sparksquad.hackaton

import lombok.SneakyThrows
import java.io.BufferedReader
import java.io.File
import java.io.FileReader
import java.util.*
import kotlin.collections.ArrayList
import kotlin.collections.HashMap

object Ikonkokotiny {

    val ikonkyByName = mutableMapOf<String, Mněsto>()
    val ikonkyById = mutableMapOf<String, Mněsto>()

    @SneakyThrows
    fun parseAllIkons() {
        val file = File("/home/vasabi/IdeaProjects/Hackaton/src/main/databaze.txt")
        val readLines = file.readLines()
        readLines.forEach {
            var strip = it.strip()
            var replace = strip.replace(";;", "")
            var split = replace.split("::")

            var mesto = split[0]
            var znak = split[1]
            var vlajka = Optional.empty<String>()
            if (split.size == 3) {
                vlajka = Optional.ofNullable(split[2])
            }

            var mněsto = Mněsto(mesto, znak, vlajka)
            ikonkyByName[mesto] = mněsto
        }
    }

    fun getIkonkyByName(name: String): Mněsto? {
        return ikonkyByName[name]
    }

    fun loadIkonky() {
        mosLocations.forEach {
            var id = it.values.component1()
            var nazev = it.values.component2()
            var mněsto = ikonkyByName[nazev]
            if(mněsto != null && id != null) {
                ikonkyById[id] = mněsto
            }
        }
    }

}
