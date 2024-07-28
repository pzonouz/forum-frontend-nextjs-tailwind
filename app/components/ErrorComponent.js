const ErrorComponent = (props) => {
  const { error } = props;
  return (
    <div className=" absolute h-full w-full bg-white text-center  z-50 flex items-center justify-center opacity-60">
      <p className="text-error text-3xl">{error}</p>
    </div>
  );
};

export default ErrorComponent;
