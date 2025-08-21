import './Add.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { FaChevronLeft } from "react-icons/fa";

const Add = ({ onCreate }) => {
  const navigate = useNavigate();

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  const handleSave = () => {
    if (!amount || !category) {
      alert("금액과 카테고리를 입력해주세요.");
      return;
    }

    onCreate(type, Number(amount), category, memo, date);
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
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    </>
  );
};

export default Add;
