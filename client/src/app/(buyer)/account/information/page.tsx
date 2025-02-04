import Image from "next/image";

export default function PersonalData(){
    return(
    <div>
        <h1 className="mb-1 font-bold">Indentification</h1>
        <p className="mb-1 text-xs text-gray-400">Verify your identify</p>
        <div>  
            <div className="relative mt-8">
                <label className="absolute top-0 left-3 transform -translate-y-5 text-gray-400 text-[14px]">Email</label>
                <div>
                    <div className="relative">
                        <Image
                            src='/sms.ico'
                            width={24}
                            height={24}
                            alt='SMS'
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                        <input type="text" placeholder="Enter your text"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                        />
                        <Image
                            src='/sms.ico'
                            width={24}
                            height={24}
                            alt='SMS'
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}