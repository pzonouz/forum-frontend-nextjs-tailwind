import Link from "next/link";

const File = ({ data }) => {
  return (
    <Link
      className="text-primary"
      href={`${process.env.BACKEND_URL}/files/download/${data?.filename}`}
    >
      {data?.title}
    </Link>
  );
};

export default File;
