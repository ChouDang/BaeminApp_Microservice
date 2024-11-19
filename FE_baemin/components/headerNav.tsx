
'use client'
import { useCart } from '@/app/context/CartContext';
import { useUser } from '@/app/context/UserContext';
import { HomeOutlined, ShoppingCartOutlined, SolutionOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderNav() {
    const { state: carts, dispatch } = useCart();
    const { state: userState, logout } = useUser();
    const pathName = usePathname()
    const router = useRouter();
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        let qr = `?query=${encodeURIComponent(value)}`
        if (pathName?.includes("category")) {
            let id = pathName.split("category/")[1]
            router.replace(`/category/` + id + "/" + qr);
        } else {
            router.push(`/category/all` + qr);
        }
    };
    const navigation = () => {
        router.replace('/')
    }
    return (
        <div className="w-full h-fix bg-white flex flex-row fixed  py-3 gap-4 justify-items-center	justify-between z-50	">
            <div onClick={navigation} className="flex-none w-fit h-full ml-10 cursor-pointer ">
                <svg xmlns="http://www.w3.org/2000/svg" width="131" height="50" viewBox="0 0 131 27">
                    <g fill="#3AC5C9" fillRule="evenodd">
                        <path d="M45 0v27h18v-5.21H50.054v-5.685h8.837v-5.21h-8.837V5.21H63V0zM90 0v5.21h6.948v16.58H90V27h19v-5.21h-6.95V5.21H109V0zM11.86 11.132H5.046V5.21h6.64c1.895 0 2.824 1.162 2.824 2.961 0 1.8-.752 2.96-2.648 2.96m-.177 10.659H5.045V15.869h6.816c1.896 0 2.648 1.161 2.648 2.96 0 1.8-.929 2.96-2.825 2.96M19 8.645v-.947C19 3.434 15.77 0 11.76 0H0v27H11.76C15.769 27 19 23.566 19 19.303v-.947A6.287 6.287 0 0 0 16.74 13.5 6.285 6.285 0 0 0 19 8.644M119.319 0l6.25 16.536c.078.206.375.148.375-.072V0H131v27h-6.32l-6.247-16.526c-.079-.208-.379-.15-.379.073V27H113V0h6.319zM80.506 10.465l-1.702 6.255c-.647 2.379-3.96 2.378-4.606 0l-1.706-6.272c-.059-.216-.372-.173-.372.052V27H67V0h6.282l3.033 11.008c.053.192.32.192.372 0L79.72 0H86v27h-5.118V10.517c0-.228-.317-.271-.376-.052M28.572 16.715l2.742-11.59c.048-.2.326-.2.373 0l2.742 11.59h-5.857zm8.064-12.546a5.257 5.257 0 0 0-1.864-3C33.808.39 32.718 0 31.502 0c-1.244 0-2.342.39-3.293 1.169-.95.779-1.565 1.779-1.844 3L21 27h5.136l1.218-5.143h8.293L36.865 27H42L36.636 4.17z" />
                    </g>
                </svg>
            </div>
            <div className="w-[30%] ">
                <Search
                    placeholder="input search text"
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
            <div className="flex flex-row items-center gap-2 py-2" >

                <Button className="font-normal  leading-5 btn-home	" style={{ fontSize: '18px', height: '100%', color: 'rgb(128, 128, 137)' }} type="text" onClick={navigation} icon={<HomeOutlined />}>Trang Chủ</Button>

                {userState.isLoggedIn ?
                    <>
                        <Button className="font-normal  leading-5 btn-home	" style={{ fontSize: '18px', height: '100%', color: 'rgb(128, 128, 137)' }} type="text">{userState.user?.username}</Button>
                        <Button type="text" style={{ fontSize: '20px', height: '100%', color: '#3AC5C9' }}
                            onClick={() => {
                                logout()
                            }}
                        >
                            Thoát
                        </Button>
                    </>
                    : <Button className="font-normal  leading-5 btn-home	" style={{ fontSize: '18px', height: '100%', color: 'rgb(128, 128, 137)' }} type="text" icon={<SolutionOutlined />} onClick={() => {
                        router.push("/login")
                    }}>Tài Khoản</Button>}

                <Button type="text" style={{ fontSize: '20px', width: '40px', height: '100%', color: '#3AC5C9' }} icon={<ShoppingCartOutlined />} onClick={() => {
                    router.push("/cart")
                }} >
                </Button>

                <span className="text-xs bg-red-600 relative rounded w-full text-white  bottom-3 right-4 text-center" style={{ width: '15px', borderRadius: '50px' }}  >{carts.items?.length ? carts.items.length : 0}</span>



            </div>

        </div>
    );
}
