import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { FaChevronLeft } from "react-icons/fa"

const Add = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header
                title={'지출/수입 등록'}
                leftChild={
                    <Button
                        text={<FaChevronLeft size={15} />}
                        type={"icon"}
                        onClick={() => { navigate(-1) }}
                    />
                }
                rightChild={
                    <Button
                        text={"저장"}
                        type={"positive"}
                        onClick={() => { alert("저장!") }}
                    />
                }
            />
            <div>
                +, -, 금액
            </div>
            <div>
                카테고리 설정
            </div>
            <div>
                메모
            </div>
            <div>
                결제일
            </div>
        </>
    );
};

export default Add;