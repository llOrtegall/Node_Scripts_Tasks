import { NewDiaryEntry } from './types'

const parseComment = (commentFromRequest: any): string => {
  if (!isString(commentFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }

  return commentFromRequest
}

const isDate = (date: string) {
  return Boolean(Date.parse(date))
}

const isString = (string: string): boolean => {
  return typeof string === 'string' // || string instanceof String
}

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment)
  }
}
export default toNewDiaryEntry
