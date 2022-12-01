const fs = require('fs')

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputArrayEachLine = input.split(/\r?\n/)

  // Loop through elfs, and keep storing the MAX
  let maxCaloriesForElf = 0

  inputArrayEachLine.reduce((totalValueForElf, meal) => {

    // If we reach end of elf, check if we beat previous maxCalorieForElf value
    if(meal === '') {
      if(totalValueForElf > maxCaloriesForElf) maxCaloriesForElf = totalValueForElf
      return 0
    }

    // If we have not yet reached end, keep adding to total for current elf.
    return totalValueForElf + parseInt(meal)
  }, 0)

  console.log(`[Part1] - Maximum calories for elf is: ${maxCaloriesForElf}`)
}

const part2 = () => {
   // Fetch input
   const input = fs.readFileSync("input.txt").toString()
   const inputArrayEachLine = input.split(/\r?\n/)
 
   // Loop through elfs, and store EACH elfs calories here
   allElfsCalories = []
 
   inputArrayEachLine.reduce((totalValueForElf, meal) => {
 
     // If we reach end of elf, put in in elf array (IK i could have returned from reduce, but cba)
     if(meal === '') {
       allElfsCalories.push(totalValueForElf)
       return 0
     }
 
     // If we have not yet reached end, keep adding to total for current elf.
     return totalValueForElf + parseInt(meal)
   }, 0)

   allElfsCalories.sort((a, b) => b - a)
   const top3ElfsCalories = allElfsCalories[0] + allElfsCalories[1] + allElfsCalories[2]
 
   console.log(`[Part2] - Maximum calories for top 3 elfs is: ${top3ElfsCalories}`)
}

part1()
part2()

