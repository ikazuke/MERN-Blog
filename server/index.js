const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// MySQL database models with sequelize
const db = require("./models");

// Routers
app.use("/posts", require("./routes/Posts"));
app.use("/comments", require("./routes/Comments"));
app.use("/auth", require("./routes/Users"));
// Server
const PORT = 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
