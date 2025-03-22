export const currentUser = {
  id: 1,
  name: "teg",
  profilePic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
}

// export const carData = [
//   { name: "Mercedes C200 2020", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOsQgOKrn_Qf4OMVjI0dU75e_hZlgEiUnKg&s", price: "1.350.000.000", location: "Hà Nội", mileage: "30,000 km" },
//   { name: "BMW 320i 2021", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4FV7NH5iGscFYdp0nBbb7ukveH1baBCRBZugJbO3_XbeIHcEZrbpCan5GaS2_FiAgPb4&usqp=CAU",
//      price: "1.580.000.000", location: "TP.HCM", mileage: "15,000 km" },
//   { name: "Audi A4 2019", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSypYsBJF6fh9HCwVEvZ6atgOOF1dLtxS_akay68LOumkgirGJmiG4dKMKfG5FvvE5GXjk&usqp=CAU", price: "1.220.000.000", location: "Đà Nẵng", mileage: "45,000 km" }
// ];

export const carData = [
  {
    id: 1,
    user_id: 1,
    brand_id: 1, // Toyota
    model_id: 1, // Camry
    version_id: 1, // 2.5Q
    title: "Toyota Camry 2.5Q 2020",
    description: "Chiếc sedan cao cấp, nội thất sang trọng, động cơ êm ái.",
    price: 850000000,
    year: 2020,
    odo: 35000,
    location: "Hà Nội",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_id: 2,
    brand_id: 2, // Honda
    model_id: 2, // Civic
    version_id: 2, // RS
    title: "Honda Civic RS 2022",
    description: "Mẫu sedan thể thao, hiệu suất mạnh mẽ, công nghệ hiện đại.",
    price: 920000000,
    year: 2022,
    odo: 20000,
    location: "TP. Hồ Chí Minh",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    user_id: 3,
    brand_id: 3, // Mazda
    model_id: 3, // CX-5
    version_id: 3, // 2.5 Premium
    title: "Mazda CX-5 2.5 Premium 2021",
    description: "SUV gầm cao, nội thất rộng rãi, trang bị an toàn đầy đủ.",
    price: 780000000,
    year: 2021,
    odo: 40000,
    location: "Đà Nẵng",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    user_id: 4,
    brand_id: 3, // Mazda
    model_id: 3, // CX-5
    version_id: 4, // 2.0 Premium
    title: "Mazda CX-5 2.0 Premium 2022",
    description: "Phiên bản 2.0 tiết kiệm nhiên liệu, trang bị tiện nghi đầy đủ.",
    price: 753000000,
    year: 2022,
    odo: 18000,
    location: "Thanh Hoá",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const brands = [
  { id: 1, name: "Toyota" },
  { id: 2, name: "Honda" },
  { id: 3, name: "Mazda" },
  { id: 4, name: "Ford" },
  { id: 5, name: "Hyundai" },
  { id: 6, name: "Kia" },
  { id: 7, name: "Mercedes-Benz" },
  { id: 8, name: "BMW" },
  { id: 9, name: "Audi" },
];

export const models = [
  { id: 1, brand_id: 1, name: "Camry" },
  { id: 2, brand_id: 1, name: "Corolla Altis" },
  { id: 3, brand_id: 2, name: "Civic" },
  { id: 4, brand_id: 2, name: "City" },
  { id: 5, brand_id: 3, name: "CX-5" },
  { id: 6, brand_id: 3, name: "Mazda 3" },
  { id: 7, brand_id: 4, name: "Everest" },
  { id: 8, brand_id: 4, name: "Ranger" },
  { id: 9, brand_id: 5, name: "Santa Fe" },
  { id: 10, brand_id: 5, name: "Tucson" },
  { id: 11, brand_id: 6, name: "Sorento" },
  { id: 12, brand_id: 6, name: "Seltos" },
  { id: 13, brand_id: 7, name: "C-Class" },
  { id: 14, brand_id: 7, name: "E-Class" },
  { id: 15, brand_id: 8, name: "3-Series" },
  { id: 16, brand_id: 8, name: "X5" },
  { id: 17, brand_id: 9, name: "A4" },
  { id: 18, brand_id: 9, name: "Q7" },
];

export const versions = [
  { id: 1, model_id: 1, name: "2.5Q", year_start: 2019, year_end: 2024, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 2, model_id: 1, name: "2.0G", year_start: 2018, year_end: 2023, origin: "Lắp ráp trong nước", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 3, model_id: 2, name: "1.8G", year_start: 2020, year_end: 2024, origin: "Lắp ráp trong nước", transmission: "Số sàn", fuel_type: "Xăng", seats: 5 },
  { id: 4, model_id: 3, name: "RS", year_start: 2021, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 5, model_id: 3, name: "E", year_start: 2019, year_end: 2023, origin: "Lắp ráp trong nước", transmission: "Số sàn", fuel_type: "Xăng", seats: 5 },
  { id: 6, model_id: 4, name: "1.5L", year_start: 2021, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 7, model_id: 5, name: "2.5 Premium", year_start: 2020, year_end: null, origin: "Lắp ráp trong nước", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 8, model_id: 5, name: "2.0 Luxury", year_start: 2019, year_end: 2023, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 9, model_id: 6, name: "Sport", year_start: 2022, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Hybrid", seats: 5 },
  { id: 10, model_id: 7, name: "Titanium", year_start: 2021, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Diesel", seats: 7 },
  { id: 11, model_id: 8, name: "Wildtrak", year_start: 2020, year_end: null, origin: "Lắp ráp trong nước", transmission: "Tự động", fuel_type: "Diesel", seats: 5 },
  { id: 12, model_id: 9, name: "2.2 Diesel", year_start: 2018, year_end: 2023, origin: "Nhập khẩu", transmission: "Số sàn", fuel_type: "Diesel", seats: 7 },
  { id: 13, model_id: 10, name: "1.6 Turbo", year_start: 2022, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 14, model_id: 11, name: "Premium", year_start: 2021, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 7 },
  { id: 15, model_id: 12, name: "Luxury", year_start: 2020, year_end: null, origin: "Lắp ráp trong nước", transmission: "Tự động", fuel_type: "Xăng", seats: 7 },
  { id: 16, model_id: 13, name: "AMG", year_start: 2021, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 17, model_id: 14, name: "Exclusive", year_start: 2019, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 18, model_id: 15, name: "320i", year_start: 2018, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 19, model_id: 16, name: "M Sport", year_start: 2020, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Xăng", seats: 5 },
  { id: 20, model_id: 17, name: "S Line", year_start: 2021, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Hybrid", seats: 5 },
  { id: 21, model_id: 18, name: "Quattro", year_start: 2022, year_end: null, origin: "Nhập khẩu", transmission: "Tự động", fuel_type: "Điện", seats: 5 },
];

export const carImages = [
  { id: 1, sale_post_id: 1, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMLyliM4fb0TVg49puzL5fmUy1rah_m16GfQ&s" },
  { id: 2, sale_post_id: 2, image_url: "https://hondaotohadong.net/wp-content/uploads/2020/09/z2053896050366_5f603110ad411bf6e9c5bda449cd13e9.jpg" },
  { id: 3, sale_post_id: 3, image_url: "https://img1.oto.com.vn/crop/640x480/2023/12/08/20231208143152-98f7_wm.webp" },
  { id: 4, sale_post_id: 4, image_url: "https://bizweb.dktcdn.net/100/437/558/products/mazda-cx5-2021-premium-2.jpg?v=1658978148723" },
];
