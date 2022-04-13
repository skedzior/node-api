const express = require('express')
const morgan = require('morgan')
const { providers } = require('ethers');

const app = express()

const wsprovider = new providers.WebSocketProvider("wss://ftm.getblock.io/mainnet/?api_key=ea820f61-b008-4a51-bd80-21abcfdcd5ae");
const provider = new providers.JsonRpcProvider('https://rpcapi.fantom.network');
const wsprovider2 = new providers.WebSocketProvider('wss://wsapi.fantom.network/');
let activeProvider;

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

app.get("/test", (req, res) => {
  res.send("<h1>It's working 🤗</h1>")
})

app.post('/provider', (req, res) => {
  console.log('req.body: ', req.body);
  activeProvider = new providers.WebSocketProvider(req.body.rpc);

  return res.send('set');
});

app.post('/sub-block', (req, res) => {
  console.log('req.body: ', req.body);
  wsprovider.on('block', async (blockNumber) => {
    try {
      console.log('blockNumber: ', blockNumber);
    } catch (err) {
      console.log('got err', err);
    }
  });

  return res.send('subbed');
});

app.post('/unsub-block', (req, res) => {
  console.log('req.body: ', req.body);
  wsprovider.removeAllListeners();

  return res.send('unsub');
});


const port = 8080
app.listen(port, () => console.log(`Listening on port ${port}`))