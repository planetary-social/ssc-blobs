var createHash = require('./create-hash')

function write (cloudinary, file) {
    var hash = createHash(file)

    return new Promise(function (resolve, reject) {
        cloudinary.uploader.upload(file, {
            public_id: hash,
            overwrite: true
        }, function (err, res) {
            if (err) {
                return reject(err)
            }

            resolve(hash, res)
        })
    })

}

function read (cloudinary, hash) {
    return cloudinary.url(hash)
}

module.exports = { write, read }
