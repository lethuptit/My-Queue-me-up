// YOUR_BASE/app.local.js
const express = require('express');
const { app, apiRouter } = require('./functions/app');
const router = express.Router();

router.use('/api', apiRouter);
app.use("/", router);

app.listen(5000, () => console.log('Server is listening on port 5000.... '));
