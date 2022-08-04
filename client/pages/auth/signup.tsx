import type { NextPage } from 'next'
import {FormEvent, useState} from "react";
import useRequest from "../../hooks/use-request";

const Signup: NextPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const {doRequest, errors} = useRequest({
		url: '/api/users/signup',
		method: 'post',
		body: {
			email, password
		}
	})

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		await doRequest()
	}

	return (
		<form onSubmit={onSubmit}>
			<h1>Sign up</h1>
			<div className="form-group">
				<label>Email address</label>
				<input value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"/>
			</div>
			{errors}
			<button className="btn btn-primary">Sign up</button>
		</form>
	)
}

export default Signup