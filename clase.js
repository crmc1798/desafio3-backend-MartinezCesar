const fs = require('fs');
class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }
    async save(Object){
       try {
            try{
                let data = await fs.promises.readFile(`${this.archivo}.txt`, "utf-8"); 
                JSON.parse(data);
            }
            catch{
                await fs.promises.writeFile(`${this.archivo}.txt`,JSON.stringify([],null,2));
            }
            let data = await fs.promises.readFile(`${this.archivo}.txt`, "utf-8");
            if (data ==""){
                try{
                    await fs.promises.writeFile(`${this.archivo}.txt`,JSON.stringify([],null,2));
                    data = await fs.promises.readFile(`${this.archivo}.txt`, "utf-8")
                }
                catch(error){
                    console.log(error);
                }
            }
            const jsondata = JSON.parse(data);
            let id;
            if(jsondata.length == 0){
                id = 1;
            } else {
                id = jsondata[jsondata.length-1].id + 1;
            }
            Object["id"] = id;
            await jsondata.push(Object)
            await fs.promises.writeFile(`${this.archivo}.txt`,JSON.stringify(jsondata,null,2));
            console.log(`Producto guardado, con el numero de id ${id}`)
            }
            
       catch(error){
        console.log("No se pudo agregar el producto")
       }
    }
    async getById(id){
        try{
            let data = await fs.promises.readFile(`${this.archivo}.txt`, "utf-8"); 
            const jsondata = JSON.parse(data); 
            let exist = false
            for (const producto in jsondata){
                if (jsondata[producto].id == id){
                    exist = true
                    return jsondata[producto]
                }
            }
            if(!exist){
                console.log("No se encontró el producto")
                return null
            }
        }
        catch(error){
            console.log("No se pudo buscar el producto", error)
        }
    }
    async getAll(){
        try {
            let data = await fs.promises.readFile(`${this.archivo}.txt`, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            console.log("Error de lectura",error);
        }
    }
    async deleteById(id){
        try{
            let data = await fs.promises.readFile(`${this.archivo}.txt`, "utf-8"); 
            const jsondata = JSON.parse(data); 
            let exist = false
            for (const producto in jsondata){
                if (jsondata[producto].id == id){
                    exist = true
                    jsondata.splice(producto,1)
                    await fs.promises.writeFile(`${this.archivo}.txt`,JSON.stringify(jsondata,null,2));
                    console.log(`Producto con el id ${id} borrado con exito`)
                }
            }
            if(!exist){
                console.log("No se encontró el producto")
                return null
            }
        }
        catch(error){
            console.log("No se pudo borrar", error);
        }
    }
    async deleteAll(){
        try{
            let data = await fs.promises.readFile(`${this.archivo}.txt`, "utf-8"); 
            const jsondata = JSON.parse(data); 
            jsondata.splice(0,jsondata.length)
            await fs.promises.writeFile(`${this.archivo}.txt`,JSON.stringify(jsondata,null,2));
            console.log("Todos los productos fueron borrados")
        }
        catch(error){
            console.log(error);
        }
    }

}
module.exports = {Contenedor}
