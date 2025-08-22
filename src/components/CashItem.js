// import "./CashItem.css";

// const CashItem = ({ type, amount, category, memo, date }) => {
//   const formattedDate = new Date(date).toLocaleDateString();
//   return (
//     <div className="CashItem">
//       <div>{formattedDate}</div>
//       <div className={type === "income" ? "income" : "expense"}>
//         {type === "income" ? "수입" : "지출"}</div>
//       <div>{amount}원</div>
//       <div>{category}</div>
//       <div>{memo}</div>
//     </div>
//   );
// };

// export default CashItem;

import "./CashItem.css";

const CashItem = ({ id, type, amount, category, memo, date, onUpdate }) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="CashItem">
      <div className="header">
        <span className="date">{formattedDate}</span>
        <span className={`type ${type === "income" ? "income" : "expense"}`}>
          {type === "income" ? "수입" : "지출"}
        </span>
      </div>
      <div className="body">
        <div className="amount">{amount.toLocaleString()}원</div>
        <div className="category">{category}</div>
        <div className="memo">{memo}</div>
      </div>
      <button className="update-btn" onClick={() => onUpdate(id)}>수정</button>
    </div>
  );
};

export default CashItem;