export default function Button({ children, red, onClick }) {
  let color = "";
  if (red) {
    color = " bg-[#CD2929] hover:bg-[#47020A] focus:ring-[#eb5090] ";
  } else color = " bg-[#95AB3C] hover:bg-[#6b7d23] focus:ring-[#daec8e] ";
  return (
    <button
      onClick={onClick}
      className={`text-white ${color} focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center `}
    >
      {children}
    </button>
  );
}
