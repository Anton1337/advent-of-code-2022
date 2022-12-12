const fs = require('fs')

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  const getMonkeys = () => {
    const monkeys = []
    for(let i = 0; i < inputArrayEachLine.length; i += 7) {
      const monkey = {}
      monkey.items = inputArrayEachLine[i + 1].match(/\d+/g).map(item => parseInt(item))

      // Get operation
      monkey.op = inputArrayEachLine[i + 2].match(/[+*]/g)[0]
      monkey.opSecondParam = inputArrayEachLine[i + 2].endsWith('d') ? 'd' : parseInt(inputArrayEachLine[i + 2].split(" ").at(-1))
      monkey.doOperation = function(item) { 
        const secondParam = this.opSecondParam === 'd' ? item : this.opSecondParam
        return this.op === '+' ? item + secondParam : item * secondParam
      }

      monkey.divideBy = parseInt(inputArrayEachLine[i + 3].split(" ").at(-1))
      monkey.monkeyToThrowToIfTrue = parseInt(inputArrayEachLine[i + 4].at(-1))
      monkey.monkeyToThrowToIfFalse = parseInt(inputArrayEachLine[i + 5].at(-1))

      monkey.getMonkeyToThrowTo = function(item) {
        return item % this.divideBy === 0 ? this.monkeyToThrowToIfTrue : this.monkeyToThrowToIfFalse
      }

      // Counter for every inspected item
      monkey.itemsInspectedCount = 0

      monkeys.push(monkey)
    }

    return monkeys
  }

  const monkeys = getMonkeys()

  // Simulate 20 rounds (each monkey has 1 turn, each round)
  // For every turn, a monkey inspects, and throws all its items
  for(let rounds = 1; rounds <= 20; rounds++) {

    // 1 turn for each monkey
    monkeys.forEach((monkey) => {

      // 1 throw for each item a monkey carries
      const itemsAmount = monkey.items.length
      for(let i = 0; i < itemsAmount; i++) {
        const itemToThrow = monkey.items.shift()
        const itemAfterOperation = monkey.doOperation(itemToThrow)
        const itemAfterDivideByThree = Math.floor(itemAfterOperation / 3)
        const monkeyToThrowTo = monkey.getMonkeyToThrowTo(itemAfterDivideByThree)
        monkey.itemsInspectedCount += 1
  
        monkeys[monkeyToThrowTo].items.push(itemAfterDivideByThree)
      }
    })
  }

  // Find amount of items inspected from two most active monkeys, and then calculate "level of monkey business" 
  const [mostActive, secondMostActive] = monkeys.map(monkey => monkey.itemsInspectedCount).sort((a, b) => b - a)
  const levelOfMonkeyBusiness = mostActive * secondMostActive

  console.log(
    `[Part1] - Level of monkey business after 20 rounds: ${levelOfMonkeyBusiness}`
  )
}

const part2 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  let leastCommonMultiple = 1

  const getMonkeys = () => {
    const monkeys = []
    for(let i = 0; i < inputArrayEachLine.length; i += 7) {
      const monkey = {}
      monkey.items = inputArrayEachLine[i + 1].match(/\d+/g).map(item => parseInt(item))

      // Get operation
      monkey.op = inputArrayEachLine[i + 2].match(/[+*]/g)[0]
      monkey.opSecondParam = inputArrayEachLine[i + 2].endsWith('d') ? 'd' : parseInt(inputArrayEachLine[i + 2].split(" ").at(-1))
      monkey.doOperation = function(item) { 
        const secondParam = this.opSecondParam === 'd' ? item : this.opSecondParam
        return this.op === '+' ? item + secondParam : item * secondParam
      }

      monkey.divideBy = parseInt(inputArrayEachLine[i + 3].split(" ").at(-1))
      monkey.monkeyToThrowToIfTrue = parseInt(inputArrayEachLine[i + 4].at(-1))
      monkey.monkeyToThrowToIfFalse = parseInt(inputArrayEachLine[i + 5].at(-1))

      monkey.getMonkeyToThrowTo = function(item) {
        return item % this.divideBy === 0 ? this.monkeyToThrowToIfTrue : this.monkeyToThrowToIfFalse
      }

      leastCommonMultiple *= monkey.divideBy

      // Counter for every inspected item
      monkey.itemsInspectedCount = 0

      monkeys.push(monkey)
    }

    return monkeys
  }

  const monkeys = getMonkeys()

  // Simulate 10 000 rounds (each monkey has 1 turn, each round)
  // For every turn, a monkey inspects, and throws all its items
  for(let rounds = 1; rounds <= 10_000; rounds++) {

    // 1 turn for each monkey
    monkeys.forEach((monkey) => {

      // 1 throw for each item a monkey carries
      const itemsAmount = monkey.items.length
      for(let i = 0; i < itemsAmount; i++) {
        const itemToThrow = monkey.items.shift()
        const itemAfterOperation = monkey.doOperation(itemToThrow)
        const itemAfterDivideByThree = itemAfterOperation % leastCommonMultiple
        const monkeyToThrowTo = monkey.getMonkeyToThrowTo(itemAfterDivideByThree)
        monkey.itemsInspectedCount += 1
  
        monkeys[monkeyToThrowTo].items.push(itemAfterDivideByThree)
      }
    })
  }

  // Find amount of items inspected from two most active monkeys, and then calculate "level of monkey business" 
  const [mostActive, secondMostActive] = monkeys.map(monkey => monkey.itemsInspectedCount).sort((a, b) => b - a)
  const levelOfMonkeyBusiness = mostActive * secondMostActive

  console.log('monkeys:', monkeys)

  console.log(
    `[Part2] - Level of monkey business after 10 000 rounds: ${levelOfMonkeyBusiness}`
  )
}

// part1()
part2()

