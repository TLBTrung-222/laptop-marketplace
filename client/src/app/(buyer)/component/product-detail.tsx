"use client"
import { useState } from "react"

export default function ProductDetail({product}:{product:any}){
    const [selectedPart, setSelectedPart]=useState(1)
    
    const handlePartSelect=(index:number)=>{
        setSelectedPart(index)
    }
    return(
        <div>
            <div className="flex gap-4 relative mt-6">
                <p className="pl-4 pr-4 border-b-2 hover:border-blue-400 z-10 border-transparent transition-all duration-300 hover:text-blue-600">Technical Details</p>
                <p className="pl-4 pr-4 border-b-2 hover:border-blue-400 z-10 border-transparent transition-all duration-300 hover:text-blue-600">Comments</p>
                <div className="absolute bottom-0 w-[280px] border-b-2 border-gray-300"></div>
            </div>
            
        </div>
    )
}