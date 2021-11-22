const multer = require('multer');

const localUpload = multer({ dest: './public/uploads/' })

module.exports = { localUpload }