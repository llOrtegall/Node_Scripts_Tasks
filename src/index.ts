import express from 'express'

const app = express()
app.use(express.json()) // middleware qye trandforma la req.body a un json

const PORT = 3000

app.get('/ping', (_req, res) => {
    
    console.log('Esta funcionando ¡¡¡' + new Date().toLocaleDateString())
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`el servidor esta en el puerto, ${PORT}`)
})