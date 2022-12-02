import 'bootstrap/dist/css/bootstrap.css'

import buildClient from "../api/build-client";
import {AppContext, AppProps} from "next/app";


const AppComponent= ({ Component, pageProps } : AppProps) => {
  return <Component {...pageProps} />
}

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  return data
}

export default AppComponent
