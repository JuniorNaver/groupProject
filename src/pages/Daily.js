
import {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import CashList from "../components/CashList";

const Daily=({data})=>{
  
    const { date } = useParams();
    const navigate = useNavigate();

    const[filteredData, setFilteredData]=useState([]);
    const[pivotDate, setPivotDate]=useState(new Date());
    const headerTitle= `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`;

     useEffect(() => {
     const result = data.filter((it) => {
      const itemDate = new Date(it.date).toISOString().slice(0, 10); // yyyy-mm-dd
      return itemDate === date;
    });
    setFilteredData(result);
  }, [date, data]);

  const onIncreaseMonth =()=>{
         setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
     };
  const onDecreaseMonth=()=>{
         setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1));
     };
  const handleAdd = () =>{
    navigate(`/add/${date}`);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{date}일 상세 페이지</h1>
      <Header
                 title={headerTitle}
                 leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                 rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
        />

         <CashList data={filteredData} />
      <Button type="positive" text="소비내역 등록" onClick={handleAdd}/>

      <button
        onClick={() => navigate(-1)}
      >
        ← 캘린더로 돌아가기
      </button>
    </div>
  );
};
export default Daily;