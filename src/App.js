import './App.css';
import Home from './pages/Home';
import Daily from './pages/Daily';
import Add from './pages/Add';
import { Route, Routes } from 'react-router-dom';
import { useReducer, useRef } from "react";

// 데이터 구조는 type, amount, category, memo, date 사용
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state]; // 최신 항목이 위로 오도록
    default:
      return state;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, []); // 모든 가계부 데이터
  console.log("현재 가계부 데이터:", data);
  const idRef = useRef(0); // 고유 ID 생성

  // Add 페이지에서 호출될 함수
  const onCreate = (type, amount, category, memo, date) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        type,       // income/expense
        amount,     // 금액
        category,   // 카테고리
        memo,       // 메모
        date: new Date(date).getTime(), // 타임스탬프
      },
    });
    idRef.current += 1;
  };

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home data={data} />} />
        <Route path='/day/:date' element={<Daily data={data} />} />
        <Route path='/add/:date' element={<Add onCreate={onCreate} />} />
      </Routes>
    </div>
  );
}

export default App;
