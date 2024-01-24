import React from "react";

function Select({
  onChange = false,
  title = false,
  options = false,
  value = false,
}) {
  function handleSectionChange(val) {
    onChange(val);
  }
  return (
    <>
      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium leading-6 text-white"
        >
          {title}
        </label>
        <>
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="block font-normal rounded-md w-full border-0 py-1.5 text-white bg-[#0D1117] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            onChange={(e) => handleSectionChange(e.target.value)}
            value={value}
          >
            {options?.map((option, index) => (
              <option
                key={index}
                value={option.value}
                className="ng-star-inserted"
              >
                {" "}
                {option.name}{" "}
              </option>
            ))}
          </select>
        </>
      </div>
    </>
  );
}

export default Select;
