import { connect } from 'mongoose'

const DB_URI = `${process.env.DB_URI}`

export const DBInit = async () => {
    await connect(DB_URI)
    console.log('Database connected')
}