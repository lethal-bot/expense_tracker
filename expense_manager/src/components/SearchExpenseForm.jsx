import { useEffect, useState } from "react";

export default function SearchExpenseForm({ arr, changeArr }) {
  const [searchData, setSearchData] = useState({
    addSelect: "all",
    searchSelect: "past 3 days",
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    // changeArr((prevArr)=>{

    // })
    console.log("this will run");
  }, [searchData]);

  function changeHandler(value, option) {
    if (option === "addSelect")
      setSearchData((prev) => ({ ...prev, addSelect: value }));
    else if (option === "searchSelect") {
      setSearchData((prev) => ({ ...prev, searchSelect: value }));
    } else if (option === "title") {
      setSearchData((prev) => ({ ...prev, title: value }));
    } else if (option === "description") {
      setSearchData((prev) => ({ ...prev, description: value }));
    } else if (option === "price") {
      setSearchData((prev) => ({ ...prev, price: value }));
    }
  }

  return (
    <form className=" w-[100%] h-12 my-1 p-1 rounded-xl bg-[#071355] flex items-center justify-start ">
      <input
        type="text"
        name="title"
        onChange={(e) => changeHandler(e.target.value, "title")}
        value={searchData.title}
        placeholder={"Search title"}
        className={`w-[25%] h-[80%] mx-1 my-2 rounded-lg  border  bg-[#3D4884] border-[#3d4884]  text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center`}
      />
      <input
        type="text"
        name="description"
        onChange={(e) => changeHandler(e.target.value, "description")}
        value={searchData.description}
        placeholder={"Search description"}
        className={` bg-[#3D4884] border-[#3d4884]  w-[37%] h-[80%] mx-1 my-2 rounded-lg  border text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center`}
      />
      <input
        type="number"
        min={0}
        name="price"
        onChange={(e) => changeHandler(e.target.value, "price")}
        value={searchData.price}
        placeholder={"Search Price"}
        className={` bg-[#3D4884] border-[#3d4884]  w-[15%] h-[80%] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center`}
      />
      <select
        name="paid"
        value={searchData.addSelect}
        onChange={(e) => changeHandler(e.target.value, "addSelect")}
        className={` bg-[#3D4884] border-[#3d4884]  w-[10%] h-[80%] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block text-center`}
      >
        <option value={"all"}>All</option>
        <option value={"paid"}>Paid</option>
        <option value={"unpaid"}>unpaid</option>
      </select>
      <select
        value={searchData.searchSelect}
        onChange={(e) => changeHandler(e.target.value, "searchSelect")}
        name="time"
        className={` bg-[#3D4884] border-[#3d4884]  w-[10%] h-[80%] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block text-center`}
      >
        <option value="past 3 days">Past 3 days</option>
        <option value="this week">This week</option>
        <option value="this month">This Month</option>
        <option value="all">All</option>
      </select>
    </form>
  );
}
