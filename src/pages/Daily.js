import Button from "../components/Button";
import Header from "../components/Header";

const Daily=()=>{
    return(
        <div>
            <Header
                title={"yyyy년 mm월"}
                leftChild={<Button text={"<"}/>}
                rightChild={<Button text={">"}/>}
            />
        </div>
    );
};

export default Daily;