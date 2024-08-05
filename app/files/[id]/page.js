import Link from "next/link";

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
        <h1 className="font-bold text-lg text-center mt-12 mx-auto text-pretty">
          {file?.title}
        </h1>
        <a
          className="btn btn-primary mx-auto"
          href={`${process.env.BACKEND_URL}files/download/${file?.filename}`}
        >
          دانلود
        </a>

        <div className="flex flex-col items-center">
          <div className="mt-4 font-semibold text-lg text-pretty text-center ">
            تخصصی ترین انجمن برق خودرو کاملا رایگان در ایران
          </div>
          <div className="text-pretty text-center mt-4 text-gray-700">
            دسترسی به انبوهی از پرسش ها و پاسخ های مربوطه در زمینه برق خودرو
          </div>
          <Link href={"/"} className="mt-4 text-center text-primary">
            برای مشاهده آخرین سوالات کلیک کنید
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FilePage;
