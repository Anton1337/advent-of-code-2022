const fs = require('fs')

const part1 = () => {
  // Init packetlist
  const rockPaths = fs.readFileSync("input.txt").toString().split(/\r?\n/).map(path => path.match(/\d+,\d+/g).map(step => ({x: +step.split(",")[0], y: +step.split(",")[1] })))

  const createMapWithRocks = (paths) => {
    const RANDOM_EXTRA_SPACE = 2
    const MAX_X = paths.flat().reduce((a, b) => Math.max(a, b.x), 0) + RANDOM_EXTRA_SPACE
    const MAX_Y = paths.flat().reduce((a, b) => Math.max(a, b.y), 0) + RANDOM_EXTRA_SPACE
    const map = Array.from({ length: MAX_Y }, () => Array.from({ length: MAX_X }, (_) => "."));

    // Add rocks to map
    paths.forEach(path => {
      for(let i = 0; i < path.length-1; i++) {
        let from = path[i]
        let to = path[i + 1]
        let dimension = from.x === to.x ? 'y' : 'x'
        if(from[dimension] > to[dimension]) {
          let temp = from
          from = to
          to = temp
        }
        const between = Array.from({ length: to[dimension] - from[dimension] + 1}, (_, i) => from[dimension] + i)

        // Fill in the rocks in map
        between.forEach(val => {
          if(dimension === 'y') {
            map[val][from.x] = '#'
          } else {
            map[from.y][val] = '#'
          }
        })
      }
    })

    return { MAX_X, MAX_Y, map }
  }

  const { MAX_X, MAX_Y, map: mapWithRocks } = createMapWithRocks(rockPaths)

  // Start tossing sand untill, they start falling into the void
  let amountOfRocks = 0;
  outer:
    while(true) {
      
      
      // Throw single sand down untill it cant move no longer.
      const sandPos = {x: 500, y: 0} 
      while(true) {
        // Check if sand is falling into void
        if(sandPos.y === MAX_Y -1) {
          break outer
        }

        if(mapWithRocks[sandPos.y+1][sandPos.x] === '.') {
          sandPos.y += 1
        } else if(mapWithRocks[sandPos.y+1][sandPos.x-1] === '.') {
          sandPos.y += 1
          sandPos.x -= 1
        } else if(mapWithRocks[sandPos.y+1][sandPos.x+1] === '.') {
          sandPos.y += 1
          sandPos.x += 1
        } else {
          // We cant move, so place sand here.
          mapWithRocks[sandPos.y][sandPos.x] = 'o'
          break
        }
      }

      amountOfRocks += 1
    }

  console.log(
    `[Part1] - Amount of units of sand that come to rest before sand starts flowing into the abyss below: ${amountOfRocks}`
  ) 
}

const part2 = () => {
  // Init packetlist
  const rockPaths = fs.readFileSync("input.txt").toString().split(/\r?\n/).map(path => path.match(/\d+,\d+/g).map(step => ({x: +step.split(",")[0], y: +step.split(",")[1] })))

  const createMapWithRocks = (paths) => {
    const RANDOM_EXTRA_SPACE = 2
    const MAX_X = paths.flat().reduce((a, b) => Math.max(a, b.x), 0) + 1000
    const MAX_Y = paths.flat().reduce((a, b) => Math.max(a, b.y), 0) + RANDOM_EXTRA_SPACE
    const map = Array.from({ length: MAX_Y }, () => Array.from({ length: MAX_X }, (_) => "."));

    // Add rocks to map
    paths.forEach(path => {
      for(let i = 0; i < path.length-1; i++) {
        let from = path[i]
        let to = path[i + 1]
        let dimension = from.x === to.x ? 'y' : 'x'
        if(from[dimension] > to[dimension]) {
          let temp = from
          from = to
          to = temp
        }
        const between = Array.from({ length: to[dimension] - from[dimension] + 1}, (_, i) => from[dimension] + i)

        // Fill in the rocks in map
        between.forEach(val => {
          if(dimension === 'y') {
            map[val][from.x] = '#'
          } else {
            map[from.y][val] = '#'
          }
        })
      }
    })

    return { MAX_X, MAX_Y, map }
  }

  const { MAX_X, MAX_Y, map: mapWithRocks } = createMapWithRocks(rockPaths)

  // Start tossing sand untill, they start falling into the void
  let amountOfRocks = 0;
  outer:
    while(true) {
      
      // Throw single sand down untill it cant move no longer.
      const sandPos = {x: 500, y: 0} 
      while(true) {
        // Check if sand is falling into void
        if(sandPos.y === MAX_Y-1) {
          mapWithRocks[sandPos.y][sandPos.x] = 'o'
          break
        }

        // check if we reach goal state
        if(mapWithRocks[0][500] === 'o') {
          break outer
        }

        if(mapWithRocks[sandPos.y+1][sandPos.x] === '.') {
          sandPos.y += 1
        } else if(mapWithRocks[sandPos.y+1][sandPos.x-1] === '.') {
          sandPos.y += 1
          sandPos.x -= 1
        } else if(mapWithRocks[sandPos.y+1][sandPos.x+1] === '.') {
          sandPos.y += 1
          sandPos.x += 1
        } else {
          // We cant move, so place sand here.
          mapWithRocks[sandPos.y][sandPos.x] = 'o'
          break
        }
      }

      amountOfRocks += 1
    }

  console.log(
    `[Part2] - How many units of sand come to rest: ${amountOfRocks}`
  )
}

part1()
part2()