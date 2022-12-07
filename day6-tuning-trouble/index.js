const fs = require('fs')

const part1 = () => {
  // Constants
  LENGTH_OF_PACKET_MARKER = 4

  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputString = input.split(/\r?\n/)[0].split("")

  // For each index, create a Set to see if 4 chars from current index are all unique.
  // If they are, we have found the packet marker, and know that the distance between
  // the beginning of the buffer, 
  // and the end of the marker is the current index + the length of the packet marker.
  let endOfPacketMarkerIndex
  for(const [i, char] of inputString.entries()) {
    allUniqueInFourSequence = new Set(
      [char, inputString[i + 1], inputString[i + 2], inputString[i + 3]]
    )
    
    if(allUniqueInFourSequence.size === LENGTH_OF_PACKET_MARKER) {
      endOfPacketMarkerIndex = i + LENGTH_OF_PACKET_MARKER
      break
    }
  }

  console.log(`[Part1] - Length from beginning to end of packet marker: ${endOfPacketMarkerIndex}`)
}

const part2 = () => {
  // Constants
  LENGTH_OF_MESSAGE_MARKER = 14

  // Fetch input
  const input = fs.readFileSync("input.txt").toString()
  const inputString = input.split(/\r?\n/)[0].split("")

  // For each index, create a Set to see if 14 chars from current index are all unique.
  // If they are, we have found the message marker, and know that the distance between
  // the beginning of the buffer, 
  // and the end of the marker is the current index + the length of the message marker.
  let endOfMessageMarkerIndex
  for(const [i, char] of inputString.entries()) {
    allUniqueInFourteenSequence = new Set(
      inputString.slice(i, i + LENGTH_OF_MESSAGE_MARKER)
    )
    
    if(allUniqueInFourteenSequence.size === LENGTH_OF_MESSAGE_MARKER) {
      endOfMessageMarkerIndex = i + LENGTH_OF_MESSAGE_MARKER
      break
    }
  }

  console.log(`[Part2] - Length from beginning to end of message marker: ${endOfMessageMarkerIndex}`)
}

part1()
part2()

