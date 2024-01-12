import { Response } from 'express'

export function handleError(error: unknown, res: Response) {
	if (typeof error === 'object' && error !== null) {
		if ('sqlMessage' in error) {
			return res.status(400).json((error as { sqlMessage: string }).sqlMessage)
		}

		if ('code' in error && error.code === 11000) {
			return res.status(400).json({ message: 'Email already exists' })
		}
	}

	return res.status(500).json({ error })
}