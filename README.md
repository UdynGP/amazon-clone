# A Full Stack Ecommerce Application 
Implemented a clone of Amazon.com ecommerce website. Used the MERN tech stack for the Development process.

## App Info
Currently the website is hosted on the private server only. Production build will be deployed in due course.

Frontend URL - Open [http://localhost:3000](http://localhost:3000)  
Backend URL - Open [http://localhost:5000](http://localhost:5000)

For detailed instructions to install and run the REACT application, please check the README file in the /frontend folder

## Demo of Checkout Process in the Frontend

https://github.com/UdynGP/amazon-clone/assets/62198309/87c1097a-581b-440b-b067-c2b9b35be173

## Project Report ---> Please check the PDF file for the UI Screenshots

[Major Project_Udayan Gupta_Full Stack December Batch.pdf](https://github.com/UdynGP/amazon-clone/files/14813599/Major.Project_Udayan.Gupta_Full.Stack.December.Batch.pdf)

## Details and installation procedure for express.js

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

  Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org).

```js
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```

## Installation Guidelines for npmjs

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install express
```

Follow [our installing guide](http://expressjs.com/en/starter/installing.html)
for more information.
