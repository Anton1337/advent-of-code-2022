const fs = require('fs')

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  // Rule engine
  const receivePointsMap = {
    'A X': 4, // Rock vs Rock (3 + 1)
    'A Y': 8, // Rock vs Paper (6 + 2)
    'A Z': 3, // Rock vs Scissor (0 + 3)
    'B X': 1, // Paper vs Rock (0 + 1)
    'B Y': 5, // Paper vs Paper (3 + 2)
    'B Z': 9, // Paper vs Scissor (6 + 3)
    'C X': 7, // Scissor vs Rock (6 + 1)
    'C Y': 2, // Scissor vs Paper (0 + 2)
    'C Z': 6, // Scissor vs Scissor (3 + 3)
  }
  
  // Calculate total score
  const totalScore = inputArrayEachLine.reduce(
    (currentScore, game) => currentScore + receivePointsMap[game],
    0
  )

  console.log(`[Part1] - Total score with elf's assumed strategy is: ${totalScore}`)
}

const part2 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  // Rule engine
  const receivePointsMap = {
    'A X': 4, // Rock vs Rock (3 + 1)
    'A Y': 8, // Rock vs Paper (6 + 2)
    'A Z': 3, // Rock vs Scissor (0 + 3)
    'B X': 1, // Paper vs Rock (0 + 1)
    'B Y': 5, // Paper vs Paper (3 + 2)
    'B Z': 9, // Paper vs Scissor (6 + 3)
    'C X': 7, // Scissor vs Rock (6 + 1)
    'C Y': 2, // Scissor vs Paper (0 + 2)
    'C Z': 6, // Scissor vs Scissor (3 + 3)
  }

  const correctPlayMap = {
    'A X': 'A Z', // Lose against rock = Scissor
    'A Y': 'A X', // Tie against rock = Rock
    'A Z': 'A Y', // Win against rock = Paper
    'B X': 'B X', // Lose against paper = Rock
    'B Y': 'B Y', // Tie against paper = Paper
    'B Z': 'B Z', // Win against paper = Scissor
    'C X': 'C Y', // Lose against scissor = Paper
    'C Y': 'C Z', // Tie against scissor = Scissor
    'C Z': 'C X', // Win against Scissor = Rock
  }
  
  // Calculate total score
  const totalScore = inputArrayEachLine.reduce(
    (currentScore, game) => currentScore + receivePointsMap[correctPlayMap[game]],
    0
  )

  console.log(`[Part2] - Total score with elf's actual strategy is: ${totalScore}`)
}

part1()
part2()

