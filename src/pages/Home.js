import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ data }) => {
  const navigate = useNavigate();

  // 현재 연도와 월 상태
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(new Date().getMonth()); // 0=1월

  // 📌 App에서 받은 data를 날짜별 합산
  const transactions = data.reduce((acc, item) => {
    const dateKey = new Date(item.date).toISOString().slice(0, 10); // YYYY-MM-DD

    if (!acc[dateKey]) {
      acc[dateKey] = { income: 0, expense: 0 };
    }

    if (item.type === "income") {
      acc[dateKey].income += item.amount;
    } else if (item.type === "expense") {
      acc[dateKey].expense += item.amount;
    }

    return acc;
  }, {});

  // 이번 달의 마지막 날짜
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const daysInMonth = getDaysInMonth(year, month);

  // 이번 달 1일의 요일 (0=일요일, 6=토요일)
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // 이전/다음 달 이동
  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  // 날짜 클릭 → 상세 페이지 이동
  const handleClick = (day) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    navigate(`/day/${year}-${formattedMonth}-${formattedDay}`);
  };

  // 달력 칸 구성
  const calendarCells = [
    // 앞쪽 빈칸
    ...Array.from({ length: firstDayOfWeek }).map((_, i) => (
      <div key={`empty-${i}`} className="day empty"></div>
    )),
    // 날짜 + 내역
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const tx = transactions[key];

      return (
        <div
          key={day}
          className="day"
          onClick={() => handleClick(day)}
        >
          <div className="date-num">{day}</div>
          {tx && (
            <div className="transactions">
              {tx.income > 0 && (
                <div className="income">+{tx.income.toLocaleString()}</div>
              )}
              {tx.expense > 0 && (
                <div className="expense">-{tx.expense.toLocaleString()}</div>
              )}
            </div>
          )}
        </div>
      );
    }),
  ];

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>📅 가계부</h1>

      {/* 월 이동 */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span style={{ margin: "0 20px", fontSize: "20px" }}>
          {year}년 {month + 1}월
        </span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      {/* 요일 */}
      <div className="calendar week-header">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="calendar">{calendarCells}</div>
    </div>
  );
};

export default Home;