import express, { response } from "express";
import { log } from "node:console";
import fs from "node:fs";
const app = express();
const port = 3000;
app.use(express.json());
// handle request
app.get("/pet", (request, response) => {
  fs.readFile("pets.json", "utf8", (err, string) => {
    // error handling
    response.end(string);
  });
});

app.get("/pet/:index", (request, response) => {
  fs.readFile("pets.json", "utf8", (err, string) => {
    const petIndex = Number(request.params.index);
    console.log(petIndex);
    const pets = JSON.parse(string);
    const pet = pets[petIndex];
    //error handling
    if (petIndex > pets.length || petIndex < 0 || Number.isNaN(petIndex)) {
      response
        .status(404)
        .response.setHeader("Content-Type", `text/plain`)
        .response.end("Not Found");
      return;
    }
    response.end(JSON.stringify(pet));
  });
});

app.post("/pet", (request, response) => {
  const addPet = request.body;
  console.log(typeof addPet.age !== "number");
  if (
    addPet.name === undefined ||
    typeof addPet.age !== "number" ||
    addPet.kind === undefined
  ) {
    response.statusCode = 400;
    response
      .setHeader("Content-Type", `text/plain`)
      .response.end("Bad Request");
    return;
  }
  fs.readFile("pets.json", "utf8", (error, string) => {
    let pets = JSON.parse(string);
    pets.push(addPet);
    fs.writeFile("pets.json", JSON.stringify(pets), (err) => {
      response
        .setHeader("Content-Type", "application/json")
        .response.send(addPet);
    });
  });
});

app.delete("/pet/:index", (request, response) => {
  const petIndex = Number(request.params.index);
  fs.readFile("pets.json", "utf8", (err, string) => {
    console.log(petIndex);
    const pets = JSON.parse(string);
    const pet = pets[petIndex];
    //error handling
    if (petIndex > pets.length || petIndex < 0 || Number.isNaN(petIndex)) {
      response
        .status(404)
        .response.setHeader("Content-Type", `text/plain`)
        .response.end("Not Found");
      return;
    }
    pets.splice(petIndex, 1);
    // response.end(JSON.stringify(pets));

    fs.writeFile("pets.json", JSON.stringify(pets), (err) => {
      if (err) {
        throw err;
      }
      response.status(200).json({
        status: "success",
        data: {
          pet,
        },
      });
    });
  });
});

// listen on port
app.listen(3000, () => {
  console.log(`Listening On Port ${port}`);
});
