const mongoose = require("mongoose");
const app = require("./app");
const env = require("./config/env");

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
