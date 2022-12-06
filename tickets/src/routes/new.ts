import express, {Response, Request} from "express";
import {requireAuth} from "@cool-tickets/common";

const router = express.Router()

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
	res.sendStatus(200)
})

export { router as createTicketRouter}