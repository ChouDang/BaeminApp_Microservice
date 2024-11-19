'use client'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, MouseEventHandler, useState } from "react";
import { useUser } from "../context/UserContext";

const Page: React.FC = () => {
    const router = useRouter();
    const { signUp } = useUser()

    const [status, set_status] = useState<null | boolean>(null)
    const [form, set_form] = useState<Omit<User, 'id' | 'orders'>>({
        firstname: "",
        lastname: "",
        username: "",
        phonenumber: "",
        email: "",
        password: "",
    })

    const handleChange = (value: string, key: string) => {
        set_status(null)
        set_form(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleRes = () => {
        signUp(form).then((res: any) => {
            if (res) {
                set_status(true)
            } else {
                set_status(false)
            }
        })
    }

    return (
        <>
            <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
                <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
                    Đăng Kí
                </div>
                <div className="flex flex-row w-full gap-2">
                    <Input value={form.firstname} placeholder="Họ " className="h-[40px]" onChange={e => handleChange(e.target.value || "", "firstname")} />
                    <Input value={form.lastname} placeholder="Tên" className="h-[40px]" onChange={e => handleChange(e.target.value || "", "lastname")} />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input value={form.username} placeholder="Tên đăng nhập" className="h-[40px]" onChange={e => handleChange(e.target.value || "", "username")} />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input value={form.phonenumber} placeholder="Số điện thoại" className="h-[40px]" onChange={e => handleChange(e.target.value || "", "phonenumber")} />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input value={form.email} placeholder="Email" className="h-[40px]" onChange={e => handleChange(e.target.value || "", "email")} />
                </div>
                <div className="flex flex-col w-full ">
                    <Input.Password
                        placeholder="Mật khẩu"
                        className="h-[40px]"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        value={form.password}
                        onChange={e => handleChange(e.target.value || "", "password")}
                    />
                </div>
                <div className="flex flex-col w-full ">
                    {status == null ? <></> : status ? "Đăng ký thành công" : "Đặng ký thất bạiÏ"}
                </div>

                <div className="flex flex-col w-full">
                    <button className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg" onClick={() => handleRes()}>Đăng ký</button>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-gray-600">Bạn đã có tài khoản?
                    </span>
                    <Link className="text-beamin cursor-pointer" href={"/login"}> Đăng nhập</Link>
                </div>
            </div>
        </>


    );

}
export default Page;