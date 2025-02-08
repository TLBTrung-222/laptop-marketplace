"use client"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, House, KeyRound, Mails, Phone, UserRound } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useGetAccounts } from "@/features/home/api/get-profile";
import { useEditProfile } from "@/features/admin/api/use-update-profile";
import { useGetProfile } from "@/features/admin/api/use-get-profile";
import { toast } from "sonner";
import { useUpdateAvatarImages } from "@/features/accounts/apis/update-avatar";
import { useUploadAvatarImages } from "@/features/accounts/apis/use-create-avatar";


const listIdentificationItems =[
    {
        icon:<UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 items-center" size={18} strokeWidth={1}/>,
        label:"Full name",
        placeholder:"Your full name",
        handleClick: '',
        onClose:'',
        value:''
    },
    {
        icon:<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 items-center" size={18} strokeWidth={1}/>,
        label:"Phone number",
        placeholder:"Your phone name",
        handleClick:'',
        value:''
    },
]

export default function PersonalData(){
    const [fullname, setFullname]=useState("")
    const [isEditFullname, setIsEditFullname] = useState(false);
    const [isEditMail, setIsEditMail] = useState(false);
    const [isEditPhoneNumber, setIsEditPhoneNumber] = useState(false);
    const [isEditAddress, setIsEditAddress] = useState(false);

    const { data } = useGetAccounts();
    if (data){
        listIdentificationItems[0].value=data.name||'';
        listIdentificationItems[1].value=data.phoneNumber||'';
    }

    const handleClick = (type: string)=>{
        if (type === "fullname") setIsEditFullname(true);
        if (type === "emailaddress") setIsEditMail(true);
        if (type === "phonenumber") setIsEditPhoneNumber(true);
        if (type === "address") setIsEditAddress(true);
    }

    const updatedListIdentificationItems = listIdentificationItems.map(item => ({
        ...item,
        handleClick: () => handleClick(item.label.toLowerCase().replace(" ", "")) // Cập nhật handleClick
    }));

    return(
    <div>
        <h1 className="mb-1 font-bold">Indentification</h1>
        <p className="mb-1 text-xs text-gray-400">Verify your identify</p>
        <div className="grid sm:grid-cols-2 gap-2"> 
            <IdentificationItem list={updatedListIdentificationItems}/> 
        </div>
        {isEditFullname&&<EditNameMenu onClose={()=>setIsEditFullname(false)}/>}
        {isEditPhoneNumber&&<EditPhoneNumber onClose={()=>setIsEditPhoneNumber(false)}/>}
        {<EditImage/>}
    </div>
    )
}

const EditImage=()=>{
    const [file, setFile] = useState<File | null>(null);
    const {mutate:updateAvatar} = useUpdateAvatarImages()
    const {mutate:uploadAvatar} = useUploadAvatarImages()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
        setFile(event.target.files[0]);
        }
    };
    const handleSubmit = (event: React.FormEvent)=>{
        event.preventDefault();
        if (!file) {
            toast.error("Please select file!");
            return;
        }
        const formData = new FormData();
        formData.append("avatar", file);
        const avatarPrev = localStorage.getItem("avatar");
        if (avatarPrev) {
            updateAvatar(formData)
        } else{
            uploadAvatar(formData)
        }
    }
    return(
        <div className="flex gap-2 mt-4">
            <form action="/action_page.php">
                <input type="file" id="myFile" name="filename" onChange={handleFileChange}/>
                <Button type="submit" className="mt-2" onClick={handleSubmit}>Upload Avatar</Button>
            </form>
        </div>
    )
}

const IdentificationItem=({list}:{list:any[]})=>{
    return(
        <>
            {
                list.map((item,key)=>{
                    return(
                        <div className="relative mt-8 w-[200px] lg:w-[400px]">
                            <label className="absolute top-0 left-3 transform -translate-y-5 text-gray-400 text-[14px]">{item.label}</label>
                            <div>
                                <div className="relative">
                                    {item.icon}
                                    <div
                                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm text-gray-400"
                                    >
                                        {item.value?item.value:`Your ${item.label.toLocaleLowerCase()}`}
                                    </div>
                                    <Image
                                        src='/edit.png'
                                        width={24}
                                        height={24}
                                        alt={item.label}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5
                                        hover: cursor-pointer"
                                        onClick={()=>item.handleClick(item.label)}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const nameSchema= z.object({
    name: z.string().min(2,{
        message:"First name must be at least 2 characters",
    }).max(50,{
        message:"First name must be at most 50 characters",
    })
})

const EditNameMenu=({onClose}:{onClose:()=>void})=>{
    const formFullName = useForm<z.infer<typeof nameSchema>>({
        resolver: zodResolver(nameSchema),
        defaultValues: {
        name: "",
        },
    })
    
    const {data} = useGetProfile();
    const {mutate} = useEditProfile(data?.id)

    function onSubmit(values: z.infer<typeof nameSchema>) {
        
        if (data){
            mutate({name: values.name})
        }
    }
    
    return(
        <div 
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose}
        >
            <div
            className="bg-white p-6 rounded-lg shadow-lg w-fit lg:w-1/4 relative"
            onClick={(e) => e.stopPropagation()}
            >
                <h5 className="font-bold mb-4">First Name and Last Name</h5>
                <CircleX className="absolute top-6 right-6 hover:text-red-600 cursor-pointer" strokeWidth={1}
                    onClick={onClose}
                />
                <Form {...formFullName}>
                    <form onSubmit={formFullName.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={formFullName.control}
                        name="name"
                        render={({ field }) => (
                            <div className="space-y-2 mx-2">
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Full name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            </div>     
                        )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                    </Form>
            </div>
        </div>
    )
}

const phoneNumber= z.object({
    phoneNumber: z.string().length(10,"Phone number must be exactly 10 characters longs"),
})

const EditPhoneNumber=({onClose}:{onClose:()=>void})=>{
    const formAddress = useForm<z.infer<typeof phoneNumber>>({
        resolver: zodResolver(phoneNumber),
        defaultValues: {
            phoneNumber:"",
        },
    })
    
    const {data} = useGetProfile();
    const {mutate} = useEditProfile(data?.id)

    function onSubmit(values: z.infer<typeof phoneNumber>) {     
        if (data){
            mutate({phoneNumber: values.phoneNumber})
        }
    }

    return(
        <div 
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose}
        >
            <div
            className="bg-white p-6 rounded-lg shadow-lg w-fit lg:w-1/4 relative"
            onClick={(e) => e.stopPropagation()}
            >
                <h5 className="font-bold mb-4">Phone Number</h5>
                <CircleX className="absolute top-6 right-6 hover:text-red-600 cursor-pointer" strokeWidth={1}
                    onClick={onClose}
                />
                <Form {...formAddress}>
                    <form onSubmit={formAddress.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={formAddress.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <div className="space-y-2 mx-2">
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone number" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            </div>     
                        )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}