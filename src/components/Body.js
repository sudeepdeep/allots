const Body = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start items-center justify-center">
      {children}
    </div>
  );
};

export default Body;
