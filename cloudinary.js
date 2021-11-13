var createHash = require('./create-hash')

function Client (cloudinary) {
    function write (file) {
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

    function getUrl (hash) {
        return cloudinary.url(hash)
    }

    return { write, getUrl }
}


module.exports = Client
