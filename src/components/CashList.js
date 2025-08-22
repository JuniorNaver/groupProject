 import {useState,useEffect} from "react";
 import "./CashList.css";
 import CashItem from './CashItem';

 const CashList = ({data})=>{
     const [sortedData, setSortedData] = useState([]);

     useEffect(()=>{
         const sortedList=[...data].reverse();
         setSortedData(sortedList);
     }, [data]);

     return (
     <div className="CashList">
       <div className="menu_wrapper">
         <div className="right_col">
         </div>
       </div>

       <div className="list_wrapper">
         {sortedData.map((it)=>(
                     <CashItem key={it.id}{...it}/>
                 ))}
           </div>
       </div>
   );
 };

 export default CashList;

// import "./CashList.css";
// import CashItem from "./CashItem";

// const CashList = ({ data }) => {
//   if (!data || data.length === 0) {
//     return <div>내역이 없습니다.</div>;
//   }

//   return (
//     <div className="CashList">
//       {data.map((it) => (
//         <CashItem key={it.id} {...it} />
//       ))}
//     </div>
//   );
// };

// export default CashList;