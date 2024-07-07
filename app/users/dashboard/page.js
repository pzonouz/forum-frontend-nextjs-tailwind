"use client";
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input type="text" className="input" placeholder="نام" />
        <div className="button button_primary">تغییر</div>
      </div>
      <div className="flex gap-2">
        <input type="text" className="input" placeholder="تلفن همراه" />
        <div className="button button_primary">تغییر</div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <textarea className="input" rows={4}></textarea>
        <div className="button button_primary">تغییر</div>
      </div>
    </div>
  );
}
