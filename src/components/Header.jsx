import React, { useState } from "react";

const Header = ({ setCity }) => {
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    if (e.key == "Enter") {
      setCity(e.target.value);
      setValue("");
    }
  };

  return (
    <header className="w-[90%] lg:w-[30%] md:w-[50%] mx-auto mt-10">
      <input
        type="text"
        className="h-[45px] w-full shadow-md rounded-md pl-3 transition-all duration-200 focus:transition-all outline-none text-lg border focus:border-indigo-600"
        placeholder="Type City"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleSearch}
      />
    </header>
  );
};

export default Header;
