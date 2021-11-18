# ssc blobs

Store blobs

## install

```
$ npm i @planetary-ssb/ssc-blobs
```

## cloudinary
Use cloudinary as a content-addressable store by using a hash as the filename.

### API
```js
let cloudinary = require("cloudinary").v2;
cloudinary.config({ /*...*/ });
var client = require('@planetary-ssb/ssc-blobs').cloudinary(cloudinary)
var hash = await client.write(file)
// =>  7602e0d96bdcb35fc90e085840fcbe8873d8ce342efe7ec24a446b269093eb47
client.url(hash)
// => http://res.cloudinary.com/https-www-planetary-social/image/upload/7602e0d96bdcb35fc90e085840fcbe8873d8ce342efe7ec24a446b269093eb47
```

### example

```js
require('dotenv').config()
let cloudinary = require("cloudinary").v2;
var fs = require('fs')
var test = require('tape')
var Client = require('../').cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

var client = Client(cloudinary)

var caracal = fs.readFileSync(__dirname + '/caracal.jpg')
let base64Caracal = 'data:image/png;base64,' + caracal.toString('base64')

var _hash
test('write', t => {
    client.write(base64Caracal)
        .then(hash => {
            _hash = hash
            t.equal(hash, '7602e0d96bdcb35fc90e085840fcbe8873d8ce342efe7ec24a446b269093eb47',
                'should return a hash for the file')
            t.end()
        })
})

test('getUrl', t => {
    var url = client.getUrl(_hash)
    t.ok(url.includes('http://res.cloudinary.com'), 'should return a url')
    t.ok(url.includes(_hash), 'should use the hash as filename')
    t.end()
})
```
