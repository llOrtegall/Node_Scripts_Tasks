import { DiaryEntry } from '../types'
import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = () => diaries

export const addEntry = () => null
