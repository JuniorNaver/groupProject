import "./CashItem.css";

const CashItem = ({ type, amount, category, memo, date }) => {
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <div className="CashItem">
      <div>{formattedDate}</div>
      <div>{type === "income" ? "수입" : "지출"}</div>
      <div>{amount}원</div>
      <div>{category}</div>
      <div>{memo}</div>
    </div>
  );
};

export default CashItem;