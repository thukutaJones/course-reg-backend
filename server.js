const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 7000;
const dbString = process.env.DATABASE_URL;

mongoose
  .connect(dbString)
  .then(() => {
    console.log("Database connected successfully!!");
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
