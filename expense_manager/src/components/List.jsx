import { useEffect, useState } from "react";
import Item from "./Item";
import {
  getPastThreeDaysIST,
  date,
  getDatesOfWeek,
} from "../helperFunctions/date";
import { addExpense } from "../config";

export default function List({
  arr: updatedArr,
  changeArr: changeUpdatedArr,
  search,
  setSearch,
}) {
  const [arr, changeArr] = useState([]);

  useEffect(() => {
    // changeArr(updatedArr);
    const compare = search.filter;
    console.log(compare);

    if (search.filter.searchSelect == "past 3 days") {
      const pastThreeDaysArray = getPastThreeDaysIST();
      const filteredArray = updatedArr.filter((obj) => {
        if (pastThreeDaysArray.includes(date(obj.createdAt))) {
          if (
            (compare.addSelect == "paid" && obj.paid == false) ||
            (compare.addSelect == "unpaid" && obj.paid == true)
          )
            return false;
          if (compare.price && compare.price != obj.price) return false;
          if (
            compare.description &&
            !obj.description
              .toLowerCase()
              .includes(compare.description.toLowerCase())
          )
            return false;
          if (
            compare.title &&
            !obj.title.toLowerCase().includes(compare.title.toLowerCase())
          )
            return false;
          return true;
        }
      });
      changeArr(filteredArray);
      setSearch((prev) => ({ ...prev, arr: filteredArray }));
    } else if (search.filter.searchSelect == "this week") {
      const weekDaysArray = getDatesOfWeek();
      const filteredArray = updatedArr.filter((obj) => {
        if (weekDaysArray.includes(date(obj.createdAt))) {
          if (
            (compare.addSelect == "paid" && obj.paid == false) ||
            (compare.addSelect == "unpaid" && obj.paid == true)
          )
            return false;
          if (compare.price && compare.price != obj.price) return false;
          if (
            compare.description &&
            !obj.description
              .toLowerCase()
              .includes(compare.description.toLowerCase())
          )
            return false;
          if (
            compare.title &&
            !obj.title.toLowerCase().includes(compare.title.toLowerCase())
          )
            return false;
          return true;
        }
      });
      changeArr(filteredArray);
      setSearch((prev) => ({ ...prev, arr: filteredArray }));
    } else if (search.filter.searchSelect == "this month") {
      const today = new Date();
      const month = date(today).substring(3, 5);
      const filteredArray = updatedArr.filter((obj) => {
        if (date(obj.createdAt).substring(3, 5) == month) {
          if (
            (compare.addSelect == "paid" && obj.paid == false) ||
            (compare.addSelect == "unpaid" && obj.paid == true)
          )
            return false;
          if (compare.price && compare.price != obj.price) return false;
          if (
            compare.description &&
            !obj.description
              .toLowerCase()
              .includes(compare.description.toLowerCase())
          )
            return false;
          if (
            compare.title &&
            !obj.title.toLowerCase().includes(compare.title.toLowerCase())
          )
            return false;
          return true;
        }
      });
      changeArr(filteredArray);
      setSearch((prev) => ({ ...prev, arr: filteredArray }));
    } else {
      const filteredArray = updatedArr.filter((obj) => {
        if (
          (compare.addSelect == "paid" && obj.paid == false) ||
          (compare.addSelect == "unpaid" && obj.paid == true)
        )
          return false;
        if (compare.price && compare.price != obj.price) return false;
        if (
          compare.description &&
          !obj.description
            .toLowerCase()
            .includes(compare.description.toLowerCase())
        )
          return false;
        if (
          compare.title &&
          !obj.title.toLowerCase().includes(compare.title.toLowerCase())
        )
          return false;
        return true;
      });
      changeArr(filteredArray);
      setSearch((prev) => ({ ...prev, arr: filteredArray }));
    }
  }, [updatedArr, search.filter]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(addExpense, {
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
