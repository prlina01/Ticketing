import {app} from "../../app";
import request from "supertest";
import {signIn} from "../../test/authHelper";

const createTicket = () => {
	return request(app)
		.post('/api/tickets')
		.set('Cookie', signIn())
		.send({
			title: 'some title',
			price: 50
		})
}

it('can fetch a list of tickets', async () => {
	await createTicket()
	await createTicket()
	await createTicket()
	await createTicket()

	const response = await request(app)
		.get('/api/tickets')
		.send()
		.expect(200)

	expect(response.body.length).toEqual(3)

})