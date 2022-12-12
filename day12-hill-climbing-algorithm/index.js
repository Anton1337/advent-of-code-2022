const fs = require('fs')

const part1 = () => {
  // Init heightmap
  const heightMap = fs.readFileSync("input.txt").toString().split(/\r?\n/).map(row => row.split(""))
  const HEIGHT = heightMap.length
  const WIDTH = heightMap[0].length

  const getHeight = (pos) => {
    let height = heightMap[pos.y][pos.x]
    if(height === 'E') height = 'z'
    if(height === 'S') height = 'a'
    return height.charCodeAt(0)
  }

  const heightIsAtMostOneHigher = (posFrom, posTo) => {
    return getHeight(posTo) - getHeight(posFrom) <= 1
  }

  const getAvailableMoves = (pos, visited) => {
    const moves = []
    const posX1 = {x: pos.x-1, y: pos.y}
    if(posX1.x >= 0 && heightIsAtMostOneHigher(pos, posX1)) moves.push(posX1)

    const posX2 = {x: pos.x+1, y: pos.y}
    if(posX2.x < WIDTH && heightIsAtMostOneHigher(pos, posX2)) moves.push(posX2)

    const posY1 = {x: pos.x, y: pos.y-1}
    if(posY1.y >= 0 && heightIsAtMostOneHigher(pos, posY1)) moves.push(posY1)

    const posY2 = {x: pos.x, y: pos.y+1}
    if(posY2.y < HEIGHT && heightIsAtMostOneHigher(pos, posY2)) moves.push(posY2)

    return moves
  }

  const pos = {x:0, y:20}
  const initialMove = {
    pos,
    stepsTaken: 0,
    visited: new Set()
  }

  let movesToMakeQueue = [initialMove]

  let fewestStepsToGoal = Infinity
  const visitedGlobal = new Set()
  while(movesToMakeQueue.length) {

    const { pos: posVisiting, stepsTaken, visited } = movesToMakeQueue.shift()
    visitedGlobal.add(`${posVisiting.x}-${posVisiting.y}`)

    const heightForThisSpace = heightMap[posVisiting.y][posVisiting.x]

    // If we reach E, we are at goal
    if(heightForThisSpace === 'E') {
      if(stepsTaken < fewestStepsToGoal) fewestStepsToGoal = stepsTaken
      continue
    }
  
    // Breadth first search
    // Add move to queue, and include link to previous pos
    const moves = getAvailableMoves(posVisiting, visited).map(move => ({
      pos: move,
      stepsTaken: stepsTaken + 1,
      visited: new Set([...visited, `${posVisiting.x}-${posVisiting.y}`])
    }))

    const notVisitedMoves = moves.filter((move) => {
      return !visitedGlobal.has(`${move.pos.x}-${move.pos.y}`) && !movesToMakeQueue.find(qmove => qmove.pos.x === move.pos.x && qmove.pos.y === move.pos.y)
    })

    movesToMakeQueue = [...movesToMakeQueue, ...notVisitedMoves]
  }

  console.log(
    `[Part1] - Shortest path to location with best signal takes this many steps: ${fewestStepsToGoal}`
  ) 
}

const part2 = () => {
   // Init heightmap
   const heightMap = fs.readFileSync("input.txt").toString().split(/\r?\n/).map(row => row.split(""))
   const HEIGHT = heightMap.length
   const WIDTH = heightMap[0].length
 
   const getHeight = (pos) => {
     let height = heightMap[pos.y][pos.x]
     if(height === 'E') height = 'z'
     if(height === 'S') height = 'a'
     return height.charCodeAt(0)
   }
 
   const heightIsAtMostOneLower = (posFrom, posTo) => {
     return getHeight(posTo) - getHeight(posFrom) >= -1
   }
 
   const getAvailableMoves = (pos, visited) => {
     const moves = []
     const posX1 = {x: pos.x-1, y: pos.y}
     if(posX1.x >= 0 && heightIsAtMostOneLower(pos, posX1)) moves.push(posX1)
 
     const posX2 = {x: pos.x+1, y: pos.y}
     if(posX2.x < WIDTH && heightIsAtMostOneLower(pos, posX2)) moves.push(posX2)
 
     const posY1 = {x: pos.x, y: pos.y-1}
     if(posY1.y >= 0 && heightIsAtMostOneLower(pos, posY1)) moves.push(posY1)
 
     const posY2 = {x: pos.x, y: pos.y+1}
     if(posY2.y < HEIGHT && heightIsAtMostOneLower(pos, posY2)) moves.push(posY2)
 
     return moves
   }
 
   const pos = {x:77, y:20}
   const initialMove = {
     pos,
     stepsTaken: 0,
     visited: new Set()
   }
 
   let movesToMakeQueue = [initialMove]
 
   let fewestStepsToGoal = Infinity
   const visitedGlobal = new Set()
   while(movesToMakeQueue.length) {
 
     const { pos: posVisiting, stepsTaken, visited } = movesToMakeQueue.shift()
     visitedGlobal.add(`${posVisiting.x}-${posVisiting.y}`)
 
     const heightForThisSpace = heightMap[posVisiting.y][posVisiting.x]
 
     // If we reach E, we are at goal
     if(heightForThisSpace === 'a') {
       if(stepsTaken < fewestStepsToGoal) fewestStepsToGoal = stepsTaken
       continue
     }
   
     // Breadth first search
     // Add move to queue, and include link to previous pos
     const moves = getAvailableMoves(posVisiting, visited).map(move => ({
       pos: move,
       stepsTaken: stepsTaken + 1,
       visited: new Set([...visited, `${posVisiting.x}-${posVisiting.y}`])
     }))

     const notVisitedMoves = moves.filter((move) => {
       return !visitedGlobal.has(`${move.pos.x}-${move.pos.y}`) && !movesToMakeQueue.find(qmove => qmove.pos.x === move.pos.x && qmove.pos.y === move.pos.y)
     })

     movesToMakeQueue = [...movesToMakeQueue, ...notVisitedMoves]
   }
 
   console.log(
     `[Part2] - Shortest path to location with best signal takes this many steps: ${fewestStepsToGoal}`
   ) 
}

part1()
part2()


