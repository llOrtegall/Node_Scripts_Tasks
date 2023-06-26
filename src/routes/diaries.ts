import express from 'express'
import * as diaryServices from '../services/diaryServices'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithhoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(Number(req.params.id))
  return (diary != null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const { date, weather, visibility, comment } = req.body

    const newDiaryEntry = diaryServices.addDiary({
      date,
      weather,
      visibility,
      comment
    })
    res.json(newDiaryEntry)
  } catch (e) {
    res.status(404)
  }
})

export default router
