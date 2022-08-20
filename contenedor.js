const fs = require('fs')

class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }

    async save(objData){   
         
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            const dataParse = JSON.parse(data)
            // console.log(JSON.parse(data))
            let arrayProds = [ ...dataParse, {...objData, id: dataParse.length + 1}]
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8')    
            console.log(`El id del producto es insertado es: ${dataParse.length + 1}`)
        } catch (error) {
            console.log(error)
        }          
    }
    // devolver el id de un producto
    async getById(id){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            const dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if (producto) {
                console.log(producto)                
            } else {
                console.log('No existe el producto')                
            }
            // return producto
        } catch (error) {
            console.log(error)
        }
    }

    async getByIdRandom(){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')            
            const dataParse = JSON.parse(data)


            let producto = dataParse[ Math.floor(Math.random() * dataParse.length) ]
           
            return producto
        } catch (error) {
            console.log(error)
        }
    }

    // devolver todos los productos
    async getAll(){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            const dataParse = JSON.parse(data)
            // console.log(dataParse)
            return dataParse
        } catch (error) {
            console.log(error)
        }
    }

    // borrar un producto por id
    async deleteById(id){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            const dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if (producto) {
                let arrayProds = dataParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8')    
                console.log(`El producto con id ${id} ha sido borrado`)
            } else {
                console.log('No existe el producto')                
            }
            // return producto
        } catch (error) {
            console.log(error)
        }
    } 

    // borrar todos los productos
    async deleteAll(){
        try {            
            let arrayProds = []
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8')    
            console.log('Todos los productos han sido borrados')
        } catch (error) {
            console.log(error)
        }
    }
    

}

module.exports = Contenedor
