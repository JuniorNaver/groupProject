import './Add.css';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { FaChevronLeft } from "react-icons/fa";

const Add = ({ onCreate }) => {
  // 파라미터로 받은 설정 date
  const { date } = useParams();
  // 파라미터에 전달되지 않았을 때 기본값으로 사용할 today
  const today = new Date().toISOString().substr(0, 10);

  
  const navigate = useNavigate();

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("");
  const [inputDate, setInputDate] = useState(date || today);

  const handleSave = () => {
    if (!amount || !category) {
      alert("금액과 카테고리를 입력해주세요.");
      return;
    }

    onCreate(type, Number(amount), category, memo, inputDate);
    navigate("/");
  };

  return (
    <>
      <Header
        title={"지출/수입 등록"}
        leftChild={
          <Button
            text={<FaChevronLeft size={15} />}
            type={"icon"}
            onClick={() => navigate(-1)}
          />
        }
        rightChild={
          <Button
            text={"저장"}
            type={"positive"}
            onClick={handleSave}
          />
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
          value={date}
          onChange={(e) => setInputDate(e.target.value)}
        />
      </div>
    </>
  );
};

export default Add;
