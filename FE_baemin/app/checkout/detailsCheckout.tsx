import { API_URL_IMG } from "@/apis/axiosConfig";
import Image from "next/image";

export default function DetailsCart({ Details }: {
    Details: any[]
}) {
    return (
        <>
            {Details.map((items, index) => (
                <div className="w-full flex flex-col  bg-white rounded-md ">
                    <div className="ml-10">
                        {items.name}
                    </div>
                    <div className=" w-full border-t border-b border-solid border-gray-600 py-3">
                        {items.foods.map((item: any, index: any) => (
                            <div key={index} className={index === items.foods.length - 1 ? "w-full grid grid-cols-12" : "w-full grid grid-cols-12 border-b border-solid border-x-gray-300"}
                            >
                                <div className="pl-8  col-span-4 flex items-center flex-row gap-3">
                                    <div className="relative h-36 w-36">
                                        <Image layout="fill" objectFit="cover" src={API_URL_IMG + "/public" + item?.img?.split('public')[1]} alt={""} />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <span className="text-base ">{item.name}</span>
                                        <span className="text-sm text-gray-600">{item.description}</span>
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                    <span className="text-[#0288d1] font-bold text-base">{(+item.price).toLocaleString('de-DE')}đ</span>
                                </div>
                                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                    <div className="col-span-2 ml-1 flex items-center" >{item.quantity} </div>
                                </div>
                                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                    <span className="text-[#0288d1] font-bold text-base">{(+item.price * item.quantity).toLocaleString('de-DE')}đ</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
}