import * as express from 'express';
import * as nats from 'ts-nats';
import * as mongodb from 'mongodb';
import * as assert from 'assert';

const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

nats
  .connect({ payload: nats.Payload.JSON })
  .then((nc) => {
    nc.subscribe('vehicle.*', (err, msg) => {
      console.log('message', msg.data);
    });
  })
  .catch((ex) => {
    console.error(ex);
  });

mongodb.MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  client.close();
});
