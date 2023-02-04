import PoetryInputs from "../components/PoetryInputs"

export default function Home(){
    
    return (
        <>
        <div className="start-page relative h-[80vh] flex flex-col justify-between">
            <PoetryInputs />
            {/* <div className="long-arrow-down mb-10 relative w-[1px] left-4 bg-gray-400 text-gray-400 mt-auto h-24"></div> */}
        </div>
        {/* {
            !loading && 
            <SinglePoem loading={loading} poem={randomPoem} />    
        } */}
        </>
    )
}