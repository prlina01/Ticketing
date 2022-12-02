import type { NextPage } from 'next'
import axios from 'axios'
import buildClient from "../api/build-client";

const Home: NextPage = ({currentUser}: any) => {

    console.log(currentUser)
    return (
    <>
      <h2>Landing page</h2>
    </>
  )
}

Home.getInitialProps = async (context) => {
    const client = buildClient(context)
    const { data } = await client.get('/api/users/currentuser')

    return data
}


export default Home
