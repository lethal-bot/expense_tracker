import AddExpenseForm from "./AddExpenseForm";
import FooterExpenseSum from "./FooterExpenseSum";
import List from "./List";
import SearchExpenseForm from "./SearchExpenseForm";

export default function Table({ arr, changeArr }) {
  return (
    <div className="relative w-full h-[600px] bg-[#071355] rounded-xl mt-4">
      <SearchExpenseForm />
      <List arr={arr} changeArr={changeArr} />
      <FooterExpenseSum arr={arr} changeArr={changeArr} />
    </div>
  );
}
