const FilePage = async ({ params }) => {
  const { id } = params;
  let file = {};
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/files/${id}`);
    file = await res.json();
  } catch {}
  return (
    <div>
      <div className="mx-auto w-3/4 flex flex-col gap-2">
        <h1 className="font-bold text-2xl mt-12 mx-auto text-pretty">
          {file?.title}
        </h1>
        <a
          className="btn btn-primary mx-auto"
          href={`${process.env.BACKEND_URL}/files/download/${file?.filename}`}
        >
          دانلود
        </a>
      </div>
    </div>
  );
};
export default FilePage;
