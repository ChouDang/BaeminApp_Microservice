'use client'
import { API_URL_IMG } from "@/apis/axiosConfig";
import useApiRestaurants from "@/app/api/useApiRestaurants";
import { useCart } from "@/app/context/CartContext";
import { ClockCircleTwoTone, DollarTwoTone, DoubleRightOutlined, LikeFilled, MinusOutlined, PlusOutlined, SearchOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CustomSelectFood = {
    quantity: number
} & Food

export default function DetailFoodOrder() {
    const params = useParams();
    const { state, dispatch } = useCart()
    const { getRestaurantById } = useApiRestaurants()
    const [selectCategory, set_selectCategory] = useState<string>("all")
    const [restaurantDetail, set_restaurantDetail] = useState<Restaurant | null>(null)
    const [foodFilter, set_foodFilter] = useState<Food[]>([])
    const [category, set_category] = useState<Category[]>([
        { id: "all", name: "Tất cả" }
    ])
    const [search, set_search] = useState("")
    const [select_foods, set_select_foods] = useState<CustomSelectFood[]>([])
    const [totalP, set_totalP] = useState(0)

    const actRemoveDiacritics = (str: string) => {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const onFilterMenuByCategory = (id: string, search: string) => {
        set_selectCategory(id)
        let newLst: Food[] = restaurantDetail?.foods || []
        if (id != "all") {
            newLst = restaurantDetail?.foods?.filter(i => i.category_id === id) || []
        }
        if (search) {
            newLst = newLst.filter(i => actRemoveDiacritics(i.name).includes(actRemoveDiacritics(search)))
        }
        set_foodFilter(newLst)
    }

    const onSelectFood = (food: Food, isReduce: boolean = false) => {
        let fitem = select_foods.find(i => i.id === food.id)
        if (fitem) {
            if (isReduce) {
                return set_select_foods(prev => {
                    if (fitem.quantity == 1) {
                        return [...prev.filter(f => f.id !== food.id)]
                    }
                    return [...prev.map(f => {
                        if (f.id == food.id) {
                            return { ...f, quantity: f.quantity - 1 }
                        }
                        return { ...f }
                    })]
                })
            }
            return set_select_foods(prev => ([...prev.map(f => {
                if (f.id == food.id) {
                    return { ...f, quantity: f.quantity + 1 }
                }
                return { ...f }
            })]))
        } else {
            return set_select_foods(prev => ([...prev, { ...food, quantity: 1 }]))
        }
    }

    const onAddFoodToCard = () => {
        select_foods.forEach(food => {
            dispatch({
                type: "ADD_TO_CART",
                payload: food
            })
        })
        set_select_foods([])
    }

    useEffect(() => {
        if (params?.id) {
            getRestaurantById(params?.id as string).then(resp => {
                if (resp) {
                    let lstCategory: Category[] = []
                    resp.data.foods.forEach(i => {
                        let fitem = lstCategory.find(x => x.id === i.categories.id)
                        if (fitem) { } else {
                            lstCategory.push(i.categories)
                        }
                    })
                    set_restaurantDetail(resp.data)
                    set_foodFilter(resp.data.foods)
                    set_category([...category, ...lstCategory])
                }
            })
        }
    }, [params?.id])

    useEffect(() => {
    }, [search])

    useEffect(() => {
        if (select_foods.length) {
            let allp = 0
            select_foods.forEach(i => {
                allp = allp + (i.price * i.quantity)
            })
            set_totalP(allp)
        } else {
            set_totalP(0)
        }
    }, [select_foods])

    return (
        <>
            <div className="bg-white w-full h-80 flex">
                <div className="w-[45%] h-full py-4 px-10">
                    <div className="w-full relative h-full" >
                        {restaurantDetail?.img &&
                            <Image layout="fill" objectFit="cover" src={API_URL_IMG + "/public" + restaurantDetail?.img?.split('public')[1]} alt="Ga"></Image>
                        }
                    </div>
                </div>
                <div className=" w-[55%] h-full relative">
                    <div className="absolute top-0 left-0 px-8 py-4">
                        <span className="text-[13px] text-[#187CAA]"><a href="">Home</a> <DoubleRightOutlined className="text-[10px]" /> <a href="">TP.HCM</a> <DoubleRightOutlined className="text-[10px]" /> <a href="">{restaurantDetail?.name || ""}</a> </span>
                        <div className="flex flex-row text-[11px] justify-start items-center mt-3">
                            <div className="bg-beamin text-white p-1 mr-2 cursor-pointer tracking-wider flex gap-1">
                                <LikeFilled />
                                <span>Yêu thích</span>
                            </div>
                            <span className="text-[#959595]">QUÁN ĂN - <a href="" className="text-[#0288D1]">Chi nhánh</a></span>
                        </div>
                        <div className="text-[22px] font-bold mt-2">{restaurantDetail?.name}</div>
                        <div className="text-[13px] mt-1">
                            {restaurantDetail?.address}
                        </div>
                        <div className="flex flex-row text-[14px] gap-2 justify-start items-center">
                            <ol className="flex flex-row text-[#FFC107] gap-1">
                                <li><StarFilled /></li>
                                <li><StarFilled /></li>
                                <li><StarFilled /></li>
                                <li><StarFilled /></li>
                                <li><StarOutlined /></li>
                            </ol>
                            <p className="bg-[#FFC107] py-[2px] px-1 text-white rounded-md">999+</p>
                            <span>đánh giá trên Baemin</span>
                        </div>
                        <div className="flex flex-row gap-4 justify-start items-center my-1 text-[15px]">
                            <div className="flex flex-row gap-1 text-[#6CC942] justify-start items-center">
                                <div className="w-2 h-2 bg-[#6CC942] rounded-full"></div>
                                <span>Mở cửa</span>
                            </div>
                            <div className="flex flex-row gap-1 justify-start items-center">
                                <ClockCircleTwoTone twoToneColor={"#3AC5C9"} />
                                <span>06:00 - 22:59</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1 justify-start items-center text-[#959595] text-[15px]">
                            <DollarTwoTone twoToneColor={"#c0c0c0"} className="text-[16px]" />
                            <span> 99.000 - 399.000</span>
                        </div>
                    </div>

                    <div className="w-full flex flex-col absolute bottom-0 left-0 px-8 mb-4 text-[#959595] text-[13px]">
                        <div className="border-t-[1px]"></div>
                        <div className="flex flex-row gap-4 justify-start items-center py-[10px]">
                            <div className="flex flex-col ">
                                <span>PHÍ DỊCH VỤ</span>
                                <span className="text-beamin font-bold text-[14px]">0.8% Phí dịch vụ</span>
                            </div>
                            <div className="border-l border-solid h-6"></div>
                            <div className="flex flex-col">
                                <span>DỊCH VỤ BỞI</span>
                                <span className="text-beamin font-bold text-[14px]">Baemin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="py-[13px] px-[26px] font-bold text-beamin text-[14px]">THỰC ĐƠN</div>
                <div className="w-full flex flex-row gap-3">
                    <div className="w-[20%] bg-white p-5">
                        <ul>
                            {category?.length ? category.map(i => (
                                <>
                                    <li key={i.id} className={`w-full  mt-2 px-1 w-fit ${i.id == selectCategory ? 'bg-[#959595]' : ''}`} onClick={() => onFilterMenuByCategory(i.id, search)} >{i.name || ""}</li>
                                </>
                            )) : <></>}
                        </ul>
                    </div>
                    <div className="w-[50%] h-auto bg-white py-3 flex flex-col px-4">
                        <div className="w-full mb-5">
                            <Input value={search} addonBefore={<SearchOutlined />} placeholder="" onChange={(e) => {
                                set_search(e.target.value as string)
                                onFilterMenuByCategory(selectCategory, e.target.value ? e.target.value : "")
                            }} />
                        </div>
                        <div className="flex flex-col w-full pl-1 gap-3 h-[400px] overflow-hidden overflow-scroll">
                            <div className="flex flex-col w-full gap-4 border-b">

                                {foodFilter.length ? foodFilter.map(food => (<>
                                    <div className="flex flex-row ">
                                        <div className="w-[15%] relative h-16">
                                            <Image layout="fill" objectFit="cover" src={API_URL_IMG + "/public" + food?.img?.split('public')[1]} alt="s" ></Image>
                                        </div>
                                        <div className="w-[60%] flex flex-col gap-1 px-2">
                                            <span className="font-bold text-[#464646] ">{food.name || ""}</span>
                                            <span className="text-wrap text-sm text-[#464646] " >{food.description || ""}</span>
                                        </div>
                                        <div className="w-[15%] flex justify-center items-center">
                                            <span className="text-[#0288d1] font-bold text-base">{(+food.price).toLocaleString('de-DE')}đ</span>
                                        </div>
                                        <div className="w-[10%] flex justify-center items-center">
                                            <div className="h-6 w-6 rounded-md flex justify-center items-center bg-beamin text-white font-bold cursor-pointer hover:brightness-110 " onClick={() => {
                                                onSelectFood(food)
                                            }} ><PlusOutlined /></div>
                                        </div>
                                    </div>

                                </>)) : <></>}

                            </div>
                        </div>
                    </div>
                    <div className="w-[30%] bg-white p-4 mt-3">
                        <h4>Danh sách món ăn đã chọn</h4>
                        <div className="mt-2 flex flex-col w-full pl-1 gap-3 h-[250px] overflow-hidden overflow-scroll">
                            {select_foods.length ? select_foods.map(food => (<>
                                <div className="flex flex-row my-2 ">
                                    <div className="w-[100px] relative h-[64px]">
                                        <Image
                                            src={API_URL_IMG + "/public" + food?.img?.split('public')[1]}
                                            alt={""}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="w-[50%] flex flex-col gap-1 px-2">
                                        <span className="font-bold text-[#464646] ">{food.name || ""}</span>
                                        <span className="text-wrap text-sm text-[#464646] " >{food.description || ""}</span>
                                    </div>
                                    <div className="w-[20%] flex justify-center items-center">
                                        <span className="text-[#0288d1] font-bold text-base">{(+food.price * food.quantity).toLocaleString('de-DE')}đ</span>
                                    </div>
                                    <div className="w-[10%] flex justify-center items-center">
                                        <span className="text-[#0288d1] font-bold text-base">{food.quantity}</span>
                                    </div>
                                    <div className="w-[10%] flex justify-center items-center">
                                        <div className="h-6 w-6 rounded-md flex justify-center items-center bg-beamin text-white font-bold cursor-pointer hover:brightness-110 " onClick={() => {
                                            onSelectFood(food, true)
                                        }} ><MinusOutlined /> </div>
                                    </div>
                                </div>

                            </>)) : <></>}
                        </div>
                        <Row justify={"space-between"}>
                            <Col><h4>Tổng số tiền: </h4></Col>
                            <Col><span className="text-[#0288d1] font-bold text-base">{(totalP ?? 0).toLocaleString('de-DE')}đ</span> </Col>
                        </Row>
                        {select_foods.length ? <div className="flex justify-center mt-3">
                            <Button onClick={() => onAddFoodToCard()}>Thêm vào giỏ hàng</Button>
                        </div> : <></>}

                    </div>

                </div>
            </div>
        </>
    )
}
