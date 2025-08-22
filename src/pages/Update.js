import './Add.css';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { FaChevronLeft } from "react-icons/fa";

const Update = ({ data, onUpdate }) => {
    const { id } = useParams(); // id 기준으로 항목 가져오기
    const navigate = useNavigate();

    // 최상단에서 item 찾기
    const item = data.find(it => it.id === Number(id)); // 기존 데이터

    // Hook은 항상 선언
    const [type, setType] = useState(item?.type || "expense");
    const [amount, setAmount] = useState(item?.amount || "");
    const [category, setCategory] = useState(item?.category || "");
    const [memo, setMemo] = useState(item?.memo || "");
    const [inputDate, setInputDate] = useState(
        item ? new Date(item.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
    );

    // item 없으면 안내 메세지
    if (!item) {
        return (
            <>
                <Header
                    title={"수정"}
                    leftChild={
                        <Button text={<FaChevronLeft size={15} />} type={"icon"} onClick={() => navigate(-1)} />
                    }
                    rightChild={
                        <Button text={"수정 불가"} type={"default"} />
                    }
                />
                <div>항목을 찾을 수 없습니다.</div>
            </>
        );
    };


    const handleSave = () => {
        if (!amount || !category) {
            alert("금액과 카테고리를 입력해주세요.");
            return;
        }

        onUpdate(item.id, { type, amount: Number(amount), category, memo, date: inputDate });
        navigate(-1); // 돌아가기
    };

    return (
        <>
            <Header
                title={"수정"}
                leftChild={
                    <Button text={<FaChevronLeft size={15} />} type={"icon"} onClick={() => navigate(-1)} />
                }
                rightChild={
                    <Button text={"수정"} type={"positive"} onClick={handleSave} />
                }
            />

            <div className="AddContainer">
                {/* 수입/지출 선택 버튼 */}
                <div className="typeSelection">
                    <div
                        className={`typeButton ${type === "income" ? "selected income" : ""}`}
                        onClick={() => setType("income")}
                    >
                        수입
                    </div>
                    <div
                        className={`typeButton ${type === "expense" ? "selected expense" : ""}`}
                        onClick={() => setType("expense")}
                    >
                        지출
                    </div>
                </div>

                {/* 금액 */}
                <input
                    type="number"
                    placeholder="금액"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                {/* 카테고리 */}
                <input
                    type="text"
                    placeholder="카테고리"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                {/* 메모 */}
                <input
                    type="text"
                    placeholder="메모"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                />

                {/* 결제일 */}
                <input
                    type="date"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                />
            </div>
        </>
    );
};

export default Update;
