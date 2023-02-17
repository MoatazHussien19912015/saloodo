const Biker = require('./models/biker-model');
const Sender = require('./models/sender-model');

const randomBikers = [{email: 'biker@gmail.com', username: 'bikey', password: '123456'},
{email: 'quicksilver@gmail.com', username: 'quicksilver', password: '123456'},
{email: 'bmx@gmail.com', username: 'bmx', password: '123456'},
{email: 'mountainbiker@gmail.com', username: 'mountainbiker', password: '123456'},
{email: 'flyingbiker@gmail.com', username: 'flyingbiker', password: '123456'},
{email: 'pilot@gmail.com', username: 'pilot', password: '123456'},
{email: 'maxwheel@gmail.com', username: 'maxwheel', password: '123456'},
{email: 'flyingdutch@gmail.com', username: 'flyingdutch', password: '123456'},
{email: 'dutchbiker@gmail.com', username: 'dutchbiker', password: '123456'},
{email: 'saloodo@gmail.com', username: 'saloodo', password: '123456'}
];

const randomSenders = [{email: 'sender@gmail.com', username: 'sendey', password: 123456},
{email: 'dispatchito@gmail.com', username: 'dispatchito', password: 123456},
{email: 'postman@gmail.com', username: 'postman', password: 123456},
{email: 'candyman@gmail.com', username: 'candyman', password: 123456},
{email: 'elonmusk@gmail.com', username: 'elonmusk', password: 123456}];
const random1 = Math.floor(Math.random()*10);
const random2 = Math.floor(Math.random()*5);
module.exports = async() => {
    try{
        let bikers, senders;
        const alreadyExistedBikers = await Biker.findOne({email: randomBikers[random1].email}); 
    if(!alreadyExistedBikers) 
    {
       bikers =  await Biker.insertMany([...randomBikers]);
    }
    const alreadyExistedSenders = await Sender.findOne({email: randomSenders[random2].email}); 
    if(!alreadyExistedSenders) {
         senders = await Sender.insertMany([...randomSenders]);
    }
    console.log('bikers', bikers, 'senders', senders);
    }
    catch(err) {
        console.log(err);
    }
    

};

