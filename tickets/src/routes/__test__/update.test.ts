import {app} from "../../app";
import mongoose from "mongoose";
import request from "supertest";
import {signIn} from "../../test/authHelper";

it('returns a 404 if the provider id does not exist', async () => {

	const id = new mongoose.Types.ObjectId().toHexString()
	await request(app)
		.put(`/api/tickets.${id}`)
		.set('Cookie', signIn())
		.send({
			title: 'dasdas',
			price: 20
		})
		.expect(404)
})

it('returns a 401 if the provider is not authenticated', async () => {
	const id = new mongoose.Types.ObjectId().toHexString()
	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'dasdas',
			price: 20
		})
		.expect(401)
})

it('returns a 401 if the provider does not own the ticket', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', signIn())
		.send({
			title: 'sdadasd',
			price: 20
		})


	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', signIn())
		.send({
			title: 'dsadasdasd',
			price: 1000
		})
		.expect(401)
})

it('returns a 400 if the user provides an invalid title or price', async () => {

	const cookie = signIn();

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'sdadasd',
			price: 20
		})

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: '',
			price: 20
		})
		.expect(400)

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'dsadsad',
			price: -10
		})
		.expect(400)
})

it('updates the ticket provided valid inputs', async () => {
	const cookie = signIn();

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'sdadasd',
			price: 20
		})

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'new title',
			price: 100
		})
		.expect(200)


	const ticketResponse = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.send()

	expect(ticketResponse.body.title).toEqual('new title')
	expect(ticketResponse.body.price).toEqual(100)
})