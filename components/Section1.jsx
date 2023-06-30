import Image from 'next/image'
import Author from '@/components/child/Author'
import Link from 'next/link'
import fetcher from '@/lib/fetcher';
import Spinner from './child/Spinner';
import Error from './child/Error';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper'
// Import Swiper styles
import 'swiper/css';

const Section1 = () => {

  const {data, isLoading, isError} = fetcher('api/trending')
  if(isLoading) return <Spinner />
  if(isError) return <Error />
  
  SwiperCore.use([Autoplay])

  const bg = {
    background: "url('/images/banner.png') no-repeat",
    backgroundPosition: 'right'
  }

  return (
    <section className='py-16' style={bg}>
        <div className='container mx-auto md:px-20'>
            <h1 className='font-bold text-4xl py-12 text-center'>Trending</h1>

            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2000
                }}
            >
                {
                    data && data.map( (val, i) => (
                        <SwiperSlide key={i}> <Slide data={val}/> </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </section>
  )
}

export default Section1

function Slide({data}){

    const {id, category, img, published, description, title, author} = data

    return(
        <div className='grid md:grid-cols-2 gap-20'>
            <div className="image">
                <Link href={`/posts/${id}`}>
                    <Image src={img || "/"} width={600} height={600} alt='image-one' loading='lazy'/>
                </Link>
            </div>

            <div className="info flex justify-center flex-col">
                <div className="category">
                    <Link href={`/posts/${id}`}><span className='text-orange-600 hover:text-orange-800 px-1'>{category || "Unknown"}</span></Link>
                    <Link href={`/posts/${id}`}><span className='text-gray-800 hover:text-gray-600'>- {published || "Unknown"}</span></Link>
                </div>

                <div className="title">
                    <Link href={`/posts/${id}`}><h2 className='text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600'>{title || "Unknown"}</h2></Link>
                </div>

                <p className='text-gray-500 py-3'>{description || "Unknown"}</p>

                {
                    author ? <Author {...author} /> : <></>
                }
            </div>
        </div>
    )
}