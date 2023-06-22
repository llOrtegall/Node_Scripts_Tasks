import express from 'express'

const app = express()
app.use(express.json()) // middleware qye trandforma la req.body a un json

const PORT = 3000

app.get('/ping', (req, res) => {
    console.log('Esta funcionando ¡¡¡')
    req.send('pong')
})

app.listen(PORT)