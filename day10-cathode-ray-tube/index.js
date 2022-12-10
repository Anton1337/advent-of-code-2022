const fs = require('fs')

/*
  Sprite 3 pixels wide
  X = horizontal position of the *MIDDLE* of the sprite

  40 wide and 6 high (each row: 0 -> 39)
  draws a SINGLE PIXEL during each cycle
*/

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  let pendingAdd = undefined // example: { numToAdd: 4, cyclesLeft: 2}
  let x = 1 // X value
  let sumOfSignalStrengths = 0
  for(let cycle = 1; cycle <= 99999999999; cycle++ ) {

    // If we dont have anything pending, grab new instruction.
    if(!pendingAdd) {
      const line = inputArrayEachLine.shift()
      if(!line) break

      [instruction, val] = line.split(" ")
      if(instruction === 'addx') pendingAdd = { numToAdd: parseInt(val), cyclesLeft: 2 }
    }

    // Calculate signal strength
    if(cycle % 40 === 20) {
      const currentSignalStrength = cycle * x
      // Increment sum
      sumOfSignalStrengths += currentSignalStrength
    }

    // If we have pending add, decrement cycles needed to complete
    if(pendingAdd) {
      pendingAdd.cyclesLeft -= 1
      if(pendingAdd.cyclesLeft === 0) {
        x += pendingAdd.numToAdd
        pendingAdd = undefined
      }
    }
  }

  console.log(
    `[Part1] - Sum of all relevant signal strengths are: ${sumOfSignalStrengths}`
  )
}

const part2 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  let pendingAdd = undefined // example: { numToAdd: 4, cyclesLeft: 2}
  let x = 1 // X value
  const buffer = [[], [], [], [], [], []]
  for(let cycle = 1; cycle <= 240; cycle++ ) {

    // If we dont have anything pending, grab new instruction.
    if(!pendingAdd) {
      const line = inputArrayEachLine.shift()
      if(!line) break

      [instruction, val] = line.split(" ")
      if(instruction === 'addx') pendingAdd = { numToAdd: parseInt(val), cyclesLeft: 2 }
    }

    // Calc character to draw
    const drawXPos = (cycle % 40) - 1 
    let char = '.'
    let pixelsOnScreen = [x - 1, x, x + 1]
    if(pixelsOnScreen.includes(drawXPos)) char = "#"

    // Get buffer to draw to
    const bufferIdx = Math.floor((cycle - 1) / 40)
    buffer[bufferIdx].push(char)

    // If we have pending add, decrement cycles needed to complete
    if(pendingAdd) {
      pendingAdd.cyclesLeft -= 1
      if(pendingAdd.cyclesLeft === 0) {
        x += pendingAdd.numToAdd
        pendingAdd = undefined
      }
    }
  }

  console.log(
    '[Part2] - Print the characters: "EFUGLPAP"'
  )

  // Draw characters
  buffer.forEach(b => console.log(b.join()))
}

part1()
part2()

