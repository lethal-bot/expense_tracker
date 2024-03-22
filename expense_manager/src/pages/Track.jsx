import { useState } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

export default function Track() {
  const [arr, updateArr] = useState([]);
  const changeArr = (temp) => updateArr(temp);
  console.log(arr);
  return (
    <div className="mx-10 ">
      <AddExpenseForm arr={arr} changeArr={changeArr} />
      <Table arr={arr} changeArr={changeArr} />
    </div>
  );
}
