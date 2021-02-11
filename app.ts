import express from 'express';

const app = express();
app.use(express.json());

//productos iniciales
let productos: any[] = [
    {id:1,
     title:"cuchara",
     price:12000,
     thumbnail:'www.cuachara.com'
    },
    {id:2,
        title:"cuchillo",
        price:10000,
        thumbnail:'www.cuchillo.com'
       },
       {id:3,
        title:"tenedor",
        price:16000,
        thumbnail:'www.tenedor.com'
       },
];

app.get('/',(req,res)=>{
    res.send('hola mundo, ESTOS SON MIS PRODUCTOS😎👍😝')
});

app.get('/productos',(req,res)=>{
    res.json(productos)
});

app.post('/productos',(req,res)=>{
    const {id, title, price, thumbnail} = req.body
    const producto = {
        id:id,
        title:title,
        price:price,
        thumbnail:thumbnail,
    }
    productos.push(producto)
    res.sendStatus(201)
})


app.get('/productos/:id',(req,res)=>{
    const id = req.params.id
    const producto = productos.find(producto => producto.id === id)
    if (!producto) {
        res.sendStatus(404)
    }
   res.json(producto)
})

//actualizar
app.put('/productos/actualizar/:id',(req,res)=>{
    const id = req.params.id
    const producto = productos.find(producto => producto.id === id);
    if(!producto){
        res.sendStatus(404)
    }
    const { price } = req.body
    producto.price =price
    res.sendStatus(204)
})
//eliminar
app.delete('/productos/:id',(req,res)=>{
      const id = req.params.id
      const producto = productos.find(producto=> producto.id === id)
     if(!producto){
        res.sendStatus(404)
     }
     productos=productos.filter(producto=>producto.id !== id)
     res.sendStatus(200)
     
})



app.listen(5000,()=>console.log('server up'));