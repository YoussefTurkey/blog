import Image from "next/image"

const Error = () => {
  return (
    <div className="text-center py-10">
        <h2 className="text-3xl font-bold text-orange-600 py-10">Something went wrong...</h2>
        <Image className="w-80 mx-auto" src={'/images/not_found.png'} alt="" width={600} height={600} />
    </div>
  )
}

export default Error