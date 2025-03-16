import React from "react";

const PricingForm: React.FC = () => {
  return (
    <section className="flex p-10 bg-gray-100">
      <div className="w-1/2">
        <h2 className="text-3xl font-bold">Định Giá Xe Thông Minh</h2>
        <p className="text-gray-500">Nhập thông tin để xem giá thị trường</p>
        <form className="mt-4 space-y-4">
          <select className="border p-2 w-full">
            <option>Chọn hãng xe</option>
            <option>Toyota</option>
            <option>Mercedes</option>
          </select>
          <input type="text" placeholder="Năm sản xuất" className="border p-2 w-full" />
          <input type="text" placeholder="Số km đã đi" className="border p-2 w-full" />
          <button className="bg-black text-white px-4 py-2 rounded-md">Định giá ngay</button>
        </form>
      </div>
      <div className="w-1/2">
        <img src="/assets/pricing-image.jpg" alt="AI Pricing" className="rounded-md" />
      </div>
    </section>
  );
};

export default PricingForm;
