import { NewDiaryEntry } from './types'
import { Weather, Visibility } from './enums'

// TODO: Validaciones de tipo
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}
const isString = (string: string): boolean => {
  return typeof string === 'string' // || string instanceof String
}
const isWeather = (param: any): boolean => {
  return Object.values(Weather).includes(param)
}
const isVisibity = (param: any): boolean => {
  return Object.values(Visibility).includes(param)
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
  if (!isString(weaterFromRequest) || !isWeather(weaterFromRequest)) {
    throw new Error('Incorrect or missing Weather')
  }
  return weaterFromRequest
}
const parseVisibility = (VisibilityFromRequest: any): Visibility => {
  if (!isString(VisibilityFromRequest) || !isVisibity(VisibilityFromRequest)) {
    throw new Error('Incorrect or missing visibilty')
  }
  return VisibilityFromRequest
}

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment),
    date: parseDate(object.date),
    weather: parseWeater(object.weather),
    visibility: parseVisibility(object.visibility)
  }
  return newEntry
}
export default toNewDiaryEntry
