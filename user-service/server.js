const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
require("./src/config/db.config");
const user = require('./src/routes/user/userRoutes');
const admin = require('./src/routes/admin/adminRoutes');

app.use("/media", express.static("./public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// app.use('/api/v1/admin', admin);
// app.use('/api/v1/user', user);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
