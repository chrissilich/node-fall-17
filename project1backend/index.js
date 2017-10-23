const express = require('express')
const app = express()
const bodyParser = require('body-parser')




app.use( bodyParser.urlencoded({ extended: true }) );



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});





let items = [];

var idIncrementer = 0;

class Item {
  constructor(task) {
    this.task = task;
    this.completed = false;
    this.id = idIncrementer++;
    this.deleted = false;
  }
}

items.push( new Item("Walk dog") );
items.push( new Item("Feed dog") );
items.push( new Item("Make bed") );

items[0].deleted = true;



app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.get('/shelly', function (req, res) {
  res.send('Shelly is cool.')
})

/*
GET    /item     get all the items 	(read)
POST   /item     add a new item 	  (create)
GET    /item/1   get item 1  		    (read)
POST   /item/1   edit item 1 		    (update)
DELETE /item/1   delete item 1 		  (delete)

GET    /item/1/comment 	get the comments for item
*/



app.get('/item', function (req, res) {
  
  let notDeletedItems = items.filter(function(item) {
    return !item.deleted;
  })
  res.json(notDeletedItems)

})



app.post('/item', function (req, res) {

  let newItem = new Item( req.body.task );
  items.push( newItem );
  res.send( newItem );

})


app.get('/item/:itemId', function (req, res) {
  
  // respond with JSON object of item with id 
  // matching the one in the url


  let item = items.find(function(item) {
  	return (req.params.itemId == item.id);
  })
  res.json(item)

 
})



app.delete('/item/:itemId', function (req, res) {
  
  // respond with JSON object of item with id 
  // matching the one in the url


  let doomedItem = items.find(function(item) {
    return (req.params.itemId == item.id);
  })

  if (doomedItem) {
    doomedItem.deleted = true;
  }

  res.json(doomedItem)
 
})






app.listen(1337, function () {
  console.log('Example app listening on port 1337!')
})