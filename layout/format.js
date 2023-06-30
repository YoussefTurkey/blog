import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'

export default function format({children}){
    return(
        <>
            <Head>
                <title>You11 | Blog Website</title>
            </Head>

            <Header />
            <main>{children}</main>
            <Footer />    
        </>
    )
}