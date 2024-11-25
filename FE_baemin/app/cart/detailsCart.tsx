import { API_URL_IMG } from "@/apis/axiosConfig";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function DetailsCart({ Details }: {
    Details: any[]
}) {

    const {dispatch} = useCart()

    return (
        <>
            {Details.map((items, index) => (
                <div className="w-full flex flex-col  bg-white rounded-md ">
                    <div className=" flex flex-row my-7 ml-8 items-center gap-3">
                        <span className="text-base font-normal"> {items.name}</span>
                        <div className=" bg-beamin p-1 rounded-md">
                            <span className="text-sm font-normal text-white">
                                Quán đối tác
                            </span>
                        </div>
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
                                    <input type="number" id="quantity" className="w-16 text-center border border-gray-300 rounded" value={item.quantity} min="1" max="100" onChange={(e)=> {
                                        dispatch({
                                            type: "CHANGE_QUANTITY_CART",
                                            payload: {...item , quantity: +e.target.value}
                                        })
                                    }} />

                                </div>
                                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                <span className="text-[#0288d1] font-bold text-base">{(+item.price * item.quantity).toLocaleString('de-DE')}đ</span>
                                </div>
                                <div className="col-span-2 flex items-center justify-center flex-row gap-3"
                                    onClick={()=> {
                                        dispatch({
                                            type: "REMOVE_FROM_CART",
                                            payload: item
                                        })
                                    }}
                                >
                                    <span className=" hover:text-red-600 cursor-pointer">Xóa</span>
                                </div>

                            </div>
                        ))}
                    </div>


                </div>
            ))}



        </>
    )

}