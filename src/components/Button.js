import { AnimationLoading } from "./Loading";
import buttonLoading from "../assets/buttonloading.json";

export const Button = ({
  disabled = false,
  text = false,
  handleSubmit = false,
  loading = false,
}) => {
  return (
    <div
      onClick={handleSubmit}
      className={`p-3 text-center relative my-3 text-[#c3073f]   ${
        disabled ? "cursor-wait" : "cursor-pointer"
      }  hover:text-white hover:bg-[#c3073f] rounded-md transition duration-300 ease-in-out`}
    >
      <button disabled={disabled}>{text ? text : "submit"}</button>
      {loading && (
        <div className="absolute z-50 right-0 top-2">
          <AnimationLoading animation={buttonLoading} styles="w-[70px]" />
        </div>
      )}
    </div>
  );
};
