import jwt from "jsonwebtoken";
import request from "supertest";
import {app} from "../app";
import mongoose from "mongoose";

export const signIn = () => {
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: 'test@test.com'
	}

	// Create the JWT
	const token = jwt.sign(payload, process.env.JWT_KEY!)

	const session = {jwt: token}

	const sessionJSON = JSON.stringify(session)

	// Take the JSON and encode it as base64
	const base64 = Buffer.from(sessionJSON).toString('base64')

	// return a string that is the cookie with the encoded data, and put it in a array because of supertest's API
	return [`session=${base64}`]
}