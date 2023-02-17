const express = require('express');
const app = express();
const db = require('./config/keys').mongodb;
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bikers_router = require('./routes/biker-routes');
const senders_router = require('./routes/sender-routes');
const parcels_router = require('./routes/parcel-router');
const init = require('./initialize');
mongoose.connect(db.DBURL,{useNewUrlParser: true, useUnifiedTopology: true}).
then().catch(err=>console.log(err));
mongoose.connection.once('open', ()=>console.log('it works fine'));

app.use(express.json());

app.use(cors());
app.use(morgan('combined'));
app.use('/bikers', bikers_router);
app.use('/senders', senders_router);
app.use('/parcels', parcels_router);
init();
app.get('/', (req, res) => {
    res.send('hello world');
  });
app.listen(8080, ()=>console.log('the server is on'));
