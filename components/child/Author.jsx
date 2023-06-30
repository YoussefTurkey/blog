import Image from "next/image"
import Link from "next/link"

const Author = ({name, img, designation}) => {

  if(!name && !img) return <></>

  return (
    <div className='author flex py-5'>
        <Image src={img || "/"} width={600} height={600} className="rounded-full w-20" alt="author" loading='lazy'/>

        <div className="flex flex-col justify-center px-4">
            <Link href={'/'}><span className="text-md font-bold text-gray-800 hover:text-gray-600">{name || "Unknown"}</span></Link>
            <span className="text-sm text-gray-500">{designation || "Unknown"}</span>
        </div>
    </div>
  )
}

export default Author