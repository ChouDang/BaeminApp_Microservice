'use client'

import { API_URL } from "@/apis/axiosConfig"
import useApiCatory from "@/app/api/useApiCatory"
import useApiRestaurants from "@/app/api/useApiRestaurants"
import { Card, Col, Pagination, Row, Select, Typography } from "antd"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const { Meta } = Card;

type OptsCategory = (Category & { value: string, label: string })

export default function Home() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const { id } = params || {}
    const { getAllCategory } = useApiCatory()
    const { getRestaurantsByIdCategory } = useApiRestaurants()

    const [select, set_select] = useState("")
    const [lstData, set_lstData] = useState<Restaurant[]>([])
    const [opts, set_opts] = useState<OptsCategory[]>([])
    const [pagi, set_pagi] = useState({
        page: 1,
        size: 9,
        total: 0
    })
    const blockFetch = useRef(false)

    useEffect(() => {
        if (id && !blockFetch.current && searchParams) {
            if (!opts.length) {
                let checkStoreLocal = localStorage.getItem("allCategory")
                if (!!checkStoreLocal) {
                    set_opts([
                        { id: "all", name: "Tất cả", value: "all", label: 'Tất cả' },
                        ...(JSON.parse(checkStoreLocal).map((x: Category) => ({ ...x, value: x.id, label: x.name })) as OptsCategory[])
                    ])
                } else {
                    getAllCategory().then(resp => resp && Array.isArray(resp) && resp.length
                        && set_opts([{ id: "all", name: "Tất cả", value: "all", label: 'Tất cả' }, ...resp.map(x => ({ ...x, value: x.id, label: x.name })) as OptsCategory[]])
                    )
                }
            }
            getRestaurantsByIdCategory(id as string, pagi.page, pagi.size, (searchParams.get("query") || "") as string).then(i => {
                if (i?.data) {
                    let idata: CustomRestaurant = i.data
                    set_lstData((idata.data || []) as Restaurant[])
                    set_pagi(prev => ({
                        ...prev,
                        total: i.data.totalCount
                    }))
                }
            })
            set_select(id as string)
        }
    }, [id, pagi.page, searchParams])

    return (
        <>
            <div className="flex justify-center p-4">
                <div className="bg-[#DDE7E4] rounded-2xl w-full p-4" style={{
                    minHeight: 500,
                    height: "fit-content"
                }}>
                    <Row className="mb-5">
                        <Select value={select} options={opts} onChange={(vl) => {
                            blockFetch.current = true
                            set_select(vl)
                            set_pagi(prev => ({
                                ...prev,
                                page: 1,
                            }))
                            setTimeout(() => {
                                blockFetch.current = false
                                router.replace('/category/' + vl + (searchParams ? `?query=${encodeURIComponent(searchParams?.get("query") || '')}` : ''))
                            }, 0)
                        }} className="min-w-[200px]" />
                    </Row>
                    <Row wrap={true} className="w-[100%] mb-5" gutter={[32, 32]}>
                        {lstData.length ? lstData.map(i => (<>
                            <Col span={8} >
                                <div className="w-full flex justify-center items-center">
                                    <Card
                                        onClick={() => router.push("/detailfood/" + i.id)}
                                        hoverable
                                        style={{ width: "80%", height: 300 }}
                                        cover={
                                            <img
                                                className="w-[300px] h-[200px] object-cover"
                                                alt="example"
                                                src={API_URL + "/public" + i?.img?.split('public')[1]}
                                            />
                                        }
                                    >
                                        <Meta title={i.name} description={<Typography.Text ellipsis >{i.address}</Typography.Text>} />
                                    </Card>
                                </div>
                            </Col >
                        </>
                        ))
                            : <></>
                        }
                    </Row>
                    <Pagination
                        align="center"
                        pageSize={pagi.size}
                        current={pagi.page}
                        total={pagi.total}
                        onChange={(vl) => set_pagi(prev => ({ ...prev, page: vl }))}
                    />
                </div>
            </div >
        </>
    )
}