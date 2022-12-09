const fs = require('fs')

/*
  { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }
  { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }
  { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }
  { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }
  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }
*/

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  const moveHead = (dir) => {
    // Save last position of head
    lastHeadPos.x = headPos.x
    lastHeadPos.y = headPos.y

    // Move head
    if(dir === 'U') headPos.y++
    if(dir === 'D') headPos.y--
    if(dir === 'L') headPos.x--
    if(dir === 'R') headPos.x++
  }

  const moveTail = () => {
    const xDist = Math.abs(headPos.x - tailPos.x)
    const yDist = Math.abs(headPos.y - tailPos.y)
    if(yDist <= 1 && xDist <= 1) return

    tailPos.x = lastHeadPos.x
    tailPos.y = lastHeadPos.y
    visitedPositions[`${tailPos.x}-${tailPos.y}`] = 1
  }

  const visitedPositions = {'0-0': 1} // Add start pos
  const headPos = { x: 0, y: 0 }
  const lastHeadPos = { x: 0, y: 0 }
  const tailPos = { x: 0, y: 0 }
  inputArrayEachLine.forEach(line => {
    const [dir, amount] = line.split(" ")

    // Move in direction X times
    for(let i = 0; i < amount; i++) {
      // Move head and tail
      moveHead(dir)
      moveTail()
    }
  })

  const visitedPositionsCount =  Object.keys(visitedPositions).length
  console.log(
    `[Part1] - Number of positions the tail of the rope visits at least once: ${visitedPositionsCount}`
  )
}

const part2 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  const moveHead = (dir) => {
    // Move head
    if(dir === 'U') positions[0].y++
    if(dir === 'D') positions[0].y--
    if(dir === 'L') positions[0].x--
    if(dir === 'R') positions[0].x++
  }

  const moveTail = (indexOfTail) => {
    const tail = positions[indexOfTail]
    const tailInFront = positions[indexOfTail - 1]
    const xDist = Math.abs(tailInFront.x - tail.x)
    const yDist = Math.abs(tailInFront.y - tail.y)
    if(yDist <= 1 && xDist <= 1) return

    const toAdd = {x: 0, y: 0}
    if(yDist >= 2) {
      if (tailInFront.y > tail.y) toAdd.y = 1
      else toAdd.y = -1
      
      if(xDist >= 1) {
        if (tailInFront.x > tail.x) toAdd.x = 1
        else toAdd.x = -1
      }
    }
    if(xDist >= 2) {
      if (tailInFront.x > tail.x) toAdd.x = 1
      else toAdd.x = -1

      if(yDist >= 1) {
        if (tailInFront.y > tail.y) toAdd.y = 1
        else toAdd.y = -1
      }
    }
    positions[indexOfTail].x += toAdd.x
    positions[indexOfTail].y += toAdd.y

    if(indexOfTail === 9) visitedPositions[`${positions[indexOfTail].x}-${positions[indexOfTail].y}`] = 1
  }

  // Create object with start positions for head & tails (0 = head)
  initializePositionsObject = () => {
    const obj = {}
    for(let i = 0; i < 10; i++) obj[i] = {x: 0, y: 0}
    return obj
  }

  const visitedPositions = {'0-0': 1} // Add start pos
  const positions = initializePositionsObject()

  inputArrayEachLine.forEach(line => {
    const [dir, amount] = line.split(" ")

    // Move in direction X times
    for(let i = 0; i < amount; i++) {
      // Move head
      moveHead(dir)

      // Move all tails
      for(let j = 1; j < 10; j++) moveTail(j)
    }
  })

  const visitedPositionsCount =  Object.keys(visitedPositions).length
  console.log(
    `[Part2] - Number of positions the 9th tail of the rope visits at least once: ${visitedPositionsCount}`
  )
}

part1()
part2()

