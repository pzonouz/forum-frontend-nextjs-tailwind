import Link from "next/link";
import File from "./File";
import classNames from "classnames";

const Files = async (props) => {
  const { className } = props;
  let files = [];
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/files/collection/`, {
      cache: "no-store",
    });
    files = await res?.json();
  } catch (error) {}
  return (
    <div className={className}>
      <h2 className="font-xl text-center font-bold text-lg mt-4">
        آخرین فایلهای اضافه شده
      </h2>
      <div className="flex flex-col mt-9 p-4 bg-gray-100 text-md rounded-sm border-y-gray-200 border-[1px]">
        {files?.map((file, index) => (
          <Link
            className={classNames(
              "cursor-pointer text-primary p-4 border-gray-300 border-[1px] hover:text-orange-500 ",
              {
                "bg-gray-300": (index + 1) % 2,
              },
            )}
            href={`files/${file?.id}`}
            key={file?.id}
          >
            {file?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Files;
