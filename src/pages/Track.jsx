import { useEffect, useState } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import NoAuth from "../components/NoAuth";

export default function Track() {
  const [arr, updateArr] = useState([]);
  const changeArr = (temp) => updateArr(temp);
  const verified = localStorage.getItem("verified");
  const token =
    localStorage.getItem("token") == null ||
    localStorage.getItem("token") == "undefined"
      ? false
      : true;
  return verified && token ? (
    <div className="mx-10 ">
      <AddExpenseForm arr={arr} changeArr={changeArr} />
      <Table arr={arr} changeArr={changeArr} />
    </div>
  ) : (
    <NoAuth />
  );
}
