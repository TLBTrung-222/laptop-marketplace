export default async function OrderStatusPage(){
    return(
        <div>
            <h3 className="font-bold">Order History</h3>
            <p></p>
            <div className="flex relative">
                <p className={`p-2`}>Pending</p>
                <p className={`p-2`}>Delivering</p>
                <p className={`p-2`}>Completed</p>
                <div className="bg-gray-400 w-[268px] sm:w-[400px] h-[1px] absolute bottom-0"></div>
            </div>
        </div>
    )
}