import express from "express";
import fs from "node:fs";
const app = express();
const port = 3000;
const petRegExp = /^\/pet\/(\d+)$/;
// handle request
app.get("/pet", (request, response) => {
  fs.readFile("pets.json", "utf8", (err, string) => {
    // error handling
    response.end(string);
  });
});

app.get(petRegExp, (request, response) => {
  if (petRegExp.test(request.url) || petIndex === null) {
    fs.readFile("pets.json", "utf8", (err, string) => {
      const petIndex = Number(request.url.match(petRegExp)[1]);
      console.log(petIndex);
      const pets = JSON.parse(string);
      const pet = pets[petIndex];
      //error handling
      if (petIndex > pets.length || Number.isNaN(petIndex)) {
        response.statusCode = 404;
        response.setHeader("Content-Type", `text/plain`);
        response.end("Not Found");
      }
      response.end(JSON.stringify(pet));
    });
  }
});

app.get("/", (request, response) => {
  fs.readFile("pets.json", "utf8", (err, string) => {
    response.statusCode = 404;
    response.setHeader("Content-Type", `text/plain`);
    response.end("Not Found");
  });
});

// listen on port
app.listen(3000, () => {
  console.log(`Listening On Port ${port}`);
});
