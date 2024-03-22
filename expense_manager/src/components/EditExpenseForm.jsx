import { useState, ref } from "react";

export default function EditExpenseForm({ data, modal, changeData }) {
  const [border, setBorder] = useState({
    titleBorderColor: "border-[#3d4884]",
    priceBorderColor: "border-[#3d4884]",
  });

  const [selectValue, changeSelectValue] = useState(
    data.paid == true ? "paid" : "unpaid"
  );

  function handleSelectChange(e) {
    changeSelectValue(e.target.value);
  }

  function closeHandler() {
    modal(false);
  }

  async function submitHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const editedData = Object.fromEntries(fd.entries());
    //logic for changing the border color if no input is provided
    if (editedData.title.length == 0 || editedData.price.length == 0) {
      if (editedData.title.length == 0 && editedData.price.length == 0)
        setBorder({
          titleBorderColor: "border-[#CD2929] border-2",
          priceBorderColor: "border-[#CD2929] border-2",
        });
      else if (editedData.title.length == 0)
        setBorder({
          titleBorderColor: "border-[#CD2929] border-2",
          priceBorderColor: "border-[#3d4884]",
        });
      else
        setBorder({
          titleBorderColor: "border-[#3d4884]",
          priceBorderColor: "border-[#CD2929] border-2",
        });
    } else {
      //self note:= add data to backend
      try {
        const res = await fetch(`http://localhost:3000/expense/${data._id}`, {
          method: "PATCH",
          body: JSON.stringify({ ...editedData }),
          headers: {
            "Content-Type": "application/json",
            // prettier-ignore
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();
        changeData({ ...data, ...editedData });
        modal(false);
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <li className="w-[100%] h-12 p-1  bg-[#071355] border">
      <form
        onSubmit={submitHandler}
        className="w-[100%] h-[100%] flex items-center justify-start"
      >
        <input
          type="text"
          name="title"
          defaultValue={data.title}
          className={`${border.titleBorderColor} w-[25%] h-[80%] bg-[#3D4884]  mx-1 my-2 rounded-lg  border text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center`}
        />
        <input
          type="text"
          name="description"
          defaultValue={data.description}
          className="w-[37%] h-[80%] bg-[#3D4884] border-[#3d4884] mx-1 my-2 rounded-lg  border text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center"
        />
        <input
          type="number"
          name="price"
          min={0}
          defaultValue={data.price}
          className={`${border.priceBorderColor} w-[15%] h-[80%] bg-[#3D4884] border-[#3d4884] mx-1 my-2 rounded-lg  border text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center`}
        />
        <select
          name="paid"
          value={selectValue}
          onChange={handleSelectChange}
          className="w-[10%] h-[80%] bg-[#3D4884] border-[#3d4884] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block text-center"
        >
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <div className="w-[10%] h-[80%] flex items-center justify-evenly">
          <button type="submit" className=" mx-1 my-2 text-center text-lg">
            ✅
          </button>
          <button
            type="button"
            onClick={closeHandler}
            className=" mx-1 my-2  text-center text-lg"
          >
            ❌
          </button>
        </div>
      </form>
    </li>
  );
}
