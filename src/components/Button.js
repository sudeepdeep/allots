export const Button = ({
  disabled = false,
  text = false,
  handleSubmit = false,
}) => {
  return (
    <div
      onClick={handleSubmit}
      className={`p-3 text-center my-3 text-[#c3073f]   ${
        disabled ? "cursor-wait" : "cursor-pointer"
      }  hover:text-white hover:bg-[#c3073f] rounded-md transition duration-300 ease-in-out`}
    >
      <button disabled={disabled}>{text ? text : "submit"}</button>
    </div>
  );
};
