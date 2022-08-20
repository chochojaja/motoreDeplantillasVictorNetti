const express = require('express')
const { Router} = express
const {Contenedor} = require('./contenedor.js')
const app = express()
//const handlebars = require('express-handlebars')
app.use(express.urlencoded( {extended : true } ))
const routerUsuarios = Router()
const routerMascotas = Router()
const routerPersonas = Router()
const routerProductos = Router()

app.use(express.json())
app.use('/static',express.static(__dirname+'public'))
app.use(express.static('file'))

app.set('view engine', 'ejs')
app.set('views', './views')


//app.set('view engine', 'pug')
//app.set('views', './views')

const contenedor = new Contenedor('/contenedor')
const productos= contenedor.getAll()

app.get('/', (req , res) =>{
   
    res.render('/view/index',{
                mensaje:'Productos en Lista',
                productos
                })
})

app.post('/productos', (req , res) =>{
    const objeto = req.body
    console.log(objeto)
    productos.push(objeto)
    res.render('/view/index', {mansaje: 'todo ok', productos})
})



const arrayPersonas=[]

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });


routerPersonas.post('/', (req,res)=>{
            const { nombre , apellido , edad } = req.body
        

        res.json({
            ok:200,
            mensaje: 'todo bien el post',
            persona: [ ...arrayPersonas,{nombre, apellido , edad }]
        })
        
})
const arrayMascotas= []

routerMascotas.post('/', (req,res)=>{
    const { nombre , raza , edad } = req.body


res.json({
    ok:200,
    mensaje: 'todo bien el post',
    persona: [ ...arrayMascotas,{nombre, raza , edad }]
})

})
routerUsuarios.get('/:id', (req,res)=>{
    const {id} = req.params
    res.json({
        ok:200,
        mensaje: 'todo bien',
        id
    })
})
routerProductos.get('/', async (req , res ) => {
    
        const contenedor = new Contenedor('./productos.txt')
        try {
            const producto = await contenedor.getAll()
        res.send({producto})
        } catch (error) {
            res.send('no de encontro un producto')
        }
})



const arrayProductos= []

routerProductos.post('/', (req,res)=>{
    const { nombre , precio , thumbnail } = req.body


res.json({
    ok:200,
    mensaje: 'todo bien el post',
    persona: [ ...arrayProductos,{nombre, precio , thumbnail }]
})

})

app.use((err, req, res, next ) => {
    console.error(err.stack)
    res.send({err})
  })
  

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log('servidor escuchando en el puerto: 4000')
})

app.use('/api/usuarios', routerUsuarios)
app.use('/api/mascotas', routerMascotas)
app.use('/api/personas', routerPersonas)
app.use('/api/productos', routerProductos)