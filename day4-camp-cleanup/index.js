const fs = require('fs')

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  // Checks if range is fully contained within other range.
  const rangeContained = (lowerFirst, upperFirst, lowerSecond, upperSecond) => {
    return parseInt(lowerFirst) <= parseInt(lowerSecond) && parseInt(upperFirst) >= parseInt(upperSecond)
  }

  const numberOfRangesThatFullyContainsTheOther = inputArrayEachLine.reduce(
    (currentNumOfRanges, range) => {
      const [rangeOneLower, rangeOneUpper, rangeTwoLower, rangeTwoUpper] = range.split(/[-,]+/)
      const isRangeContained = 
        rangeContained(rangeOneLower, rangeOneUpper, rangeTwoLower, rangeTwoUpper) ||
        rangeContained(rangeTwoLower, rangeTwoUpper, rangeOneLower, rangeOneUpper)

      if(isRangeContained) return currentNumOfRanges + 1
      return currentNumOfRanges
    },
    0
  )

  console.log(`[Part1] - Number of ranges that fully contains the other: ${numberOfRangesThatFullyContainsTheOther}`)
}

const part2 = () => {
    // Fetch input
    const input = fs.readFileSync("input.txt").toString()
    const inputArrayEachLine = input.split(/\r?\n/)
  
    // Checks if range is at all container withing other range.
    const rangeContained = (lowerFirst, upperFirst, lowerSecond, upperSecond) => {
      return parseInt(lowerSecond) <= parseInt(upperFirst) && parseInt(lowerSecond) >= parseInt(lowerFirst)
    }
  
    const numberOfRangesThatContainsTheOtherAtAll = inputArrayEachLine.reduce(
      (currentNumOfRanges, range) => {
        const [rangeOneLower, rangeOneUpper, rangeTwoLower, rangeTwoUpper] = range.split(/[-,]+/)
        const isRangeContained = 
          rangeContained(rangeOneLower, rangeOneUpper, rangeTwoLower, rangeTwoUpper) ||
          rangeContained(rangeTwoLower, rangeTwoUpper, rangeOneLower, rangeOneUpper)
  
        if(isRangeContained) return currentNumOfRanges + 1
        return currentNumOfRanges
      },
      0
    )
  
    console.log(`[Part2] - Number of ranges that contains the other at all: ${numberOfRangesThatContainsTheOtherAtAll}`)
}

part1()
part2()

