import type { NextPage } from 'next'
import axios from 'axios'
import buildClient from "../api/build-client";

const Home: NextPage = ({currentUser}: any) => {
    return(
        <h1>{currentUser ? 'You are signed in!' : 'You are not signed in'}</h1>
    )
}

Home.getInitialProps = async (context) => {
    console.log('Why don\'t i show up?')
}


export default Home
