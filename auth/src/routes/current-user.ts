import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
	res.send('Ide bre gas bre')
})

export { router as currentUserRouter };