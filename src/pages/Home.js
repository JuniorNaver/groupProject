import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // 현재 연도와 월 상태
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(new Date().getMonth()); // 0=1월

  // 이번 달의 마지막 날짜
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const daysInMonth = getDaysInMonth(year, month);

  // 이번 달 1일이 무슨 요일인지 (0=일요일, 6=토요일)
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

  // 달력에 들어갈 "칸"들 만들기 (앞쪽 빈칸 + 날짜)
  const calendarCells = [
    ...Array.from({ length: firstDayOfWeek }).map((_, i) => (
      <div key={`empty-${i}`} className="day empty"></div>
    )),
    ...Array.from({ length: daysInMonth }, (_, i) => (
      <div
        key={i + 1}
        className="day"
        onClick={() => handleClick(i + 1)}
      >
        {i + 1}
      </div>
    )),
  ];

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>가계부</h1>

      {/* 월 이동 */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span style={{ margin: "0 20px", fontSize: "20px" }}>
          {year}년 {month + 1}월
        </span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      {/* 요일 표시 */}
      <div className="calendar week-header">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 칸 */}
      <div className="calendar">{calendarCells}</div>
    </div>
  );
};

export default Home;