const express = require("express");
const app = express();
require("dotenv").config();
const PORT_ADMIN = process.env.PORT_ADMIN;
require("./src/config/db.config");
const admin = require('./src/routes/adminRoutes');
const category = require('./src/routes/categoryRoutes');
const plant = require('./src/routes/plantRoutes');
const cms = require('./src/routes/cmsRoutes');
const { internal_server_error } = require("./src/utils/commonResponse");

app.use("/media", express.static("./public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/', admin);
app.use('/category', category);
app.use('/plant', plant);
app.use('/cms', cms);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  return internal_server_error(res, err.message);
});
app.listen(PORT_ADMIN, () => {
  console.log(`Server is listening on port ${PORT_ADMIN}`);
});
