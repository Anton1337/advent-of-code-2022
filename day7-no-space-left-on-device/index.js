const fs = require('fs')

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  const parseCMDLine = (line) => {
    // If line undefined, we have reached EOF
    if(line === undefined) {
      return { type: 'COMMAND', action: 'DIR_DONE', context: undefined }
    }

    // If starts with $, its a command
    if(line.startsWith('$')) {
      // If line is '$ cd ..', we are done with directory, and are moving up
      if(line === '$ cd ..') {
        return { type: 'COMMAND', action: 'DIR_DONE', context: undefined }
      }
      // If line is '$ ls', we will on the next lines list all contents of dir
      else if(line === '$ ls') {
        return { type: 'COMMAND', action: 'DIR_LIST', context: undefined }
      }
      // Else, we are cd'ing into a new directory
      else {
        return { type: 'COMMAND', action: 'DIR_INTO', context: line.split(" ").at(-1) }
      }
    }

    // If it does not start with a $, we're listing a file or a dir
    // If it starts with 'dir', its a directory we're listing
    if(line.startsWith('dir')) {
      return { type: 'LIST', action: 'DIR', context: line.split(" ").at(-1) }
    }
    // else, its a file
    else {
      return { type: 'LIST', action: 'FILE', context: parseInt(line.split(" ")[0]) }
    }
  }

  // Fetch next line in cmd.
  const getNextLine = () => {
    return parseCMDLine(inputArrayEachLine[++terminalRow])
  }

  const dirSizesMap = {}
  let terminalRow = 0
  const getSizeOfDirectory = (dir) => {

    // Skip all COMMANDS, they are not needed for the recursive algo
    // And they are executed in a predictable order, therefore we can predict what will be executed
    let line = getNextLine()
    while(line.type === 'COMMAND') line = getNextLine()

    // Store result from 'ls' command
    const contentsInThisDirectory = []
    while(line.type === 'LIST') {
      contentsInThisDirectory.push(line)
      line = getNextLine()
    }

    // Add together sizes of contents in dir
    let sizeOfThisDir = 0
    contentsInThisDirectory.forEach(line => {
      if(line.action === 'FILE') {
        sizeOfThisDir += line.context
      } 
      else if(line.action === 'DIR') {
        sizeOfThisDir += getSizeOfDirectory(line.context)
      } 

    })

    // Store sizes of every directory in a map.
    // Since we store them in a "flat" map, and directories can have the same name
    // we need to make them unique. Therefore, add random decimal number after.
    if(dirSizesMap[dir]) {
      dirSizesMap[dir + Math.random()] = sizeOfThisDir
    } else {
      dirSizesMap[dir] = sizeOfThisDir
    }
    
    return sizeOfThisDir
  }

  // Recursively get sizes of entire hard drive, and of each dicectory
  const size = getSizeOfDirectory('/')

  let sumOfAllDirectoriesSmallerThan100k = 0
  for(const [key, value] of Object.entries(dirSizesMap)) {
    if(value <= 100_000) sumOfAllDirectoriesSmallerThan100k += value
  }

  console.log(`[Part1] - Sum of all directories smaller than or equal to 100k: ${sumOfAllDirectoriesSmallerThan100k}`)
}

const part2 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  const parseCMDLine = (line) => {
    // If line undefined, we have reached EOF
    if(line === undefined) {
      return { type: 'COMMAND', action: 'DIR_DONE', context: undefined }
    }

    // If starts with $, its a command
    if(line.startsWith('$')) {
      // If line is '$ cd ..', we are done with directory, and are moving up
      if(line === '$ cd ..') {
        return { type: 'COMMAND', action: 'DIR_DONE', context: undefined }
      }
      // If line is '$ ls', we will on the next lines list all contents of dir
      else if(line === '$ ls') {
        return { type: 'COMMAND', action: 'DIR_LIST', context: undefined }
      }
      // Else, we are cd'ing into a new directory
      else {
        return { type: 'COMMAND', action: 'DIR_INTO', context: line.split(" ").at(-1) }
      }
    }

    // If it does not start with a $, we're listing a file or a dir
    // If it starts with 'dir', its a directory we're listing
    if(line.startsWith('dir')) {
      return { type: 'LIST', action: 'DIR', context: line.split(" ").at(-1) }
    }
    // else, its a file
    else {
      return { type: 'LIST', action: 'FILE', context: parseInt(line.split(" ")[0]) }
    }
  }

  // Fetch next line in cmd.
  const getNextLine = () => {
    return parseCMDLine(inputArrayEachLine[++terminalRow])
  }

  const dirSizesMap = {}
  let terminalRow = 0
  const getSizeOfDirectory = (dir) => {

    // Skip all COMMANDS, they are not needed for the recursive algo
    // And they are executed in a predictable order, therefore we can predict what will be executed
    let line = getNextLine()
    while(line.type === 'COMMAND') line = getNextLine()

    // Store result from 'ls' command
    const contentsInThisDirectory = []
    while(line.type === 'LIST') {
      contentsInThisDirectory.push(line)

      line = getNextLine()
    }

    // Add together sizes of contents in dir
    let sizeOfThisDir = 0
    contentsInThisDirectory.forEach(line => {
      if(line.action === 'FILE') {
        sizeOfThisDir += line.context
      } 
      else if(line.action === 'DIR') {
        sizeOfThisDir += getSizeOfDirectory(line.context)
      } 

    })

    // Store sizes of every directory in a map.
    // Since we store them in a "flat" map, and directories can have the same name
    // we need to make them unique. Therefore, add random decimal number after.
    if(dirSizesMap[dir]) {
      dirSizesMap[dir + Math.random()] = sizeOfThisDir
    } else {
      dirSizesMap[dir] = sizeOfThisDir
    }
    
    return sizeOfThisDir
  }

  // Recursively get sizes of entire hard drive, and of each dicectory
  const size = getSizeOfDirectory('/')

  const spaceNeededToFreeUp = size - 40_000_000

  let smallestDirectoryToDelete = 40_000_000 // init with ceil value
  for(const [key, value] of Object.entries(dirSizesMap)) {
    if(value >= spaceNeededToFreeUp && value < smallestDirectoryToDelete) smallestDirectoryToDelete = value
  }

  console.log(`[Part2] - Size of smallest directory to delete to free up enough space: ${smallestDirectoryToDelete}`)
}

part1()
part2()

