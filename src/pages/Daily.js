
import {useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import CashList from "../components/CashList";
import { FaChevronLeft } from "react-icons/fa";

const Daily=({data})=>{
  
    const { date } = useParams();
    const navigate = useNavigate();

    const[filteredData, setFilteredData]=useState([]);


     useEffect(() => {
     const result = data.filter((it) => {
      const itemDate = new Date(it.date).toISOString().slice(0, 10); // yyyy-mm-dd
      return itemDate === date;
    });
    setFilteredData(result);
  }, [date, data]);

  const handleAdd = () =>{
    navigate(`/add/${date}`);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
     <Header
        title={`${date} 상세 페이지`}
        leftChild={
          <Button
            text={<FaChevronLeft size={15} />}
            type={"icon"}
            onClick={() => navigate(-1)}
          />
        }

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