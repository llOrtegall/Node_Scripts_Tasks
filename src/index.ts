import express from 'express'
import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json()) // middleware qye trandforma la req.body a un json

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('Esta funcionando :D ' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`el servidor esta en el puerto: ${PORT}`)
})
