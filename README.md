# SOEN357-prototype

### Setup (via npm)
`git clone git@github.com:rsleyland/SOEN357-prototype.git`

`cd SOEN357-prototype/backend`

`npm install`

`npm start`

##### New terminal/console
`cd SOEN357-prototype/frontend`

`npm install`

`npm start`

### Configuration:
.env variables need to be filled - i.e DB connection uri

### Additional:
Uses npm package nodemon to automatically update node application when changes are made.


### Setup (via Docker)

`git clone git@github.com:rsleyland/SOEN357-prototype.git`

`cd SOEN357-prototype`

`make build-dev`

`make run-dev`

### Docker Configuration:
Add DB connection uri to /backend/.env