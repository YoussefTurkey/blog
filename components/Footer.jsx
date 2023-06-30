import { ImWhatsapp, ImBehance, ImLinkedin2 } from "react-icons/im";
import Link from "next/link";
import Newslatter from "./_child/Newslatter";

const Footer = () => {

  const bg = {
    background: "url('/images/footer.png') no-repeat",
    backgroundPosition: 'bottom left',
    backgroundColor: '#f9fafb'
  }

  return (
    <footer className='bg-gray-50' style={bg}>
      <Newslatter />
      <div className="container mx-auto flex justify-center py-12">
        <div className="py-5">
          <div className="flex gap-6 justify-center">
            <Link href={'/'}> <span><ImWhatsapp color="#888" /></span> </Link>
            <Link href={'/'}> <span><ImBehance color="#888" /></span> </Link>
            <Link href={'/'}> <span><ImLinkedin2 color="#888" /></span> </Link>
          </div>

          <p className="py-5 text-gray-400">Copyright ©2022 All rights reserved | This template is made by Youssef Turkey</p>
          <p className="text-center text-gray-400">Terms & Condition</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer