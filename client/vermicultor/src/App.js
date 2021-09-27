import './App.css';
import  Chart  from 'chart.js/auto'
import { useEffect, useState} from 'react'
import GraphCurrentMonthTemp from './components/GraphCurrentMonthTemp';
import GraphCurrentMonthHumi from './components/GraphCurrentMonthHumi';
import GraphCurrentWeekTemp from './components/GraphCurrentWeekTemp';
import GraphCurrentWeekHumi from './components/GraphCurrentWeekHumi';
import Test from './components/Test';
function App() {

  return (
    <div className="app">
      <div style={{width:'600px'}}>
        <Test></Test>
      </div>
      <div style={{width:'400px'}}>
        <GraphCurrentMonthTemp></GraphCurrentMonthTemp>
        <GraphCurrentMonthHumi></GraphCurrentMonthHumi>
        <GraphCurrentWeekTemp></GraphCurrentWeekTemp>
        <GraphCurrentWeekHumi></GraphCurrentWeekHumi>
      </div>
    </div>
  );
}

export default App;
