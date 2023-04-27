import http from "node:http";
import fs from "node:fs";
http
  .createServer(function (request, response) {
    // create regExp that we want the url to match.
    // this will allow is to match a similarly formated request.url.
    const petRegExp = /^\/pet\/(\d+)$/;
    // if statement to ensure code runs if conditions are met.
    if (request.method === "GET" && request.url === "/pet") {
      // read the pets.json file
      fs.readFile("pets.json", "utf-8", (err, string) => {
        if (err) {
          throw err;
        }
        response.setHeader("Content-Type", "application/json");
        response.end(string);
      });
      // use the regExp to test if request url a similar format.
    } else if (request.method === "GET" && petRegExp.test(request.url)) {
      // get the pet index by converting the url regExp to a number
      // index 1 is the first capture group
      const petIndex = Number(request.url.match(petRegExp)[1]);
      fs.readFile("pets.json", "utf-8", (err, string) => {
        const pets = JSON.parse(string);
        // console.log(pets);
        // assign pet to pets and the regExp number
        const pet = pets[petIndex];

        if (petIndex > pets.length || pet === undefined) {
          response.setHeader("Content-Type", `text/plain`);
          response.statusCode = 404;
          response.end("Not Found");
        }
        response.setHeader("Content-Type", "application/json");
        // convert pets.json into an array

        response.end(JSON.stringify(pet));
      });
    }
  })
  .listen(3000, function () {
    console.log(`Listening On Port 3000`);
  });
