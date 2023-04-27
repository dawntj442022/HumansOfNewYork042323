const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} database at ${db.host}:${db.port}`);
});

db.on("error", function (err) {
  console.log(`Database connection error: ${err.message}`);
});
