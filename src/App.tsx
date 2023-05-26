import './style.css';
import Grid from './grid';
import dataList from './data.json';
import { useState } from 'react';

function control(today: Date, limit: number) {
  const DAYS:number = 1000 * 60 * 60 * 24;
  const root = document.getElementById("root")!;

  const table = document.getElementById("caseTable") as HTMLTableElement;
  const totalRows = table.querySelectorAll("tbody tr").length;

  const mailReceivedDate = root.getElementsByClassName("mailReceivedDate");
  const solutionSentDate = root.getElementsByClassName("solutionSentDate");

  for (let i = 0; i < totalRows; i++) {
    const receivedDate:string = mailReceivedDate[i].textContent!;
    const sentDate:string = solutionSentDate[i].textContent!;

    const parseReceivedDate = Date.parse(receivedDate);
    const parseSentDate = Date.parse(sentDate);

    let getDiffDays;
    if (!isNaN(parseSentDate)) {
      const diff = Math.abs(parseSentDate - parseReceivedDate);
      getDiffDays = Math.ceil(diff / DAYS);
    }
    else {
      const isNanDiff = Math.abs(today.getTime() - parseReceivedDate);
      getDiffDays = Math.ceil(isNanDiff / DAYS);
    }

    const getCell = table.querySelectorAll("tbody tr")[i] as HTMLTableElement;
    const tdFirst = getCell.getElementsByTagName("td")[0];
    const tdSecond = getCell.getElementsByTagName("td")[1];
    const tdThird = getCell.getElementsByTagName("td")[2];

    if (getDiffDays > limit) {
      tdFirst.style.background = 'red';
      tdSecond.style.background = 'red';
      tdThird.style.background = 'red';
    }
    else {
      tdFirst.style.background = 'white';
      tdSecond.style.background = 'white';
      tdThird.style.background = 'white';
    }
  }
}

export default function App() {
  let sourceProp = dataList;
  
  const [inputLimit, setInputLimit] = useState<number | ''>(5);
  const [inputDate, setInputDate] = useState('2023-05-26');

  const setNewLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = value === '' ? '' : parseInt(value, 10);
    setInputLimit(parsedValue);
    control(new Date(inputDate),inputLimit as number);
  };

  const setNewDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toDateString();
    console.log(formattedDate);
    setInputDate(formattedDate);
    control(new Date(inputDate),inputLimit as number);
  };
  
  return (
    <div>
      <h1>Dgpays Case Study </h1>
      <label>Today:</label>
      <input type='date' value={inputDate} onChange={setNewDate} />
      <label style={{marginLeft: 10}}>Limit:</label>
      <input type='number' value={inputLimit} onChange={setNewLimit} />
      <div style={{marginTop: 20}}>
        <Grid source={sourceProp} />
      </div>
    </div>
  );
}