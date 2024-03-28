import { useEffect, useState } from "react";

export default function FooterExpenseSum({ arr }) {
  const [select, setSelect] = useState("all");
  const [sum, setSum] = useState(0);

  function selectHandler(e) {
    setSelect(e.target.value);
  }

  useEffect(() => {
    let temp = 0;
    if (select === "all paid") {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].paid) temp += arr[i].price;
      }
    } else if (select === "all unpaid") {
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].paid) temp += arr[i].price;
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        temp += arr[i].price;
      }
    }
    setSum(temp);
  }, [select, arr]);

  return (
    <form className="absolute bottom-0 left-0 w-[100%] h-12 flex items-center justify-center ">
      <div className="h-[100%] w-[60%] flex items-center justify-evenly flex-row text-lg">
        <p>sum of </p>
        <select
          name="selectOption"
          value={select}
          onChange={selectHandler}
          className="w-[60%] h-[80%] bg-[#3D4884] border-[#3d4884] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block text-center"
        >
          <option value="all">all entries</option>
          <option value="all paid">all paid entries</option>
          <option value="all unpaid">all unpaid entries</option>
        </select>
        <p>{`${sum}`}</p>
      </div>
    </form>
  );
}
