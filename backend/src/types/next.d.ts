
import type { Session } from "next-auth"

declare module "next/app" {
  type AppProps<P = Record<string, unknown>> = {
    __N_SSG?: boolean
    __N_SSP?: boolean
    pageProps: P & {
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session
    }
  }
}