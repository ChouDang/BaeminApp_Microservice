import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import { Col, Row } from "antd";
import Menu from "./components/Menu";

export default function Home() {
    return (
        <>
            <Row justify={"space-between"} className="p-4">
                <Col span={4}>
                    <Menu />
                </Col>
                <Col span={20} className="m-t-[82px]" >
                    <ScrollBar />
                    <ScrollFood />
                </Col>
            </Row>
        </>
    )
}