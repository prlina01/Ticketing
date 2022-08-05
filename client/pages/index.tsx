import type { NextPage } from 'next'
import axios from 'axios'

const Home: NextPage = ({currentUser}: any) => {
  return (
    <>
      <h2>{currentUser}</h2>
    </>
  )
}

Home.getInitialProps = async () => {
    const response = await axios.get('/api/users/currentuser')

    return response.data;
}


export default Home
