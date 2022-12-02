import 'bootstrap/dist/css/bootstrap.css'

import buildClient from "../api/build-client";
import {AppContext, AppProps} from "next/app";
import Header from "../components/Header";

interface MainPageProps extends AppProps{
    currentUser: any
}

const AppComponent= ({ Component, pageProps, currentUser } : MainPageProps) => {

  return(
      <div>
        <Header currentUser={currentUser}/>
        <Component {...pageProps} />
      </div>
  )
}

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  let pageProps
  if(appContext.Component.getInitialProps)
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)


  return {
    pageProps,
    currentUser: data.currentUser
  }
}

export default AppComponent
