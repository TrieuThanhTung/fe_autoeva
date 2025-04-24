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
    name: "Toyota Camry 2.5Q 2020",
    location: "Hà Nội",
    price: "850.000.000",
    status: "sold",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMLyliM4fb0TVg49puzL5fmUy1rah_m16GfQ&s",
    mileage: "35000",
  },
  {
    id: 2,
    name: "Honda Civic RS 2022",
    location: "TP. Hồ Chí Minh",
    status: "active",
    price: "920.000.000",
    image: "https://hondaotohadong.net/wp-content/uploads/2020/09/z2053896050366_5f603110ad411bf6e9c5bda449cd13e9.jpg",
    mileage: "20000",
  },
  {
    id: 3,
    name: "Mazda CX-5 2.5 Premium 2021",
    location: "Đà Nẵng",
    status: "active",
    price: "780.000.000",
    image: "https://img1.oto.com.vn/crop/640x480/2023/12/08/20231208143152-98f7_wm.webp",
    mileage: "40,000 km",
  },
  {
    id: 4,
    name: "Mazda CX-5 2.0 Premium 2022",
    location: "Thanh Hoá",
    status: "active",
    price: "753.000.000",
    image: "https://bizweb.dktcdn.net/100/437/558/products/mazda-cx5-2021-premium-2.jpg?v=1658978148723",
    mileage: "18,000 km",
  },
];

export const images = [
  "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
  "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
  "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
  "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
  "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg",
  "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
  "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
];


export const data_details = {
  title: "Toyota Camry 2.5Q 2019 ",
  price: "850.000.000",
  location: "Hà Nội",
  mileage: "45.000",
  year: "2019",
  origin: "Lắp ráp trong nước",
  fuel: "Xăng",
  transmission: "Tự động",
  seats: "5 chỗ",
  description:
    "Toyota Camry 2.5Q 2019 số tự động, máy xăng, lắp ráp trong nước. Xe gia đình sử dụng, bảo dưỡng định kỳ đầy đủ tại hãng. Nội thất nguyên bản, sạch sẽ, không có dấu hiệu ngập nước/tai nạn. Trang bị đầy đủ options cao cấp: Ghế da, cửa sổ trời, màn hình giải trí, camera lùi, cảm biến trước sau...",
};

export const relatedCars = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    title: "Toyota Camry 2.0G 2020",
    price: "795.000.000",
    location: "Hà Nội",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    title: "Toyota Camry 2.5Q 2018",
    price: "720.000.000",
    location: "TP.HCM",
  },
]

export const userPosts = [
  {
    id: 1,
    image: images[0],
    name: "Toyota Camry 2.5Q",
    year: 2023,
    km: "15,000 km",
    price: "850,000,000đ",
    status: "Đang hiển thị",
    date: "20/02/2024",
  },
  {
    id: 2,
    name: "Honda Civic RS",
    image: images[0],
    year: 2022,
    km: "25,000 km",
    price: "720,000,000đ",
    status: "Đã bán",
    date: "15/02/2024",
  },
];
