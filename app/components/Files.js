import File from "./File";

const Files = async (props) => {
  const { className } = props;
  const res = await fetch(`${process.env.BACKEND_URL}/files/collection`, {
    cache: "no-store",
  });
  const data = await res?.json();
  return (
    <div className={className}>
      <h1 className="font-xl text-center p-2">فایلها</h1>
      {data?.map((item) => {
        return <File key={item?.id} data={item} className={className} />;
      })}
    </div>
  );
};

export default Files;
