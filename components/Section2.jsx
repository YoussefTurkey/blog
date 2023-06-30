import Link from "next/link"
import Image from "next/image"
import Author from "./child/author"
import fetcher from '@/lib/fetcher'
import Spinner from "./child/Spinner"
import Error from "./child/Error"

const Section2 = () => {

  const {data, isLoading, isError} = fetcher('api/posts')
  if(isLoading) return <Spinner />
  if(isError) return <Error />

  return (
    <section className='container mx-auto md:px-10'>
        <h1 className='font-bold text-4xl py-12 text-center'>Latest Posts</h1>

        {/* ------ Grid Columns ------ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {
                data && data.map( (val, i) => (
                    <Post data={val} key={i}/>
                ))
            }
        </div>
    </section>
  )
}

export default Section2

function Post({data}){

   const {id, category, img, published, subtitle, title, author} = data

    return(
        <div className="item">
            <div className="images">
                <Link href={`/posts/${id}`}>
                    <Image src={img || '/'} alt="" className="rounded" width={500} height={350} loading="lazy" />
                </Link>
            </div>

            <div className="info flex justify-center flex-col py-4">
                <div className="category">
                    <Link href={`/posts/${id}`}><span className='text-orange-600 hover:text-orange-800 px-1'>{category || "Unknown"}</span></Link>
                    <Link href={`/posts/${id}`}><span className='text-gray-800 hover:text-gray-600'>- {published || "Unknown"}</span></Link>
                </div>

                <div className="title">
                    <Link href={`/posts/${id}`}><h2 className='text-xl font-bold text-gray-800 hover:text-gray-600'>{title || "Unknown"}</h2></Link>
                </div>

                <p className='text-gray-500 py-3'>{subtitle || "Unknown"}</p>

                {
                    author ? <Author {...author} /> : <></>
                }
            </div>
        </div>
    )
} 