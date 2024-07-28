const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-12">درخواست فایل</h1>
      <div className="max-w-sm w-3/4 mx-auto flex flex-col gap-2 mt-6">
        <input
          type="text"
          placeholder="فایل درخواستی"
          className="input input-bordered"
        />
        <div className="btn btn-primary">ثبت</div>
      </div>
    </div>
  );
};

export default Page;
