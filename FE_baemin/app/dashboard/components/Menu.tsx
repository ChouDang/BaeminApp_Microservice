'use client'
import React, { useEffect, useState } from 'react'
import useApiCatory from '@/app/api/useApiCatory'
import { useRouter } from 'next/navigation'

const Menu = () => {
    const router = useRouter()
    const { getAllCategory } = useApiCatory()

    const [items, set_items] = useState<Category[]>([])

    useEffect(() => {
        function onInit() {
            if (!items.length) {
                let checkStoreLocal = localStorage.getItem("allCategory")
                if (!!checkStoreLocal) {
                    set_items(JSON.parse(checkStoreLocal))
                } else {
                    getAllCategory().then(resp => resp && Boolean(resp?.data.length) && set_items(resp.data)
                    )
                }
            }
        }
        onInit()
    }, [])


    return (
        <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3 " style={{ width: 200 }}>
            <span>Thực đơn </span>
            {Array.isArray(items) && items.length ? items?.map((item, index) => (
                <div key={index} className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100" onClick={() => router.push('/category' + "/" + item.id)}>
                    <div className="flex flex-row items-center gap-1">
                        <span>{item.name}</span>
                    </div>
                </div>
            ))
                : <></>}
        </div>
    )
}



export default Menu