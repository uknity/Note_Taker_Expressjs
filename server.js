const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
 console.log("Server listening on port 5000");
});
