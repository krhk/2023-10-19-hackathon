package cz.sparksquad.hackaton

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HackatonApplication

fun main(args: Array<String>) {
    runApplication<HackatonApplication>(*args)
    initialize()
    println("haus numera byly zkalkulovane")
    Ikonkokotiny.parseAllIkons() // TYHLE RADKY SE NESMI PROHODIT
    Ikonkokotiny.loadIkonky() // TYHLE RADKY SE NESMI PROHODIT
}
