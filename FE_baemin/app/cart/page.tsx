'use client'

import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { CartItem, useCart } from "../context/CartContext";
import DetailsCart from "./detailsCart";
import { useEffect, useState } from "react";
import useApiRestaurants from "../api/useApiRestaurants";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function Home() {

    const router = useRouter()
    const { state: user } = useUser()
    const { state: { items: foodsCart } } = useCart()
    const { getAllRestaurants } = useApiRestaurants()
    const [lstRes, set_lstRes] = useState<Restaurant[]>([])
    const [lstFoodsOfRestaurent, set_lstFoodsOfRestaurent] = useState<CartItem[]>([])

    useEffect(() => {
        let checkLocalSt = localStorage.getItem("allRestaurants")
        if (checkLocalSt) {
            set_lstRes(JSON.parse(checkLocalSt) as Restaurant[])
        } else {
            getAllRestaurants().then(resp => {
                if (resp) {
                    set_lstRes(resp.data)
                }
            })
        }
    }, [])

    useEffect(() => {
        if (lstRes.length && foodsCart.length) {
            set_lstFoodsOfRestaurent(Object.entries(Object.groupBy(foodsCart, i => i.restaurant_id as string)).map(i => ({
                name: lstRes.find(x => x.id == i[0])?.name || "",
                foods: i[1]
            })) as any)
        }
        if (foodsCart.length == 0) set_lstFoodsOfRestaurent([])
    }, [foodsCart, lstRes])

    return (<>
        <div className="flex flex-row w-full h-20 bg-white ">
            <div className="w-1/2 h-full flex flex-row  items-center gap-3">
                <div className="ml-10 text-4xl  text-beamin font-bold" >
                    <ShoppingCartOutlined />
                </div>
                <div className="text-2xl  text-beamin ">
                    |
                </div>
                <div className="text-3xl  text-beamin font-bold">
                    Giỏ hàng
                </div>
            </div>
            <div className="w-1/2 h-full flex   items-center gap-3">
            </div>
        </div>
        <div className="mt-4 px-16 flex flex-col gap-4  pb-16 rounded-md">
            <DetailsCart Details={lstFoodsOfRestaurent} />
            <div className=" flex flex-row fixed bottom-0  w-[90.6%]  mr-16  h-16 bg-white items-center  " >
                <div className="flex flex-row gap-2 w-1/2 h-full items-center ml-10">
                </div>
                <div className="flex flex-row gap-2 w-1/2 h-full items-center justify-end pr-2">
                    <div className=""> Tổng thanh toán ({foodsCart.length ?? 0} Sản phẩm):
                    </div>
                    <div className="text-red-600" >
                        <span className="text-[#0288d1] font-bold text-base">{(foodsCart.reduce((total: number, item) => {
                            return total += item.price * item.quantity
                        }, 0)).toLocaleString('de-DE')}đ</span>
                    </div>
                    <div>
                        <Button style={{ 'background': '#3AC5C9', color: 'white' }} className="bg-beamin text-white w-40 h-10 rounded-md hover:brightness-105" onClick={() => router.push(user.user?.id ? "/checkout" : "/login")} >
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}