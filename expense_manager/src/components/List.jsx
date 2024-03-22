import { useEffect, useState } from "react";
import Item from "./Item";

export default function List({ arr: updatedArr, changeArr: changeUpdatedArr }) {
  const [arr, changeArr] = useState([]);

  useEffect(() => {
    changeArr(updatedArr);
  }, [updatedArr]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/expense", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // prettier-ignore
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        changeArr(result);
        changeUpdatedArr(result);
        console.log(result);
      } catch (e) {}
    }
    fetchData();
  }, []);

  return (
    <ul className="flex items-center justify-start flex-col w-[100%] h-[83%] bg-black overflow-auto">
      {arr.map((data, index) => (
        <Item
          data={data}
          key={index}
          updatedArr={updatedArr}
          changeUpdatedArr={changeUpdatedArr}
        />
      ))}
    </ul>
  );
}
