import express from 'express'

import 'express-async-errors'
import {json} from 'body-parser'


import {errorHandler, NotFoundError, currentUser} from "@cool-tickets/common";
import cookieSession from "cookie-session";
import {createTicketRouter} from "./routes/new";
import {showTicketRouter} from "./routes/show";
import {indexTicketRouter} from "./routes";


const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test' // if true (not a test environment), work only through https
	})
)

app.use(currentUser)
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)



app.get('*', () => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }