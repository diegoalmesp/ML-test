'use strict';

const app = require('./server/app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Api escuchando en ${PORT}!`);
});