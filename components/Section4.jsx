import Image from "next/image"
import Link from "next/link"
import Author from "./child/author"
import fetcher from '@/lib/fetcher'
import Spinner from "./child/Spinner"
import Error from "./child/Error"

const Section4 = () => {

  const {data, isLoading, isError} = fetcher('api/posts')
  if(isLoading) return <Spinner />
  if(isError) return <Error />

  return (
    <section className='container mx-auto md:px-20 py-16'>
        <div className="grid lg:grid-cols-2">
            <div className="item">
                <h2 className='font-bold text-4xl py-12'>Business</h2>

                <div className="flex flex-col gap-6">
                    {/* posts */}
                    { data[1] ? <Post data={data[1]} /> : <></> }
                    { data[2] ? <Post data={data[2]} /> : <></> }
                    { data[3] ? <Post data={data[3]} /> : <></> }
                </div>
            </div>

            <div className="item">
                <h2 className='font-bold text-4xl py-12'>Travel</h2>

                <div className="flex flex-col gap-6">
                    {/* posts */}
                    { data[4] ? <Post data={data[4]} /> : <></> }
                    { data[5] ? <Post data={data[5]} /> : <></> }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Section4

function Post({data}){

    const {id, category, img, published, title, author} = data

    return(
        <div className='flex gap-5'>
            <div className="image flex flex-col justify-start">
                <Link href={`/posts/${id}`}>
                    <Image src={img || "/"} alt="" className="rounded" width={300} height={250} loading="lazy" />
                </Link>
            </div>

            <div className="info flex flex-col justify-center">
                <div className="category">
                    <Link href={`/posts/${id}`}><span className='text-orange-600 hover:text-orange-800 px-1'>{category || 'Unknown'}</span></Link>
                    <Link href={`/posts/${id}`}><span className='text-gray-800 hover:text-gray-600'>- {published || 'Unknown'}</span></Link>
                </div>

                <div className="title">
                    <Link href={`/posts/${id}`}><h2 className='text-xl font-bold text-gray-800 hover:text-gray-600'>{title || 'Unknown'}</h2></Link>
                </div>

                {
                    author ? <Author {...author} /> : <></>
                }
            </div>
        </div>
    )
}