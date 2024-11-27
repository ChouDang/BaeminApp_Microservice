import CategoryPaging from "../CategoryPaging";

export default function Home() {
    return (
        <>
            <div className="flex justify-center p-4">
                <div className="bg-[#DDE7E4] rounded-2xl w-full p-4" style={{
                    minHeight: 500,
                    height: "fit-content"
                }}>
                    <CategoryPaging />
                </div>
            </div >
        </>
    )
}