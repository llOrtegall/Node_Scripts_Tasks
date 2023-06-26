import { NewDiaryEntry, Weather } from './types'

// TODO: Validaciones de tipo
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}
const isString = (string: string): boolean => {
  return typeof string === 'string' // || string instanceof String
}

// TODO: Validaciones del request body
const parseComment = (commentFromRequest: any): string => {
  if (!isString(commentFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }

  return commentFromRequest
}

const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date')
  }
  return dateFromRequest
}

const parseWeater = (weaterFromRequest: any): Weather => {

}

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment),
    date: parseDate(object.date)
  }
}
export default toNewDiaryEntry
