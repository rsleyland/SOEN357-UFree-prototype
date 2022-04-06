# SOEN357-prototype

Setup
git clone git@github.com:rsleyland/SOEN357-prototype.git

cd SOEN357-prototype/backend
npm install
npm start

New terminal/console
cd SOEN357-prototype/frontend
npm install
npm start

Configuration:
.env variables need to be filled - i.e DB connection uri

Additional:
Uses npm package nodemon to automatically update node application when changes are made.

Use npm install -g nodemon to globally install nodemon package

otherwise change ln.7 in package.json to "start" : "npm run server.js"
