import { DiaryEntry, NonSensitiveInfoDiaryEntry } from '../types'
import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export const getEntriesWithhoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => diaries

export const addEntry = (): undefined => undefined
