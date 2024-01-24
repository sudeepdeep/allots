import React from "react";

function AlertDialog({
  title = false,
  setDilog = false,
  handleSubmit = false,
}) {
  return (
    <div className="backdrop-blur-lg fixed inset-0 flex items-center justify-center">
      <div className="bg-black text-white p-8 rounded shadow-md">
        <p className="text-lg font-semibold mb-4">Alert!</p>
        <p className="mb-4">{title}</p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              setDilog(false);
              handleSubmit();
            }}
            className="px-4 py-2 bg-[#c3073f] text-white rounded hover:bg-[#c3073fd7]"
          >
            OK
          </button>
          <button
            onClick={() => setDilog(false)}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertDialog;
