"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { ShoppingCart, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    "city":z.string().min(3, "City is required!"),
    "district":z.string().min(3, "District is required!"),
    "street":z.string().min(3,"Street is required!"),
    "detail":z.string().min(3,"Detail is required!"),
    paymentMethod: z.enum(["vnpay", "cod"],{
        required_error: "Please select a payment method",
    })

})

type FormData = z.infer<typeof formSchema>

export default function AddressOrder({data, next, updateAddress}:{data:any,next:()=>void, updateAddress:(data:any)=>void}){
    const [cities, setCities] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [streets, setStreets] = useState<any[]>([]);
    const [dataAdress, setDataAdress] = useState<any[]>([])   

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            city:'',
            district:'',
            detail:'',
            paymentMethod: undefined
        }
    });

    const onSubmit = (data: FormData) => {
        const shippingInfors = {
            city: data.city,
            district: data.district,
            street: `${data.detail} ${data.street}`
        };

        updateAddress((prevAddress: any) => {
            console.log("Previous Address:", prevAddress); // 🔍 Kiểm tra dữ liệu trước khi cập nhật
            const updatedAddress = {
                ...prevAddress,  
                shippingInfors,  
                paymentMethod: data.paymentMethod  
            };
            console.log("Updated Address:", updatedAddress); // 🔍 Kiểm tra dữ liệu sau khi cập nhật
            return updatedAddress; // ✅ Trả về state mới
        });

        next();
    };

    useEffect(() => {
        axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
        .then(
            res =>{
                setCities(res.data.sort((a:any,b:any)=>a.Name.localeCompare(b.Name)))
                setDataAdress(res.data)
            }
        )
        .catch(err => console.error("Lỗi tải dữ liệu:", err));
    }, []);

    // Khi chọn tỉnh, fetch danh sách huyện
    const handleProvinceChange = (provName:string) => {
        form.setValue("city", provName);
        form.setValue("district", ""); // Reset huyện khi chọn tỉnh mới
        setDistricts(dataAdress.find((prov:any)=>prov.Name === provName).Districts.sort((a:any,b:any)=>a.Name.localeCompare(b.Name)))
    };

    // Khi chọn huyện, fetch danh sách đường
    const handleDistrictChange = (distName:string) => {
        form.setValue("district", distName);
        form.setValue("street", ""); // Reset huyện khi chọn tỉnh mới
        setStreets(districts.find((dist:any)=>dist.Name === distName).Wards)
    };

    return(
        <div className="mt-10">
            <div className="flex items-center justify-center">
                <div className="rounded-full border-2 border-blue-400 p-2">
                    <ShoppingCart
                        className=""
                        size={40}
                        color="blue"
                    />
                </div>
                <div className="w-20 h-[1px] bg-blue-400"></div>
                <div className="rounded-full border-2 border-blue-400 p-2">
                    <Truck
                        className=""
                        size={40}
                        color="blue"
                    />
                </div>
                <div className="w-20 h-[1px] bg-gray-400"></div>
                <div className="rounded-full border-2 border-gray-400 p-2">
                    <ShoppingCart
                        className=""
                        size={40}
                        color="gray"
                    />
                </div>
            </div>
            <div className="flex flex-col mt-10 mx-2 justify-center items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City/Province</FormLabel>
                                    {/* <FormControl> */}
                                    <Select defaultValue={field.value} onValueChange={(value)=>handleProvinceChange(value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose city or province" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {cities.map((prov, index) => (
                                                <SelectItem key={index} value={prov.Name}>
                                                    {prov.Name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {/* </FormControl> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>District</FormLabel>
                                    <Select onValueChange={(value)=>handleDistrictChange(value)} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose District" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {districts.map((dist,index) => (
                                                <SelectItem key={index} value={dist.Name}>
                                                    {dist.Name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose Street" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {streets.map((st,index) => (
                                                <SelectItem key={index} value={st.Name}>
                                                    {st.Name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="detail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Detail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Detail" {...field} onChange={(e)=>{field.onChange(e)}}/>
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )
                            }>

                        </FormField>
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem className="mt-10">
                                    <FormLabel className="mt-12 text-blue-600">Payment Method</FormLabel>
                                    <RadioGroup onValueChange={field.onChange}>
                                        <FormControl>
                                            <div className="flex flex-col space-y-2">
                                                <FormItem className="flex items-center space-x-2">
                                                    <input type="radio" value="vnpay" name={field.name} onChange={field.onChange} checked={field.value==="vnpay"}/>
                                                    <FormLabel className="font-normal">VNPay</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2">
                                                    <input type="radio" value="cod" name={field.name} onChange={field.onChange} checked={field.value === "cod"}/>
                                                    <FormLabel className="font-normal">Cash on Delivery (COD)</FormLabel>
                                                </FormItem>
                                            </div>
                                        </FormControl>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                        )}
                        ></FormField>
                        
                        <Button className="mt-2 w-full">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}