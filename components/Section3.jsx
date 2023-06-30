import {Swiper, SwiperSlide} from "swiper/react"
import Link from "next/link"
import Author from "./child/author"
import Image from "next/image"
import fetcher from '@/lib/fetcher';
import Spinner from './child/Spinner';
import Error from './child/Error';

const Section3 = () => {

  const {data, isLoading, isError} = fetcher('api/popular')
  if(isLoading) return <Spinner />
  if(isError) return <Error />

  return (
    <section className='container mx-auto md:px-20 py-16'>
        <h1 className='font-bold text-4xl py-12 text-center'>Most Popular</h1>

        {/* ---- Swiper ---- */}
        <Swiper
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            }}
        >
            {
                data && data.map( (val, i) => (
                    <SwiperSlide key={i}> <Post data={val}/> </SwiperSlide>
                ))
            }
        </Swiper>
        
    </section>
  )
}

export default Section3

function Post({data}){

    const {id, category, img, published, description, title, author} = data

    return(
        <div className="grid mx-10">
            <div className="images">
                <Link href={`/posts/${id}`}>
                    <Image src={img || '/'} alt="" className="rounded" width={600} height={400} loading="lazy" />
                </Link>
            </div>

            <div className="info flex justify-center flex-col py-4">
                <div className="category">
                    <Link href={`/posts/${id}`}><span className='text-orange-600 hover:text-orange-800 px-1'>{category || "Unknown"}</span></Link>
                    <Link href={`/posts/${id}`}><span className='text-gray-800 hover:text-gray-600'>- {published || "Unknown"}</span></Link>
                </div>

                <div className="title">
                    <Link href={`/posts/${id}`}><h2 className='text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600'>{title || "Unknown"}</h2></Link>
                </div>

                <p className='text-gray-500 py-3'>{description || "Unknown"}</p>

                {
                    author ? <Author {...author} /> : <></>
                }
            </div>
        </div>
    )
} 