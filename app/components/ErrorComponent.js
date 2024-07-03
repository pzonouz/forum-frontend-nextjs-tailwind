const ErrorComponent = (props) => {
  const { error } = props;
  return (
    <div className="fixed top-0 right-0 h-screen w-screen bg-white  z-50 flex items-center justify-center opacity-60">
      <p className="error text-3xl">{error}</p>
    </div>
  );
};

export default ErrorComponent;
