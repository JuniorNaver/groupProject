// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import Header from "../components/Header";
// import CashList from "../components/CashList";
// import { FaChevronLeft } from "react-icons/fa";

// const Daily = ({ data }) => {
//   const { date } = useParams(); // yyyy-mm-dd URL
//   const navigate = useNavigate();

//   const [filteredData, setFilteredData] = useState([]);

//   // URL date와 timestamp 비교
//   useEffect(() => {
//     const result = data.filter((item) => {
//       const itemDate = new Date(item.date).toISOString().slice(0, 10); // yyyy-mm-dd
//       return itemDate === date;
//     });
//     setFilteredData(result);
//   }, [date, data]);

//   const handleAdd = () => {
//     navigate(`/add/${date}`);
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <Header
//         title={`${date} 상세 페이지`}
//         leftChild={
//           <Button
//             text={<FaChevronLeft size={15} />}
//             type={"icon"}
//             onClick={() => navigate(-1)}
//           />
//         }
//       />

//       <CashList data={filteredData} />
//       <Button type="positive" text="소비내역 등록" onClick={handleAdd} />

//       <button onClick={() => navigate(-1)}>← 캘린더로 돌아가기</button>
//     </div>
//   );
// };

// export default Daily;

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

  useEffect(() => {
    const result = data.filter(item => {
      const itemDate = new Date(item.date).toISOString().slice(0, 10);
      return itemDate === date;
    });
    setFilteredData(result);
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
        title={`${date} 상세 페이지`}
        leftChild={
          <Button text={<FaChevronLeft size={15} />} type={"icon"} onClick={() => navigate(-1)} />
        }
      />

      <div>
        {filteredData.map(item => (
          <div key={item.id} style={{ border: "1px solid #ccc", margin: "5px", padding: "5px" }}>
            <CashList data={[item]} onUpdate={handleUpdate} /> {/* CashList는 하나짜리 배열로 */}
            {/* <Button type="positive" text="수정" onClick={() => handleUpdate(item.id)} /> */}
          </div>
        ))}
      </div>
        <br/><br/>

      <Button type="positive" text="소비내역 등록" onClick={handleAdd} />
      <Button
            type="default" 
            text="← 캘린더로 돌아가기"
            onClick={() => navigate(-1)}/>
    </div>
  );
};

export default Daily;
