const express = require("express")
const uuid = require("uuid")

const app = express()
app.use(express.json())

const orders = []

const checkOrderId = (request, response, next)=> {
    const { id } = request.params
    const index = orders.findIndex(client => client.id === id)
    
    if(index < 0) {
        return response.status(404).json({error: "Order not found"})
    }
    request.orderindex = index
    request.orderId = id

    next()
}

const checkUrl = (request, response, next)=> {
    console.log(request.method)
    console.log(request.url)

    next()
}

app.post("/order", (request, response) =>{

    const { order, clientName, price, status} = request.body
    
    const client = { id: uuid.v4(), order, clientName, price, status}

    orders.push(client)

    return response.status(201).json(client)
})

app.get("/order", (request, response) => {

    return response.json({orders})
})

app.put("/order/:id",checkOrderId, checkUrl, (request, response) => {
    //const { id } = request.params
    //const index = orders.findIndex(client => client.id === id)
    
    /*if(index < 0) {
        return response.status(404).json({error: "Order not found"})
    }*/
    const index = request.orderindex
    const id = request.orderId

    const { order, clientName, price, status } = request.body
    const updateOrder = { id, order, clientName, price, status}
   
    orders[index] = updateOrder

    return response.json(updateOrder)
})

app.delete("/order/:id",checkOrderId, checkUrl, (request, response) => {
   /* const { id } = request.params
    const index = orders.findIndex(client => client.id === id)
    
    if(index < 0) {
        return response.status(404).json({error: "Order not found"})
    }*/
    const index = request.orderindex
    const id = request.orderId
    orders.splice(index,1)
   
    return response.status(204).json()
})

app.get("/order/:id",checkOrderId, checkUrl, (request, response) => {
    /*const { id } = request.params
    const index = orders.findIndex(client => client.id === id)

    if(index < 0) {
        return response.status(404).json({error: "Order not found"})
    }*/
    const index = request.orderindex
    const id = request.orderId
    return response.status(201).json(orders[index])
})

app.patch("/order/:id",checkOrderId, checkUrl, (request, response)=> {
    /*const {id} = request.params
    const index = orders.findIndex(client => client.id === id)

    

    if(index < 0)
    {
        return response.status(404).json({error: "order not found"})
    }*/
    const {order, clientName, price, status} = request.body
    const index = request.orderindex
    const id = request.orderId
    const updateStatus = {id, order:orders[index].order, clientName:orders[index].clientName, price:orders[index].price, status:"Pronto"  }
    orders[index] = updateStatus

return response.json(updateStatus)
    
})






app.listen(3001)