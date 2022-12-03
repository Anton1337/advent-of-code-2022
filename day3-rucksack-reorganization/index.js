const fs = require('fs')

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  // Used to separate compartments in rucksack
  const splitStringInHalf = (str) => {
    const half = Math.ceil(str.length / 2)
    return [str.slice(0, half), str.slice(-half)]
  }

  // Finds duplicate item in rucksack compartments with 1 single pass through both compartments
  const findDuplicateCharacterInTwoStrings = (first, second) => {
    const foundMap = first.split("").reduce((initialFoundMap, char) => {
      initialFoundMap[char] = 1
      return initialFoundMap
    }, {})

    for(char of second) {
      if(foundMap[char]) return char
    }
  }

  // Gets priority of item, derived from ascii value of char
  const getPriorityOfItem = (item) => {
    if(item === item.toUpperCase()) return item.charCodeAt(0) - 38
    return item.charCodeAt(0) - 96
  }

  const totalSumOfPriorities = inputArrayEachLine.reduce(
    (currentSum, rucksack, i) => {
      const [compartmentOne, compartmentTwo] = splitStringInHalf(rucksack)
      const duplicateItem = findDuplicateCharacterInTwoStrings(compartmentOne, compartmentTwo)
      const priorityOfItem = getPriorityOfItem(duplicateItem)
      return currentSum + priorityOfItem
    },
    0
  )

  console.log(`[Part1] - Total sum of priorities is: ${totalSumOfPriorities}`)
}

const part2 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  // Finds duplicate item in 3 elfs rucksacks with 1 single pass through each elfs rucksack
  const findDuplicateCharacterInThreeStrings = (first, second, third) => {
    const foundMap = first.split("").reduce((initialFoundMap, char) => {
      initialFoundMap[char] = 1
      return initialFoundMap
    }, {})

    const foundMapSecond = second.split("").reduce((initialFoundMap, char) => {
      initialFoundMap[char] = 1
      return initialFoundMap
    }, {})

    for(char of third) {
      if(foundMap[char] && foundMapSecond[char]) return char
    }
  }

  // Gets priority of item, derived from ascii value of char
  const getPriorityOfItem = (item) => {
    if(item === item.toUpperCase()) return item.charCodeAt(0) - 38
    return item.charCodeAt(0) - 96
  }

  let sumOfPriorities = 0
  for(let i = 2; i < inputArrayEachLine.length; i+= 3) {
    const elfOne = inputArrayEachLine[i]
    const elfTwo = inputArrayEachLine[i - 1]
    const elfThree = inputArrayEachLine[i - 2]

    const badge = findDuplicateCharacterInThreeStrings(elfOne, elfTwo, elfThree)
    const priorityOfItem = getPriorityOfItem(badge)
    sumOfPriorities += priorityOfItem
  }
  
  console.log(`[Part2] - Sum of priority of all elf groups badges is: ${sumOfPriorities}`)
}

part1()
part2()

