import {useState,useEffect} from "react";
import Button from "./Button";
import "./CashList.css";
import {useNavigate} from "react-router-dom";
import CashItem from './CashItem';

const CashList = ({data})=>{
   const navigate=useNavigate();
    const [sortedData, setSortedData] = useState([]);

    useEffect(()=>{
        const sortedList=[...data].reverse();
        setSortedData(sortedList);
    }, [data]);

     const OnClickAdd=()=>{
        navigate("/add");
    };

    return (
    <div className="CashList">
      <div className="menu_wrapper">
        <div className="right_col">
          <Button type={"positive"} text={"소비내역 등록"} onClick={OnClickAdd} />
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