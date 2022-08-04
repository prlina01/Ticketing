import {useState} from "react";
import axios from 'axios'
interface UseRequestProps {
	url: string;
	method: string;
	body: {};
}

export default ({url, method, body}: UseRequestProps) => {
	const [errors, setErrors] = useState<JSX.Element|null>(null)
	method = method.toUpperCase()
	const doRequest = async () => {
		let response
		try {
			setErrors(null)
			switch (method) {
				case 'GET':
					response = await axios.get<{}>(url, body)
					break
				case 'POST':
					response = await axios.post<{}>(url, body)
					break
				default:
					response = {}
			}

			return response.data
		} catch (err: any) {
			setErrors(
				<div className="alert alert-danger">
				<h4>Oops....</h4>
				<ul className="my-0">
					{err.response.data.errors.map((err: any) => <li key={err.message}>{err.message}</li>)}
				</ul>
			</div>
			)
		}
	}

	return {doRequest, errors}
}