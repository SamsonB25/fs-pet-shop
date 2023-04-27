import process from "node:process";
import fs from "node:fs";
import { error } from "node:console";
// import { error } from "node:console";

const subcommand = process.argv[2];

if (subcommand === "read") {
  const petIndex = process.argv[3];
  const petIndexNum = Number(petIndex);

  fs.readFile("pets.json", "utf8", (error, string) => {
    if (error) {
      throw error;
    }
    // convert string into an array
    const pets = JSON.parse(string);
    console.log(string);

    if (
      petIndexNum >= pets.length ||
      petIndexNum < 0 ||
      Number.isNaN(petIndex)
    ) {
      console.error("Usage: node pet.js read INDEX");
      process.exit(1);
    } else if (petIndex === undefined) {
      console.log(pets);
    } else {
      console.log(pets[petIndexNum]);
    }
  });
} else if (subcommand === "create") {
  const age = Number(process.argv[3]);
  const kind = process.argv[4];
  const name = process.argv[5];
  const newPet = { age, kind, name };

  fs.readFile("pets.json", "utf8", (error, string) => {
    if (error) {
      throw error;
    }
    // convert string into an array
    const pets = JSON.parse(string);
    if (
      newPet.name === undefined ||
      newPet.age === Number.isNaN(age) ||
      newPet.kind === undefined
    ) {
      console.log("Usage: node pet.js create AGE KIND NAME");
      process.exit(1);
    }
    pets.push(newPet);
    console.log(pets);

    fs.writeFile("pets.json", JSON.stringify(pets), (error) => {
      if (error) {
        throw error;
      }
    });
  });
} else if (subcommand === "update") {
  const petIndex = process.argv[3];
  const petIndexNum = Number(petIndex);
  const age = Number(process.argv[4]);
  const kind = process.argv[5];
  const name = process.argv[6];
  const newPet = { age, kind, name };

  fs.readFile("pets.json", "utf8", (error, string) => {
    if (error) {
      throw error;
    }
    // convert string into an array
    const pets = JSON.parse(string);
    if (
      petIndexNum >= pets.length ||
      petIndexNum < 0 ||
      Number.isNaN(petIndex)
    ) {
      console.error("Usage: node pet.js update INDEX AGE KIND NAME");
      console.log(pets);
      process.exit(1);
    }
    if (
      newPet.name === undefined ||
      newPet.age === Number.isNaN(age) ||
      newPet.kind === undefined
    ) {
      console.log("Usage: node pet.js update INDEX AGE KIND NAME");
      console.log(pets);
      process.exit(1);
    }

    pets[petIndexNum].age = Number(process.argv[4]);
    pets[petIndexNum].kind = process.argv[5];
    pets[petIndexNum].name = process.argv[6];

    console.log(pets);

    fs.writeFile("pets.json", JSON.stringify(pets), (error) => {
      if (error) {
        throw error;
      }
    });
  });
} else {
  console.error("Usage: node pet.js [read | create | update | destroy]");
  process.exit(1);
}
