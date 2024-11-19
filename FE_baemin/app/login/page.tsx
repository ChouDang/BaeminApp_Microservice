'use client'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import React from "react";
import { useUser } from "../context/UserContext";

const Page: React.FC = () => {

    const { login } = useUser()

    const [error, set_error] = React.useState(false)
    const [formLogin, set_formLogin] = React.useState({
        email: "",
        password: ""
    });

    function handleLogin() {
        function actCheckVal(_email: string, _password: string) {
            return Boolean(_email.trim()) && Boolean(_password.trim()) ? login(_email, _password) : set_error(true)
        }
        actCheckVal(formLogin.email, formLogin.password)
    }

    return (
        <>
            <div className="mt-14 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
                <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
                    Đăng Nhập
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input placeholder="Email/Số điện thoại/Tên đăng nhập" className="h-[40px]"
                        value={formLogin?.email ?? ""}
                        onChange={(e) => {
                            set_error(false)
                            set_formLogin(prev => ({
                                ...prev,
                                email: e.target.value
                            }))
                        }} />
                </div>
                <div className="flex flex-col w-full mt-3">
                    <Input.Password
                        placeholder="Mật khẩu"
                        className="h-[40px]"
                        value={formLogin?.password ?? ""}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(e) => {
                            set_error(false)
                            set_formLogin(prev => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className="flex flex-col w-full mt-3">
                    {error && <p>Tài Khoảng hoặc Mật Khẩu không đúng</p>}
                </div>
                <button className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
                    onClick={() => handleLogin()}
                >Đăng Nhập</button>
                <div className="flex items-center justify-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-600">HOẶC</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-gray-600">Bạn mới biết đến Baemin?
                    </span>
                    <Link className="text-beamin cursor-pointer" href={"/register"}> Đăng kí</Link>
                </div>
            </div>
        </>


    );

}
export default Page;