
import {useState} from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import CashList from "../components/CashList";


const Daily=()=>{
     const[filteredData]=useState([]);
    const[pivotDate, setPivotDate]=useState(new Date());
    const headerTitle= `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`;


    const onIncreaseMonth =()=>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
    };
    const onDecreaseMonth=()=>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1));
    };
    
    return(
        <div>
            <Header
                title={headerTitle}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
        />

        <CashList data={filteredData} />
        </div>
    );
};

export default Daily;