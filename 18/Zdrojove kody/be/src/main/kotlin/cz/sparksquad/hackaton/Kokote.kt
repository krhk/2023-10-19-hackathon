package cz.sparksquad.hackaton

import net.gcardone.junidecode.Junidecode.unidecode
import java.util.*

class Kokote {
    fun getVlajkaById(id: Long?) {}

    companion object {
        fun findIdsByName(name: String): List<Pair<String, String>> {
            return mosLocations.map {
                calculate(unidecode(name.lowercase()), unidecode(it["obec"]!!.lowercase())) to (it["obec"]!! to it["koduzemi"]!!)
            }.sortedBy { it.first }.take(10).map { it.second }
        }

        fun calculate(name: String, dva: String?): Int {
            val dp = Array(name.length + 1) { IntArray(dva!!.length + 1) }

            for (i in 0..name.length) {
                for (j in 0..dva!!.length) {
                    if (i == 0) {
                        dp[i][j] = j
                    } else if (j == 0) {
                        dp[i][j] = i
                    } else {
                        dp[i][j] = min(dp[i - 1][j - 1]
                                + costOfSubstitution(name[i - 1], dva[j - 1]),
                                dp[i - 1][j] + 1,
                                dp[i][j - 1] + 1)
                    }
                }
            }

            return dp[name.length][dva!!.length]
        }

        fun costOfSubstitution(a: Char, b: Char): Int {
            return if (a == b) 0 else 1
        }

        fun min(vararg numbers: Int): Int {
            return Arrays.stream(numbers)
                    .min().orElse(Int.MAX_VALUE)
        }

        private fun compare(a: FesniceDalka, b: FesniceDalka): Int {
            return Integer.compare(a.distance, b.distance)
        }
    }
}
