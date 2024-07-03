import Image from "next/image";
import spinnerImage from "../../public/Images/spinner.gif";

const Loading = () => {
  return (
    <div className="fixed top-0 right-0 h-screen w-screen bg-white  z-50 flex items-center justify-center opacity-60">
      <Image src={spinnerImage} alt="spinner" height={160} width={160} />
    </div>
  );
};

export default Loading;
