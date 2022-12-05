import fs from "fs";

const data = fs.readFileSync("data", "utf-8").split(/\r?\n/);
// const data = fs.readFileSync("data.example", "utf-8").split(/\r?\n/);

const [game, moves] = data.reduce(
  (extracted, currString) => {
    if (!extracted[0]?.fullyImplemented) {
      //All the game information is still not done
      const createsInformation = currString.split("");

      let index = 1;
      for (let i = 1; i < createsInformation.length; i += 4) {
        if (createsInformation[i] === " ") {
          index++;
          continue;
        }
        if (!isNaN(createsInformation[i])) {
          extracted[0].fullyImplemented = true;
          return extracted;
        }

        if (!extracted[0][index]) extracted[0][index] = [createsInformation[i]];
        else extracted[0][index].unshift(createsInformation[i]);

        index++;
      }

      return extracted;
    } else {
      // the game has been initilazed, now for the moves

      const [amount, from, to] = currString.split(/(\d+)/).filter((e) => !isNaN(e));

      if (amount === undefined || amount === "" || from === undefined || from === "" || to === undefined || to === "")
        return extracted;

      extracted[1].push([amount, from, to]);

      return extracted;
    }
  },
  [{}, []]
);