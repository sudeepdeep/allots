export const ComboButton = ({ title = false, onClick = false }) => {
  return (
    <>
      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#c3073f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#c3073f]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => onClick(e)}
        >
          {title ? title : "Save"}
        </button>
      </div>
    </>
  );
};
