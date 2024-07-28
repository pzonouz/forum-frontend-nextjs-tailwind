import File from "./File";

const Files = async (props) => {
  const { className } = props;
  let files = [];
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/files/collection`, {
      cache: "no-store",
    });
    files = await res?.json();
  } catch (error) {}
  return (
    <div className={className}>
      <h1 className="font-xl text-center font-bold text-lg mt-4">
        آخرین فایلهای اضافه شده
      </h1>
      <div className="flex flex-col px-2">
        {files?.map((item) => {
          return <File key={item?.id} data={item} className={className} />;
        })}
      </div>
    </div>
  );
};

export default Files;
