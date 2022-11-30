import type { NextPage } from 'next'
import axios from 'axios'

const Home: NextPage = ({currentUser}: any) => {

    console.log(currentUser)
    return (
    <>
      <h2>Landing page</h2>
    </>
  )
}

Home.getInitialProps = async () => {
    if (typeof window === 'undefined') {
        // we are on the server
        // requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local....
        const {data} = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.cluster.local/api/users/currentuser',
            {
                headers: {
                    Host: 'ticketing.dev'
                }
            }
        )

        return data

    } else {
        // we are on the browser/client-side!
        // we come here only when we get redirected to this page from the same website!
        // requests can be made with a base url of ''
        const {data} = await axios.get('/api/users/currentuser')
        return data;
    }


}


export default Home
