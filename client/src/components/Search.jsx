import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = ({ setSearching, search }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearching(value);
  };

  return (
    <div
      className={`mt-2 max-w-[55%] min-w-[55%] flex items-center bg-slate-100 rounded-md px-2 focus-within:ring-2 focus-within:ring-blue-400 ease-in-out duration-200 ${
        isFocused ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <IoSearch className="text-2xl text-slate-400 mr-2" />
      <input
        type="search"
        name="search"
        className="flex-grow p-2 bg-transparent focus:outline-none"
        placeholder="Хайх..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
};
export default Search;
