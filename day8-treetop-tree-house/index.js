const fs = require('fs')

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const treeField = input.split(/\r?\n/).map(l => l.split(""))

  const isTreeVisible = (height, row, col) => {
    const treeFieldYMax = treeField.length
    const treeFieldXMax = treeField[row].length

    // Check north
    let seeNorth = true
    for(let r = row - 1; r >= 0; r--) {
      const v = treeField[r][col]
      if(v >= height) seeNorth = false
    }

    // Check south
    let seeSouth = true
    for(let r = row + 1; r < treeFieldYMax; r++) {
      const v = treeField[r][col]
      if(v >= height) seeSouth = false
    }

    // Check west
    let seeWest = true
    for(let c = col - 1; c >= 0; c--) {
      const v = treeField[row][c]
      if(v >= height) seeWest = false
    }

    // Check east
    let seeEast = true
    for(let c = col + 1; c < treeFieldXMax; c++) {
      const v = treeField[row][c]
      if(v >= height) seeEast = false
    }

    return seeNorth || seeSouth || seeWest || seeEast
  }

  // Loop through each position in the tree field, and check if it is at all visible.
  let treeVisibleCount = 0
  for(let row = 0; row < treeField.length; row++) {
    const treeRow = treeField[row]

    for(let col = 0; col < treeRow.length; col++) {
      const tree = treeRow[col]
      
      const isVisible = isTreeVisible(tree, row, col)
      if(isVisible) treeVisibleCount++
    }
  }

  console.log(
    `[Part1] - Number of trees that are visible from at least 1 direction: ${treeVisibleCount}`
  )
}

const part2 = () => {
   // Fetch input
 const input = fs.readFileSync("input.txt").toString()
 const treeField = input.split(/\r?\n/).map(l => l.split(""))

 const getScenicScoreForTree = (height, row, col) => {
   const treeFieldYMax = treeField.length
   const treeFieldXMax = treeField[row].length

    // Check north
    let valNorth = 0
    for(let r = row - 1; r >= 0; r--) {
      const v = treeField[r][col]
      if(v < height) {
        valNorth++
      } else {
        valNorth++
        break
      }
   }

    // Check south
    let valSouth = 0
    for(let r = row + 1; r < treeFieldYMax; r++) {
      const v = treeField[r][col]
      if(v < height) {
        valSouth++
      } else {
        valSouth++
        break
      }
    }

  // Check west
  let valWest = 0
  for(let c = col - 1; c >= 0; c--) {
    const v = treeField[row][c]
    if(v < height) {
      valWest++
    } else {
      valWest++
      break
    }
  }

  // Check east
  let valEast = 0
  for(let c = col + 1; c < treeFieldXMax; c++) {
    const v = treeField[row][c]
    if(v < height) {
      valEast++
    } else {
      valEast++
      break
    }
  }

   return valNorth * valSouth * valWest * valEast
 }

 // Loop through each position in the tree field, and check if it is at all visible.
 let highestScenicScore = 0
 for(let row = 0; row < treeField.length; row++) {
   const treeRow = treeField[row]

   for(let col = 0; col < treeRow.length; col++) {
     const tree = treeRow[col]
     
     const scenicScore = getScenicScoreForTree(tree, row, col)
     if(scenicScore > highestScenicScore) highestScenicScore = scenicScore
   }
 }

 console.log(
   `[Part2] - Highest scenic score: ${highestScenicScore}`
 )
}

part1()
part2()

