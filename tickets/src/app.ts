import express from 'express'

import 'express-async-errors'
import {json} from 'body-parser'


import {errorHandler, NotFoundError} from "@cool-tickets/common";
import cookieSession from "cookie-session";


const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test' // if true (not a test environment), work only through https
	})
)


app.get('*', () => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }