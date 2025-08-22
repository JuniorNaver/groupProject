
import { useState, useEffect } from "react";
import "./CashList.css";
import CashItem from './CashItem';

const CashList = ({ data, onUpdate }) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sortedList = [...data].reverse();
    setSortedData(sortedList);
  }, [data]);

  return (
    <div className="CashList">
        {sortedData.map(it => (
          <CashItem key={it.id} {...it} onUpdate={onUpdate} />
        ))}
      </div>
    // </div>
  );
};

export default CashList;