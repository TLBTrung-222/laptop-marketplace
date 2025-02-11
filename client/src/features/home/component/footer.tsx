import Image from "next/image"
export default function Footer(){

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return(
    <footer className="flex flex-row row-start-3 gap-6 items-center justify-center bg-[#253B80] p-4 mt-4 ml-0 mr-0 w-full text-[#CBCBCB] bottom-0">
      <div className="flex-col flex justify-between">
        <div>
          <h1 className="text-white mt-2">Company</h1>
          <p>about us</p>
          <p>blog</p>
          <p>returns</p>
          <p>order status</p>
        </div>
        <div>
          <h1 className="text-white mt-2">Info</h1>
          <p>How it works?</p>
          <p>FAQ</p>
        </div>
        <div>
          <h1 className="text-white mt-2">Contact us</h1>
          <div className="flex">
            <Image
              src="/location.ico"
              width={24}
              height={24}
              alt="location"
            />
            <p>123 Main Street, Any Town, VN</p>
          </div>
          <div className="flex">
            <Image
              src="/call-calling.ico"
              width={24}
              height={24}
              alt="call-calling"
            />
            <p>+84 (012) 34-4567</p>
          </div>
          <div className="flex">
            <Image
              src="/sms.ico"
              width={24}
              height={24}
              alt="sms"
            />
            <p>TechHeimSupport@gmail.com</p>
          </div>
        </div> 
        <div>
          <h1 className="text-white mt-2">Sign up for News and updates</h1>
          <div className="flex gap-1">
            <Image
              src="/facebook.ico"
              width={30}
              height={30}
              alt="sms"
            />
            <Image
              src="/twitter.ico"
              width={30}
              height={30}
              alt="sms"
            />
            <Image
              src="/Instagram.ico"
              width={30}
              height={30}
              alt="sms"
            />
            <Image
              src="/Youtube.ico"
              width={30}
              height={30}
              alt="sms"
            />
          </div>
        </div>
        <div className="flex flex-row sm:flex-col justify-between">
          <Image
              src="/online-chat.png"
              width={30}
              height={30}
              alt="sms"
              className="mt-2"
            />
          <Image
              src="/back-to-up.png"
              width={30}
              height={30}
              alt="sms"
              className="hover:cursor-pointer mt-2"
              onClick={handleHomeClick}
            />
        </div>
      </div>
      <div className="copy right"></div>
    </footer>
  )
}