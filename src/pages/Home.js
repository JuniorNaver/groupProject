import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // 현재 연도와 월 상태
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(new Date().getMonth()); // 0=1월

  // 💰 날짜별 내역 데이터 (예시)
  const transactions = {
    "2025-8-1": { income: 40170, expense: 75240 },
    "2025-8-4": { income: 2240, expense: 10900 },
    "2025-8-5": { income: 1020, expense: 15700 },
    "2025-8-6": { income: 50000, expense: 0 },
    "2025-8-10": { income: 0, expense: 455600 },
    "2025-8-18": { income: 200140, expense: 126900 },
  };

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
    navigate(`/day/${year}-${month + 1}-${day}`);
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
      const key = `${year}-${month + 1}-${day}`;
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
              {tx.transfer > 0 && (
                <div className="transer">-{tx.transfer.toLocaleString()}</div>
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