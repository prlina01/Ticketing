import axios, {AxiosRequestHeaders} from "axios";
import {NextPageContext} from "next";

export default ({ req }: NextPageContext) => {
	if (typeof window === 'undefined') {
		// we are on the server
		// requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local....

		return axios.create({
			baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			headers: req?.headers as AxiosRequestHeaders
		})
	} else {
		// we are on the browser/client-side!
		// we come here only when we get redirected to this page from the same website!
		// requests can be made with a base url of ''
		return axios.create({
			baseURL: '/'
		})
	}
}