import express from 'express'

const router = express.Router()

router.post('/api/users/signuo', (req, res) => {
	res.send('Hi there')
})

export { router as signupRouter };