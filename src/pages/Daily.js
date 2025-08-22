import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import CashList from "../components/CashList";
import { FaChevronLeft } from "react-icons/fa";

const Daily = ({ data }) => {
  const { date } = useParams(); // yyyy-mm-dd URL
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });

  useEffect(() => {
    const result = data.filter(item => {
      const itemDate = new Date(item.date).toISOString().slice(0, 10);
      return itemDate === date;
    });
    setFilteredData(result);

  // 지출/수입 누계 계산
    let incomeSum = 0;
    let expenseSum = 0;
    result.forEach(item => {
      if (item.type === "income") incomeSum += Number(item.amount);
      if (item.type === "expense") expenseSum += Number(item.amount);
    });

    setTotals({
      income: incomeSum,
      expense: expenseSum,
      balance: incomeSum - expenseSum
    });
  }, [date, data]);

  // 기존 '소비내역 등록' 버튼
  const handleAdd = () => {
    navigate(`/add/${date}`);
  };

  // 항목 수정 버튼 클릭
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div>
      <Header
        title={`${date}`}
        leftChild={
          <Button text={<FaChevronLeft size={15} />} type={"icon"} onClick={() => navigate("/")} />
        }
      />
      <br/>
      
      <div style={{ display:"flex", flexWrap: "wrap"}}>
        {filteredData.map(item => (
          <div key={item.id} >
            <CashList data={[item]} onUpdate={handleUpdate} /> {/* CashList는 하나짜리 배열로 */}
            {/* <Button type="positive" text="수정" onClick={() => handleUpdate(item.id)} /> */}
          </div>
        ))}
      </div>
        <br/>
      
      <div style={{ display:"flex", justifyContent: "space-around", alignItem: "center",width: "100%", maxWidth: "1200px", margin: "0 auto", fontSize: "clamp(14px, 2vw, 24px)", fontWeight: "bold",backgroundColor: "#ffffff", borderRadius: "30px", padding: "15px 20px",boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
        <div className="total-item income" style={{fontSize: "clamp(14px, 2vw, 24px)"}}>수입: {totals.income.toLocaleString()}원</div>
        <div className="total-item expense"style={{fontSize: "clamp(14px, 2vw, 24px)"}}>지출: {totals.expense.toLocaleString()}원</div>
        <div className="total-item balance"style={{fontSize: "clamp(14px, 2vw, 24px)"}}>잔액: {totals.balance.toLocaleString()}원</div>
      </div>
        <br/>

      <Button type="positive" text="소비내역 등록" onClick={handleAdd} />
    </div>
  );
};

export default Daily;
