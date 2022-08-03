import request from 'supertest'
import {app} from "../../app";

it('returns a 201 on successful signup', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201)
})

it('returns a 400 with an invalid email', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'dasdasdasd',
			password: 'password'
		})
		.expect(400)
})

it('returns a 400 with an invalid password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'dasdasdasd@gmail.com',
			password: 'p'
		})
		.expect(400)
})

it('returns a 400 missing email and password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: '',
			password: 'pdsadasd'
		})
		.expect(400)

	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'dasdasdasd@gmail.com',
			password: ''
		})
		.expect(400)
})


it('disallows duplicate emails', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201)

	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(400)
})

