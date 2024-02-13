import { AnimationLoading } from "./Loading";
import buttonLoading from "../assets/buttonloading.json";

export const Button = ({
  disabled = false,
  text = false,
  handleSubmit = false,
  loading = false,
  sx = "",
}) => {
  return (
    <div
      onClick={handleSubmit}
      className={`p-3 text-center relative my-3 flex items-center justify-center  ${
        disabled ? "cursor-wait" : "cursor-pointer"
      }  text-white  hover:bg-[#c3073f] rounded-md transition duration-300 ease-in-out  ${sx}  `}
    >
      <button disabled={disabled}>{text ? text : "submit"}</button>
      {loading && (
        <div className="absolute z-50 right-0 top-0">
          <AnimationLoading animation={buttonLoading} styles="w-[70px]" />
        </div>
      )}
    </div>
  );
};
