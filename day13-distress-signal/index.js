const fs = require('fs')

const part1 = () => {
  // Init packetlist
  const packetList = fs.readFileSync("input.txt").toString().split(/\r?\n/).filter(packet => packet != '')

  let sumOfIndiciesOfPairsInRightOrder = 0
  for(let i = 0; i < packetList.length; i+=2) {
    const left = eval(packetList[i])
    const right = eval(packetList[i+1])

    // RETURN ==>   1 = right order, 0 = dont know yet, -1 = wrong order
    const isRightOrder = (left, right) => {

      while(left.length+1 && right.length+1) {
        let currentLeft = left.shift()
        let currentRight = right.shift()

        // Compare number sizes
        if(typeof currentLeft === 'number' && typeof currentRight === 'number') {
          if(currentLeft < currentRight) return 1 // left is smaller than right
          if(currentLeft > currentRight) return -1 // left is bigger than right
          else continue // left is equal to right
        }

        // Check if either or both lists ran out
        if(currentLeft === undefined || currentRight === undefined) {
          if(currentLeft === undefined && currentRight === undefined) return 0 // list runs out at same time
          if(currentLeft === undefined && currentRight !== undefined) return 1 // left list runs out first
          else return -1 // right list runs out first
        }

        // Recursively check if in order, if left or right is array
        if(typeof currentLeft !== 'object') currentLeft = [currentLeft]
        if(typeof currentRight !== 'object') currentRight = [currentRight]
        return isRightOrder(currentLeft, currentRight)
      }
    }

    if(isRightOrder(left, right) !== -1) {
      const indexOfPair = (i/2) + 1
      sumOfIndiciesOfPairsInRightOrder += indexOfPair
    }
  }

  console.log(
    `[Part1] - Sum of indicies of pairs in correct order is: ${sumOfIndiciesOfPairsInRightOrder}`
  )
}

const part2 = () => {
  // Init packetlist
  const packetList = fs.readFileSync("input.txt").toString().split(/\r?\n/).filter(packet => packet != '').map(packet => eval(packet))
  
  // Add divider packets
  packetList.push([[2]], [[6]])

  // RETURN ==>   1 = right order, 0 = dont know yet, -1 = wrong order
  const isRightOrder = (left, right) => {
    const leftCopy = JSON.parse(JSON.stringify(left)) // Need to keep arrays intact in P2
    const rightCopy = JSON.parse(JSON.stringify(right))

    while(leftCopy.length+1 && rightCopy.length+1) {
      let currentLeft = leftCopy.shift()
      let currentRight = rightCopy.shift()

      // Compare number sizes
      if(typeof currentLeft === 'number' && typeof currentRight === 'number') {
        if(currentLeft < currentRight) return 1 // left is smaller than right
        if(currentLeft > currentRight) return -1 // left is bigger than right
        else continue // left is equal to right
      }

      // Check if either or both lists ran out
      if(currentLeft === undefined || currentRight === undefined) {
        if(currentLeft === undefined && currentRight === undefined) return 0 // list runs out at same time
        if(currentLeft === undefined && currentRight !== undefined) return 1 // left list runs out first
        else return -1 // right list runs out first
      }

      // Recursively check if in order, if left or right is array
      if(typeof currentLeft !== 'object') currentLeft = [currentLeft]
      if(typeof currentRight !== 'object') currentRight = [currentRight]
      const res = isRightOrder(currentLeft, currentRight)
      if(res === 0) continue // we are not sure if left or right is smaller, keep checking
      else return res
    }
  }

  packetList.sort((a, b) => isRightOrder(b, a))

  // Find indicies of divider packets
  const first = packetList.findIndex(packet => JSON.stringify(packet) === JSON.stringify([[2]])) + 1
  const second = packetList.findIndex(packet => JSON.stringify(packet) === JSON.stringify([[6]])) + 1
  const decoderKey = first * second

  console.log(
    `[Part2] - Decored key is: ${decoderKey}`
  )
}

part1()
part2()


