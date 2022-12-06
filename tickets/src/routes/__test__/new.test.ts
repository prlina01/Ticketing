import request from "supertest";
import {app} from "../../app";
import {signIn} from "../../test/authHelper";
import {Ticket} from "../../models/ticket";

it('has a route handler listening to api/tickets for post request', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.send({})

	expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {
	const response  = await request(app)
		.post('/api/tickets')
		.send({})
		.expect(401)
})

it('returns a status other than 401 if the user is signed in', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', signIn())
		.send()
	expect(response.status).not.toEqual(401)

})

it('returns an error if an invalid title is provided', async () => {
	await request(app)
		.post('/api/tickets')
		.set('Cookie', signIn())
		.send({
			title: '',
			price: 10
		})
		.expect(400)

	await request(app)
		.post('/api/tickets')
		.set('Cookie', signIn())
		.send({
			price: 10
		})
		.expect(400)
})

it('returns an error if an invalid price is provided', async () => {
	await request(app)
		.post('/api/tickets')
		.set('Cookie', signIn())
		.send({
			title: 'Title!',
			price: -10
		})
		.expect(400)

	await request(app)
		.post('/api/tickets')
		.set('Cookie', signIn())
		.send({
			title: 'Title2!'
		})
		.expect(400)
})

it('creates a ticket with valid inputs', async () => {
	let tickets = await Ticket.find({})
	let title = 'Fun Title!'
	expect(tickets.length).toEqual(0)

	await request(app)
		.post('/api/tickets')
		.set('Cookie', signIn())
		.send({
			title,
			price: 20
		})
		.expect(201)

	tickets = await Ticket.find({})
	expect(tickets.length).toEqual(1)
	expect(tickets[0].title).toEqual(title)
	expect(tickets[0].price).toEqual(20)

})