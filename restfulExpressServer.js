import app from "./middleware.js";
import router from "./routes/petRoute.js";

const PORT = 3000;

app.use("/pet", router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});