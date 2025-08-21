
// import {useState} from "react";
// import Button from "../components/Button";
// import Header from "../components/Header";
// import CashList from "../components/CashList";


// const Daily=()=>{
//      const[filteredData]=useState([]);
//     const[pivotDate, setPivotDate]=useState(new Date());
//     const headerTitle= `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`;


//     const onIncreaseMonth =()=>{
//         setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
//     };
//     const onDecreaseMonth=()=>{
//         setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1));
//     };
    
//     return(
//         <div>
//             <Header
//                 title={headerTitle}
//                 leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
//                 rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
//         />

//         <CashList data={filteredData} />
//         </div>
//     );
// };
import { useParams, useNavigate } from "react-router-dom";

const Daily=()=>{
const { date } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{date}일 상세 페이지</h1>
      <p>{date}일에 대한 내용을 여기에 작성하세요.</p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
        onClick={() => navigate(-1)}
      >
        ← 캘린더로 돌아가기
      </button>
    </div>
  );
};
export default Daily;