const ErrorComponent = (props) => {
  const { error } = props;
  return (
    <div className=" absolute h-3/4 w-full bg-white  z-50 flex items-center justify-center opacity-60">
      <p className="error text-3xl">{error}</p>
    </div>
  );
};

export default ErrorComponent;
