package cz.sparksquad.hackaton

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/")
class Idk {
    @GetMapping
    fun test(): String {
        return "dasdasdasdasd"
    }
}