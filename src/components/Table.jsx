import { useState } from "react";
import FooterExpenseSum from "./FooterExpenseSum";
import List from "./List";
import SearchExpenseForm from "./SearchExpenseForm";

export default function Table({ arr, changeArr }) {
  const [search, setSearch] = useState({ arr: [], filter: {} });
  return (
    <div className="relative w-full h-[600px] bg-[#071355] rounded-xl mt-4">
      <SearchExpenseForm search={search} setSearch={setSearch} />
      <List
        arr={arr}
        changeArr={changeArr}
        search={search}
        setSearch={setSearch}
      />
      <FooterExpenseSum arr={search.arr} />
    </div>
  );
}
