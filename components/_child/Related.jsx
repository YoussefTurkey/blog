import Link from "next/link"
import Author from "@/components/_child/Author"
import Image from "next/image"
import fetcher from "@/lib/fetcher"
import Spinner from "./Spinner"
import Error from "./Error"

const Related = () => {

  const {data, isLoading, isError} = fetcher('api/posts')
  if(isLoading) return <Spinner />
  if(isError) return <Error />

  return (
    <div className='pt-20'>
        <h2 className='font-bold text-4xl py-12'>Related</h2>

        <div className="flex flex-col gap-10">
            {/* posts */}
            {
                data && data.map( (val, i) => <Post data={val} key={i}/> )
            }
        </div>
    </div>
  )
}

export default Related

function Post({data}){

    const {id, category, img, published, title, author} = data

    return(
        <div className='flex gap-5'>
            <div className="image flex flex-col justify-start">
                <Link href={`/posts/${id}`}>
                    <Image src={img || "Unknown"} alt="" className="rounded" width={300} height={250} loading="lazy" />
                </Link>
            </div>

            <div className="info flex flex-col justify-center">
                <div className="category">
                    <Link href={`/posts/${id}`}><span className='text-orange-600 hover:text-orange-800 px-1'>{category || "Unknown"}</span></Link>
                    <Link href={`/posts/${id}`}><span className='text-gray-800 hover:text-gray-600'>- {published || "Unknown"}</span></Link>
                </div>

                <div className="title">
                    <Link href={`/posts/${id}`}><h2 className='text-xl font-bold text-gray-800 hover:text-gray-600'>{title || "Unknown"}</h2></Link>
                </div>

                { author ? <Author {...author} /> : <></> }
            </div>
        </div>
    )
}