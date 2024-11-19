'use client'
import useApiPayment from '@/app/api/useApiPayment';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useApiRestaurants from '../../api/useApiRestaurants';
import DetailsCheckout from '../../checkout/detailsCheckout';
import { CartItem } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

const mapToFoodModel = (data: any) => {
    return data.order_food.map((orderItem: any) => {
        const { foods, quantity } = orderItem;
        return {
            id: foods.id,
            name: foods.name,
            description: foods.description,
            price: parseInt(foods.price),
            img: foods.img,
            stock: foods.stock,
            restaurant_id: foods.restaurant_id,
            category_id: foods.category_id,
            quantity: quantity,
            categories: {
                id: foods.category_id,
                name: ""
            },
            order_food: []
        };
    }) as CartItem[];
};

const Page: React.FC = () => {

    const params = useParams()
    const { id } = params || {}
    const { state: user } = useUser()
    const { getAllRestaurants } = useApiRestaurants()
    const { onGetOrder } = useApiPayment()
    const [lstRes, set_lstRes] = useState<Restaurant[]>([])
    const [lstFoodsOfRestaurent, set_lstFoodsOfRestaurent] = useState<CartItem[]>([])
    const [total, set_total] = useState(0)
    const [foodsCart, set_foodsCart] = useState<CartItem[]>([])

    useEffect(() => {
        Boolean(id) && onGetOrder(id).then(resp => resp && set_foodsCart(mapToFoodModel(resp.data)))
        let checkLocalSt = localStorage.getItem("allRestaurants")
        checkLocalSt
            ? set_lstRes(JSON.parse(checkLocalSt) as Restaurant[])
            : getAllRestaurants().then(resp => {
                if (resp) {
                    set_lstRes(resp.data)
                }
            })
    }, [id])

    useEffect(() => {
        if (Boolean(foodsCart.length) && Boolean(lstRes.length)) {
            set_lstFoodsOfRestaurent(Object.entries(Object.groupBy(foodsCart, i => i?.restaurant_id as string)).map(i => ({
                name: lstRes.find(x => x.id == i[0])?.name || "",
                foods: i[1]
            })) as any || [])
            set_total(foodsCart.reduce((total: number, item: any) => {
                return total += item?.price * item?.quantity
            }, 0) || 0)
        }
    }, [foodsCart, lstRes])

    return (
        <>
            <div className="flex flex-row w-full h-20 bg-white ">
                <div className="w-1/2 h-full flex flex-row  items-center gap-3">
                    <div className="ml-10 text-4xl  text-beamin font-bold" >
                        <ShoppingCartOutlined />
                    </div>
                    <div className="text-2xl  text-beamin ">
                        |
                    </div>
                    <div className="text-3xl  text-beamin font-bold">
                        Trình trạng đơn hàng
                    </div>
                </div>
                <div className="w-1/2 h-full flex   items-center gap-3">


                </div>
            </div>
            <div className='grid grid-cols-12 '>
                <div className='col-span-12 pt-3 pl-6 pr-10 flex flex-col gap-2 pb-3 h-full'>
                    <div className='w-full h-[400px] rounded-md'>
                        <div className='w-full h-full relative'>
                            <Image layout="fill" objectFit="inherit" src={'/images/baemin-1.jpg'} alt=''></Image>
                        </div>
                    </div>
                    <div className='w-full  bg-white rounded-md p-4 flex flex-col'>
                        <div className='w-full flex flex-row'>
                            <div className='w-1/3 flex flex-col gap-2'>
                                <div>
                                    <ol>
                                        {lstFoodsOfRestaurent.length && lstFoodsOfRestaurent.map(i => {
                                            return <li>{i.name}</li>
                                        })}
                                    </ol>
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    {(total + 20000).toLocaleString('de-DE')}đ - {foodsCart.length} món - Ví MoMo
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    {user.user?.firstname + " " + user.user?.lastname} - {user.user?.phonenumber}
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col gap-2'>
                                <div>
                                    Giao hàng đến
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    169 Nguyễn Thị Thập, Phường Bình Thuận, Quận 7
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    thời gian hoàn thành: %%:%%
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col  gap-2 pl-5'>
                                <div className='font-medium flex flex-row justify-between '>
                                    <span> Tổng ({foodsCart.length} món):</span>
                                    <span className='text-beamin'>{(total).toLocaleString('de-DE')}d</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between border-t'>
                                    <span> phí giao hàng (1 km):</span>
                                    <span className='text-beamin'>{(20000).toLocaleString('de-DE')}d</span>
                                </div>
                                <div className='text-beamin w-full flex flex-row items-end justify-end text-xl font-medium pr-3 pt-3'>
                                    <span>{(total + 20000).toLocaleString('de-DE')}d</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mt-2 border-t'>
                            <DetailsCheckout Details={lstFoodsOfRestaurent} />
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default Page;