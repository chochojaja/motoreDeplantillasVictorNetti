const express = require('express')
const multer = require('multer')

const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true })) 

app.get('/api', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/public/index.html')
})


// ****************************************************************************************** /

/* Creating a storage object that will be used to store the file. */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        // console.dir(cb)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

// ****************************************************************************************** /
// Un archivo
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const { file } = req
    // console.log(file)
    // console.log(Date.now())
    if (!file) {
        const error =   new Error('Por favor suba un archivo')
        error.httpStatusCode = 400  
        return next(error)
    }
    res.send(file)
} )
///////////////////////////////////////////////////////////////////////////////////////////////////////
// Muchos archivos
app.post('/uploadfiles', upload.array('myFiles',12), (req, res, next)=>{
    const { files } = req
    // console.log(files)
    if (!files || files.length === 0) {
        const error =   new Error('Por favor suba un archivo como mínimo')
        error.httpStatusCode = 400  
        return next(error)
    }
    res.send(files)
} )


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
