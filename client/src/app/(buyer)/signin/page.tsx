import Image from "next/image";

export default function SignInHi(){
    return(
        <div className="h-fit bg-blue-400 w-fit rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="">
                <div>
                    <Image
                    src="/product.png"
                    width={300}
                    height={300}
                    alt="Image"
                    />
                </div>
                <div></div>
            </div>
        </div>
    )
}