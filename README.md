# ssc blobs

Store blobs

## install

```
$ npm i @planetary-ssb/ssc-blobs
```

## cloudinary
Use cloudinary as a content-addressable store by using a hash as the filename.

### API
#### .write
returns a promise for the hash of the file that you're writing

#### .getUrl
return a URL for the given hash

### example

```js
var fs = require('fs')
require('dotenv').config()
let cloudinary = require("cloudinary").v2;
var { write, getUrl } = require('../').cloudinary
var test = require('tape')

var caracal = fs.readFileSync(__dirname + '/caracal.jpg')
let base64Caracal = 'data:image/png;base64,' + caracal.toString('base64')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

var _hash
test('write', t => {
    write(cloudinary, base64Caracal)
        .then(hash => {
            _hash = hash
            t.equal(hash, '7602e0d96bdcb35fc90e085840fcbe8873d8ce342efe7ec24a446b269093eb47',
                'should return a hash for the file')
            t.end()
        })
})

test('getUrl', t => {
    var url = getUrl(cloudinary, _hash)
    t.ok(url.includes('http://res.cloudinary.com'), 'should return a url')
    t.ok(url.includes(_hash), 'should use the hash as filename')
    t.end()
})
```
