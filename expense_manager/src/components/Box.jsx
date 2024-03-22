export default function Box({ children }) {
  return (
    <div className=" w-[600px] h-[500px] bg-[#071355] border-solid rounded-lg border-[#fff] border">
      {children}
    </div>
  );
}
