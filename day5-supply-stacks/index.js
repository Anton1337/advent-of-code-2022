const fs = require('fs')

/*
    [M]             [Z]     [V]    
    [Z]     [P]     [L]     [Z] [J]
[S] [D]     [W]     [W]     [H] [Q]
[P] [V] [N] [D]     [P]     [C] [V]
[H] [B] [J] [V] [B] [M]     [N] [P]
[V] [F] [L] [Z] [C] [S] [P] [S] [G]
[F] [J] [M] [G] [R] [R] [H] [R] [L]
[G] [G] [G] [N] [V] [V] [T] [Q] [F]
 1   2   3   4   5   6   7   8   9 
*/
const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  // Prepare initial stacks
  const prepareStacks = () => {
    const stacks = [
      ['G', 'F', 'V', 'H', 'P', 'S'],           // 1
      ['G', 'J', 'F', 'B', 'V', 'D', 'Z', 'M'], // 2
      ['G', 'M', 'L', 'J', 'N'],                // 3
      ['N', 'G', 'Z', 'V', 'D', 'W', 'P'],      // 4
      ['V', 'R', 'C', 'B'],                     // 5
      ['V', 'R', 'S', 'M', 'P', 'W', 'L', 'Z'], // 6
      ['T', 'H', 'P'],                          // 7
      ['Q', 'R', 'S', 'N', 'C', 'H', 'Z', 'V'], // 8
      ['F', 'L', 'G', 'P', 'V', 'Q', 'J'],      // 9
    ]

    return stacks
  }

  const stacks = prepareStacks()

  // Do all move operations
  inputArrayEachLine.forEach((operation) => {
    const [_, amount, from, to] = operation.split(/[movefrt ]+/)
    
    for(let i = 0; i < amount; i++) {
      const itemToMove = stacks[from - 1].pop()
      if (itemToMove) stacks[to - 1].push(itemToMove)
    }
  })

  // Concat all boxes that are on top of each stack.
  const cratesOnTop = stacks.reduce((cratesOnTop, currStack) => {
    return cratesOnTop + currStack.at(-1)
  }, '')

  console.log(`[Part1] - All crates on top: ${cratesOnTop}`)
}

const part2 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  // Prepare initial stacks
  const prepareStacks = () => {
    const stacks = [
      ['G', 'F', 'V', 'H', 'P', 'S'],           // 1
      ['G', 'J', 'F', 'B', 'V', 'D', 'Z', 'M'], // 2
      ['G', 'M', 'L', 'J', 'N'],                // 3
      ['N', 'G', 'Z', 'V', 'D', 'W', 'P'],      // 4
      ['V', 'R', 'C', 'B'],                     // 5
      ['V', 'R', 'S', 'M', 'P', 'W', 'L', 'Z'], // 6
      ['T', 'H', 'P'],                          // 7
      ['Q', 'R', 'S', 'N', 'C', 'H', 'Z', 'V'], // 8
      ['F', 'L', 'G', 'P', 'V', 'Q', 'J'],      // 9
    ]

    return stacks
  }

  const stacks = prepareStacks()

  // Do all move operations
  inputArrayEachLine.forEach((operation) => {
    const [_, amount, from, to] = operation.split(/[movefrt ]+/)

    let fromStack = stacks[from - 1]
    let toStack = stacks[to - 1]

    const elementsToMove = fromStack.splice(fromStack.length - amount)
    toStack = [...toStack, ...elementsToMove]

    stacks[from - 1] = fromStack
    stacks[to - 1] = toStack

  })

  // Concat all boxes that are on top of each stack.
  const cratesOnTop = stacks.reduce((cratesOnTop, currStack) => {
    return cratesOnTop + currStack.at(-1)
  }, '')

  console.log(`[Part1] - All crates on top: ${cratesOnTop}`)
}

part1()
part2()

