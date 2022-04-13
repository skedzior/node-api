const express = require('express')
const morgan = require('morgan')
const { providers } = require('ethers');

const app = express()

const wsprovider = new providers.WebSocketProvider('wss://wsapi.fantom.network/');

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

app.get("/test", (req, res) => {
  res.send("<h1>It'ssssssssss working 🤗</h1>")
})


  wsprovider.on('block', async (blockNumber) => {
    try {
      console.log('blockNumber: ', blockNumber);
    } catch (err) {
      console.log('got err', err);
    }
  });




const port = 8080
app.listen(port, () => console.log(`Listening on port ${port}`))