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
        {/* {isEditPhoneNumber&&<EditPhoneNumber onClose={()=>setIsEditPhoneNumber(false)}/>} */}
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
    
    function onSubmit(values: z.infer<typeof nameSchema>) {
        console.log(values)
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
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                <FormItem className="space-y-2">
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
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

const addressSchema= z.object({
    address: z.string().min(2,{
        message:"Addressmust be at least 2 characters",
    }).max(50,{
        message:"Address must be at most 50 characters",
    }),
})

const EditAddress=({onClose}:{onClose:()=>void})=>{
    const formFullName = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            address:"",
        },
    })
    
    function onSubmit(values: z.infer<typeof addressSchema>) {
        console.log(values)
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
                        name="address"
                        render={({ field }) => (
                            <div className="space-y-2 mx-2">
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                <FormItem className="space-y-2">
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
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

// const EditPhoneNumber=({onClose}:{onClose:()=>void})=>{
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//         firstname: "",
//         lastname:"",
//         },
//     })
    
//     function onSubmit(values: z.infer<typeof formSchema>) {
//         console.log(values)
//     }
    
//     return(
//         <div 
//         className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//         onClick={onClose}
//         >
//             <div
//             className="bg-white p-6 rounded-lg shadow-lg w-fit lg:w-1/4 relative"
//             onClick={(e) => e.stopPropagation()}
//             >
//                 <h5 className="font-bold mb-4">First Name and Last Name</h5>
//                 <CircleX className="absolute top-6 right-6 hover:text-red-600 cursor-pointer" strokeWidth={1}
//                     onClick={onClose}
//                 />
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                         <FormField
//                         control={form.control}
//                         name="firstname"
//                         render={({ field }) => (
//                             <div className="space-y-2 mx-2">
//                                 <FormItem>
//                                     <FormLabel>First name</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="First name" {...field} />
//                                     </FormControl>
//                                     <FormMessage/>
//                                 </FormItem>
//                                 <FormItem className="space-y-2">
//                                     <FormLabel>Last name</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Last name" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             </div>     
//                         )}
//                         />
//                         <Button type="submit">Submit</Button>
//                     </form>
//                 </Form>
//             </div>
//         </div>
//     )
// }