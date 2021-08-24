// Filename: server.js
// Description: Package's server entrypoint
// Author: Callum S. Taylor

// Packages
import Express from "express";
import router from "./routes/app_v1_routes.js";

const app = Express();
const port = process.env.port || 3000;

// JSON Parsing Options
app.use(Express.urlencoded({
  extended: false
}));
app.use(Express.json());

// Bind Router To App
app.use('/', router);

app.listen(port, () => {
  console.log(`SERVER NOW RUNNING ON PORT: ${port}`);
});