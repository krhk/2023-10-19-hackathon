package cz.sparksquad.hackaton

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/hodnoceni/{id}")
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class SebevrazdaOnlyOption {

    val hodnoceniMap = mutableMapOf<String, MutableList<Hodnoceni>>()

    @PostMapping
    fun postHodnoceni(@PathVariable id: String, @RequestBody hodnoceni: Hodnoceni?) {
        var všechny = hodnoceniMap[id]
        if (všechny == null) {
            všechny = mutableListOf()
        }
        if (hodnoceni != null) {
            všechny.add(hodnoceni)
        }
        hodnoceniMap[id] = všechny
    }

    @GetMapping
    fun getHodnoceni(@PathVariable id: String): List<Hodnoceni>? {
        var list = hodnoceniMap[id]?.sortedWith(compareBy { it.votes })
        return list
    }

}
