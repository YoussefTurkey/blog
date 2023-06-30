import Format from "@/layout/format"
import Author from "@/components/_child/Author"
import Image from "next/image"
import Related from "@/components/_child/Related"
import getPost from '@/lib/helper'
import fetcher from "@/lib/fetcher"
import Spinner from "@/components/_child/Spinner"
import Error from "@/components/_child/Error"
import { useRouter } from "next/router"
import { SWRConfig } from "swr"

export default function Page({fallback}){

    const router = useRouter()
    const {postID} = router.query

    const {data, isLoading, isError} = fetcher(`api/posts/${postID}`)
    
    if(isLoading) return <Spinner />
    if(isError) return <Error />

    return(
        <SWRConfig value={{fallback}}>
            <Article {...data} />
        </SWRConfig>
    )
}

function Article({ title, img, subtitle, description, author }) {
  return (
    <Format>
        <div className="container mx-auto md:px-2 py-16 w-1/2">
            <div className="flex justify-center">
                { author ? <Author {...author} /> : <></> }
            </div>

            <div className="post py-10">
                <h2 className="font-bold text-4xl text-center pb-5">{title || "Unknown"}</h2>
                
                <p className="text-gray-500 text-center text-xl">{subtitle || "Unknown"}</p>
                
                <div className="py-10">
                    <Image src={img || "/"} alt="" className="rounded" width={900} height={600} loading="lazy" />
                </div>

                <div className="content text-gray-600 text-lg flex flex-col gap-4">
                    <p>{description || "Unknown"}</p>
                </div>
            </div>

            <Related />
        </div>
    </Format>
  )
}

export async function getStaticProps({params}){
    const posts = await getPost(params.postID)

    return{
        props: {
            fallback: {
                'api/posts': posts
            }
        }
    }
}

export async function getStaticPaths(){
    const posts = await getPost();
    const paths = posts.map(val => {
        return{
            params: {
                postID : val.id.toString()
            }
        }
    })

    return{
        paths,
        fallback: false
    }
}