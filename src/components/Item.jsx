import { useEffect, useState } from "react";
import { date } from "../helperFunctions/date";
import EditExpenseForm from "./EditExpenseForm";

export default function Item({
  data: receivedData,
  index,
  updatedArr,
  changeUpdatedArr,
}) {
  const [edit, setEdit] = useState(false);
  const [data, changeData] = useState(receivedData);
  useEffect(() => {
    changeData(receivedData);
  }, [receivedData]);
  if (data.paid == "paid") data.paid = true;
  else if (data.paid == "unpaid") data.paid = false;
  async function selectChangeHandler(e) {
    if (e.target.value == "edit") setEdit(true);
    if (e.target.value == "delete") {
      try {
        const res = await fetch(
          `https://money-manager-cft3.onrender.com/expense/${data._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // prettier-ignore
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        changeUpdatedArr((prevArr) =>
          prevArr.filter((item) => item._id !== data._id)
        );
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      {!edit && (
        <li className="w-[100%] h-12 p-1  bg-[#071355] flex items-center justify-start ">
          <p className="w-[25%] h-[80%]  mx-1 my-2 rounded-lg text-lg block  text-center">
            {data.title}
          </p>
          <p className="w-[37%] h-[80%]  mx-1 my-2 rounded-lg text-lg block  text-center">
            {data.description}
          </p>
          <p className="w-[15%] h-[80%]  mx-1 my-2 rounded-lg text-lg block  text-center">
            {data.price}
          </p>
          <p className="w-[10%] h-[80%]  mx-1 my-2 rounded-lg  text-lg block text-center">
            {data.paid == true ? "paid" : "unpaid"}
          </p>
          <div className="w-[10%] h-[80%] flex justify-around items-center flex-row mx-1 my-2">
            <p className="text-xs w-[30%]">{date(data.createdAt)}</p>
            <select
              name="selectOption"
              onChange={selectChangeHandler}
              value={""}
              className="bg-[#071355] text-xs w-[30%] appearance-none"
            >
              <option value="">...</option>
              <option value="edit">edit</option>
              <option value="delete">delete</option>
            </select>
          </div>
        </li>
      )}
      {edit && (
        <EditExpenseForm data={data} modal={setEdit} changeData={changeData} />
      )}
    </>
  );
}
