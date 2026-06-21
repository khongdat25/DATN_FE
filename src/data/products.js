// Centralized Mock Products Database for SaigonShoes

export const allProducts = [
  // Store Catalog Products (1-9)
  {
    id: 1,
    brand: 'Nike',
    name: "Air Force 1 '07 White Original",
    price: '1.290.000đ',
    oldPrice: '1.990.000đ',
    numericPrice: 1290000,
    image: '/images/nike-air-force-1.png',
    rating: '★★★★★',
    reviews: 128,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    badges: [{ label: '-35%', color: 'bg-accent' }],
    soldCount: 380,
    total: 500,
    isPopular: true,
    isBestSeller: true,
    isNew: false,
    images: [
      { src: '/images/nike-air-force-1.png', flip: false },
      { src: '/images/nike-black1.png', flip: false },
      { src: '/images/nike-pink1.png', flip: false },
      { src: '/images/nike-air-force-1.png', flip: true }
    ],
    colors: [
      { name: 'Trắng', bg: '#ffffff' },
      { name: 'Đen', bg: '#1a1a1a' },
      { name: 'Hồng', bg: '#ffc0cb' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike' },
      { name: 'Dòng sản phẩm', value: "Air Force 1 '07" },
      { name: 'Chất liệu Upper', value: 'Da thật cao cấp / Lớp đệm êm ái' },
      { name: 'Chất liệu Đế (Sole)', value: 'Cao su đúc bền bỉ + Công nghệ đệm khí Air' },
      { name: 'Nơi sản xuất', value: 'Việt Nam' }
    ]
  },
  {
    id: 2,
    brand: 'Adidas',
    name: 'Samba OG Core White/Black',
    price: '1.590.000đ',
    oldPrice: '2.650.000đ',
    numericPrice: 1590000,
    image: '/images/adidas-samba-og1.png',
    rating: '★★★★★',
    reviews: 89,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42', '43'],
    badges: [{ label: '-20%', color: 'bg-accent' }],
    soldCount: 420,
    total: 500,
    isPopular: true,
    isBestSeller: true,
    isNew: true,
    images: [
      { src: '/images/adidas-samba-og1.png', flip: false },
      { src: '/images/adidas_fefei-ruanxSamba_1.png', flip: false },
      { src: '/images/adidas_sambae_wmns_1.png', flip: false }
    ],
    colors: [
      { name: 'Trắng Sọc Đen', bg: 'linear-gradient(135deg, #ffffff 50%, #1a1a1a 50%)' },
      { name: 'Xanh Lá', bg: '#4CAF50' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Adidas' },
      { name: 'Dòng sản phẩm', value: 'Samba OG' },
      { name: 'Chất liệu Upper', value: 'Da lộn mềm / Da nubuck cao cấp' },
      { name: 'Chất liệu Đế (Sole)', value: 'Cao su Gum bám đường tốt' },
      { name: 'Nơi sản xuất', value: 'Indonesia' }
    ]
  },
  {
    id: 3,
    brand: 'Nike',
    name: 'Dunk Low Retro Black White Panda',
    price: '1.750.000đ',
    oldPrice: '2.920.000đ',
    numericPrice: 1750000,
    image: '/images/nike-black1.png',
    rating: '★★★★★',
    reviews: 312,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['38', '39', '40', '41', '42'],
    badges: [],
    soldCount: 290,
    total: 300,
    isPopular: true,
    isBestSeller: false,
    isNew: false,
    images: [
      { src: '/images/nike-black1.png', flip: false },
      { src: '/images/nike-air-force-1.png', flip: false },
      { src: '/images/nike-black1.png', flip: true }
    ],
    colors: [
      { name: 'Đen Trắng (Panda)', bg: 'linear-gradient(135deg, #1a1a1a 50%, #ffffff 50%)' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike' },
      { name: 'Dòng sản phẩm', value: 'Dunk Low Retro' },
      { name: 'Chất liệu Upper', value: 'Da lì 2 tông màu cao cấp' },
      { name: 'Chất liệu Đế (Sole)', value: 'Cao su phẳng phong cách Retro' },
      { name: 'Nơi sản xuất', value: 'Việt Nam' }
    ]
  },
  {
    id: 4,
    brand: 'Adidas',
    name: 'Samba OG Collegiate Green Leather',
    price: '1.890.000đ',
    numericPrice: 1890000,
    image: '/images/adidas_fefei-ruanxSamba_1.png',
    rating: '★★★★★',
    reviews: 412,
    category: 'Giày Sneaker',
    gender: 'Nữ',
    sizes: ['38', '39', '40'],
    badges: [],
    soldCount: 150,
    total: 200,
    isPopular: true,
    isBestSeller: true,
    isNew: true,
    images: [
      { src: '/images/adidas_fefei-ruanxSamba_1.png', flip: false },
      { src: '/images/adidas-samba-og1.png', flip: false }
    ],
    colors: [
      { name: 'Xanh Lá Sọc Trắng', bg: 'linear-gradient(135deg, #2e7d32 50%, #ffffff 50%)' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Adidas' },
      { name: 'Dòng sản phẩm', value: 'Samba OG' },
      { name: 'Chất liệu Upper', value: 'Da trơn phối mũi da lộn' },
      { name: 'Chất liệu Đế (Sole)', value: 'Cao su Gum màu hổ phách' }
    ]
  },
  {
    id: 5,
    brand: 'Puma',
    name: 'Puma Suede Classic Triple White',
    price: '1.350.000đ',
    oldPrice: '1.800.000đ',
    numericPrice: 1350000,
    image: '/images/puma-white1.png',
    rating: '★★★★☆',
    reviews: 210,
    category: 'Giày Sneaker',
    gender: 'Nữ',
    sizes: ['38', '39', '40', '41'],
    badges: [{ label: '-25%', color: 'bg-accent' }],
    soldCount: 95,
    total: 120,
    isPopular: false,
    isBestSeller: false,
    isNew: false,
    images: [
      { src: '/images/puma-white1.png', flip: false },
      { src: '/images/puma-ka1.webp', flip: false }
    ],
    colors: [
      { name: 'Trắng Tinh', bg: '#ffffff' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Puma' },
      { name: 'Dòng sản phẩm', value: 'Suede Classic' },
      { name: 'Chất liệu Upper', value: 'Da lộn Suede cao cấp' },
      { name: 'Chất liệu Đế (Sole)', value: 'Cao su phẳng chống trơn trượt' }
    ]
  },
  {
    id: 6,
    brand: 'Adidas',
    name: 'Sambae Wmns Pink/White Premium',
    price: '1.650.000đ',
    numericPrice: 1650000,
    image: '/images/adidas_sambae_wmns_1.png',
    rating: '★★★★★',
    reviews: 198,
    category: 'Giày Sneaker',
    gender: 'Nữ',
    sizes: ['38', '39', '40'],
    badges: [{ label: 'NEW', color: 'bg-green-500' }],
    soldCount: 45,
    total: 100,
    isPopular: false,
    isBestSeller: false,
    isNew: true,
    images: [
      { src: '/images/adidas_sambae_wmns_1.png', flip: false },
      { src: '/images/adidas_samba_og_beige_1.png', flip: false }
    ],
    colors: [
      { name: 'Hồng Nhạt Sọc Trắng', bg: 'linear-gradient(135deg, #f8bbd0 50%, #ffffff 50%)' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Adidas' },
      { name: 'Dòng sản phẩm', value: 'Sambae Wmns' },
      { name: 'Chất liệu Upper', value: 'Da mềm và đệm nâng gót nhẹ' },
      { name: 'Chất liệu Đế (Sole)', value: 'Đế cao su Platform dày 3cm cá tính' }
    ]
  },
  {
    id: 7,
    brand: 'Nike',
    name: "Air Force 1 '07 Pink Foam Special",
    price: '1.890.000đ',
    oldPrice: '2.690.000đ',
    numericPrice: 1890000,
    image: '/images/nike-pink1.png',
    rating: '★★★★★',
    reviews: 334,
    category: 'Giày Sneaker',
    gender: 'Nữ',
    sizes: ['38', '39', '40'],
    badges: [{ label: '-30%', color: 'bg-accent' }],
    soldCount: 145,
    total: 200,
    isPopular: true,
    isBestSeller: false,
    isNew: true,
    images: [
      { src: '/images/nike-pink1.png', flip: false },
      { src: '/images/nike-air-force-1.png', flip: false }
    ],
    colors: [
      { name: 'Hồng Phấn', bg: '#fce4ec' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike' },
      { name: 'Dòng sản phẩm', value: 'Air Force 1' }
    ]
  },
  {
    id: 8,
    brand: 'Nike',
    name: 'Nike Pegasus 40 Running Shoes',
    price: '1.390.000đ',
    oldPrice: '1.890.000đ',
    numericPrice: 1390000,
    image: '/images/puma-golden1.png',
    rating: '★★★★★',
    reviews: 248,
    category: 'Giày Thể Thao',
    gender: 'Nữ',
    sizes: ['36', '37', '38', '39', '40'],
    badges: [{ label: 'TREND', color: 'bg-accent' }],
    soldCount: 188,
    total: 300,
    isPopular: true,
    isBestSeller: true,
    isNew: false,
    images: [
      { src: '/images/puma-golden1.png', flip: false }
    ],
    colors: [
      { name: 'Màu Kem Bone', bg: '#f5ebe0' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike' },
      { name: 'Độ cao đế', value: '3.5 cm' }
    ]
  },
  {
    id: 9,
    brand: 'New Balance',
    name: 'New Balance 530 White Silver Metallic',
    price: '2.450.000đ',
    oldPrice: '3.200.000đ',
    numericPrice: 2450000,
    image: '/images/nike-university1.png',
    rating: '★★★★★',
    reviews: 172,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42', '43', '44'],
    badges: [],
    soldCount: 120,
    total: 200,
    isPopular: false,
    isBestSeller: false,
    isNew: true,
    images: [
      { src: '/images/nike-university1.png', flip: false }
    ],
    colors: [
      { name: 'Bạc Metallic', bg: '#e0e0e0' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'New Balance' },
      { name: 'Chất liệu Upper', value: 'Lưới thoáng khí kết hợp viền da metallic bóng loáng' }
    ]
  },

  // Flash Sale Products (11-15)
  {
    id: 11,
    brand: 'Nike',
    name: "Air Force 1 '07 White Flash Sale",
    price: '1.290.000đ',
    oldPrice: '1.990.000đ',
    numericPrice: 1290000,
    image: '/images/nike-air-force-1.png',
    rating: '★★★★★',
    reviews: 128,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    badges: [{ label: '-35%', color: 'bg-accent shadow-sm' }],
    soldCount: 78,
    total: 100,
    images: [
      { src: '/images/nike-air-force-1.png', flip: false },
      { src: '/images/nike-black1.png', flip: false }
    ],
    colors: [
      { name: 'Trắng', bg: '#ffffff' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike' },
      { name: 'Khuyến mãi', value: 'Flash Sale độc quyền' }
    ]
  },
  {
    id: 12,
    brand: 'Puma',
    name: 'Puma Velocity Nitro Sport',
    price: '712.000đ',
    oldPrice: '890.000đ',
    numericPrice: 712000,
    image: '/images/puma-black1.png',
    rating: '★★★★☆',
    reviews: 341,
    category: 'Giày Thể Thao',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42', '43'],
    badges: [{ label: '-20%', color: 'bg-accent shadow-sm' }],
    soldCount: 92,
    total: 100,
    images: [
      { src: '/images/puma-black1.png', flip: false }
    ],
    colors: [
      { name: 'Đen Bóng', bg: '#111111' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Puma' }
    ]
  },
  {
    id: 13,
    brand: 'Adidas',
    name: 'Samba OG White/Black Core',
    price: '1.590.000đ',
    oldPrice: '2.650.000đ',
    numericPrice: 1590000,
    image: '/images/adidas-samba-og1.png',
    rating: '★★★★★',
    reviews: 89,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42', '43'],
    badges: [{ label: '-40%', color: 'bg-accent shadow-sm' }],
    soldCount: 62,
    total: 100,
    images: [
      { src: '/images/adidas-samba-og1.png', flip: false }
    ],
    colors: [
      { name: 'Trắng Đen', bg: 'linear-gradient(135deg, #ffffff 50%, #1a1a1a 50%)' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Adidas' }
    ]
  },
  {
    id: 14,
    brand: 'Jordan',
    name: 'Air Jordan 1 Retro High OG Bred',
    price: '2.090.000đ',
    oldPrice: '3.800.000đ',
    numericPrice: 2090000,
    image: '/images/nike-bred1.png',
    rating: '★★★★★',
    reviews: 412,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['40', '41', '42', '43', '44'],
    badges: [{ label: '-45%', color: 'bg-accent shadow-sm' }],
    soldCount: 91,
    total: 100,
    images: [
      { src: '/images/nike-bred1.png', flip: false }
    ],
    colors: [
      { name: 'Đỏ Đen (Bred)', bg: 'linear-gradient(135deg, #d32f2f 50%, #111111 50%)' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike Jordan' }
    ]
  },
  {
    id: 15,
    brand: 'Converse',
    name: 'Chuck 70 Classic High Top Vintage',
    price: '1.350.000đ',
    oldPrice: '1.800.000đ',
    numericPrice: 1350000,
    image: '/images/nike-mid1.png',
    rating: '★★★★☆',
    reviews: 210,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['38', '39', '40', '41', '42'],
    badges: [{ label: '-25%', color: 'bg-accent shadow-sm' }],
    soldCount: 85,
    total: 100,
    images: [
      { src: '/images/nike-mid1.png', flip: false }
    ],
    colors: [
      { name: 'Vàng Cát', bg: '#e0cda9' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Converse' }
    ]
  },

  // Bestsellers Products (20-24)
  {
    id: 20,
    brand: 'Nike',
    name: 'Air Force 1 Shadow Pink/White Women',
    price: '2.100.000đ',
    numericPrice: 2100000,
    image: '/images/nike-pink1.png',
    rating: '★★★★★',
    reviews: 512,
    category: 'Giày Sneaker',
    gender: 'Nữ',
    sizes: ['36', '37', '38', '39', '40'],
    images: [
      { src: '/images/nike-pink1.png', flip: false }
    ],
    colors: [
      { name: 'Hồng Trắng', bg: 'linear-gradient(135deg, #f8bbd0 50%, #ffffff 50%)' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike' }
    ]
  },
  {
    id: 21,
    brand: 'Puma',
    name: 'Puma Deviate Nitro 2 Sport',
    price: '1.200.000đ',
    numericPrice: 1200000,
    image: '/images/puma-ka1.webp',
    rating: '★★★★★',
    reviews: 389,
    category: 'Giày Thể Thao',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42'],
    images: [
      { src: '/images/puma-ka1.webp', flip: false }
    ],
    colors: [
      { name: 'Lông Cừu Kem', bg: '#f5f5dc' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Puma' }
    ]
  },
  {
    id: 22,
    brand: 'New Balance',
    name: '550 White Green Premium Leather',
    price: '2.800.000đ',
    numericPrice: 2800000,
    image: '/images/nike-university1.png',
    rating: '★★★★★',
    reviews: 276,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42', '43', '44'],
    images: [
      { src: '/images/nike-university1.png', flip: false }
    ],
    colors: [
      { name: 'Trắng Xanh Lá', bg: 'linear-gradient(135deg, #ffffff 50%, #1b5e20 50%)' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'New Balance' }
    ]
  },
  {
    id: 23,
    brand: 'New Balance',
    name: 'New Balance Fresh Foam X',
    price: '1.650.000đ',
    numericPrice: 1650000,
    image: '/images/puma-golden1.png',
    rating: '★★★★★',
    reviews: 198,
    category: 'Giày Thể Thao',
    gender: 'Nữ',
    sizes: ['36', '37', '38', '39'],
    images: [
      { src: '/images/puma-golden1.png', flip: false }
    ],
    colors: [
      { name: 'Nâu Đồng Cát', bg: '#b5a642' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'New Balance' }
    ]
  },
  {
    id: 24,
    brand: 'Adidas',
    name: 'Samba OG Retro White/Black Leather',
    price: '1.590.000đ',
    numericPrice: 1590000,
    image: '/images/adidas-samba-og1.png',
    rating: '★★★★★',
    reviews: 415,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42', '43'],
    images: [
      { src: '/images/adidas-samba-og1.png', flip: false }
    ],
    colors: [
      { name: 'Trắng Sọc Đen', bg: 'linear-gradient(135deg, #ffffff 50%, #1a1a1a 50%)' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Adidas' }
    ]
  },

  // Featured Products (30-34)
  {
    id: 30,
    brand: 'Nike × Off-White',
    name: 'Air Max 97 OW Collab Limited Edition',
    price: '4.500.000đ',
    oldPrice: '6.200.000đ',
    numericPrice: 4500000,
    image: '/images/nike-air1.png',
    rating: '★★★★★',
    reviews: 203,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42', '43'],
    images: [
      { src: '/images/nike-air1.png', flip: false }
    ],
    colors: [
      { name: 'Trắng Sữa OW', bg: '#fcf8f2' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike x Off-White Collab' },
      { name: 'Phiên bản', value: 'Giới hạn (Limited Edition)' }
    ]
  },
  {
    id: 31,
    brand: 'Adidas',
    name: 'Adidas Ultraboost Light Running',
    price: '1.450.000đ',
    oldPrice: '1.800.000đ',
    numericPrice: 1450000,
    image: '/images/puma-muse1.png',
    rating: '★★★★★',
    reviews: 205,
    category: 'Giày Thể Thao',
    gender: 'Nữ',
    sizes: ['36', '37', '38', '39'],
    images: [
      { src: '/images/puma-muse1.png', flip: false }
    ],
    colors: [
      { name: 'Màu Kem Xương', bg: '#e8e3d9' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Adidas' }
    ]
  },
  {
    id: 32,
    brand: 'Adidas',
    name: 'Yeezy Boost 350 V2 Onyx Dark',
    price: '3.200.000đ',
    oldPrice: '4.500.000đ',
    numericPrice: 3200000,
    image: '/images/adidas_samba_og_beige_1.png',
    rating: '★★★★★',
    reviews: 178,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['40', '41', '42', '43', '44'],
    images: [
      { src: '/images/adidas_samba_og_beige_1.png', flip: false }
    ],
    colors: [
      { name: 'Đen Onyx', bg: '#1f1f21' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Adidas Yeezy' }
    ]
  },
  {
    id: 33,
    brand: 'Nike',
    name: 'Nike Zoom Fly 5 Sport',
    price: '1.090.000đ',
    numericPrice: 1090000,
    image: '/images/adidas-samba-lt-1.png',
    rating: '★★★★☆',
    reviews: 67,
    category: 'Giày Thể Thao',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42', '43'],
    images: [
      { src: '/images/adidas-samba-lt-1.png', flip: false }
    ],
    colors: [
      { name: 'Xám Xi Măng', bg: '#bdc3c7' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike' }
    ]
  },
  {
    id: 34,
    brand: 'Nike',
    name: 'Dunk Low Retro Premium Panda Classic',
    price: '1.890.000đ',
    oldPrice: '2.300.000đ',
    numericPrice: 1890000,
    image: '/images/nike-mid1.png',
    rating: '★★★★★',
    reviews: 334,
    category: 'Giày Sneaker',
    gender: 'Nam',
    sizes: ['39', '40', '41', '42', '43'],
    images: [
      { src: '/images/nike-mid1.png', flip: false }
    ],
    colors: [
      { name: 'Đen Trắng Classic', bg: 'linear-gradient(135deg, #111 50%, #fff 50%)' }
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Nike' }
    ]
  }
]

// Helper lookup
export function getProductById(id) {
  const numericId = parseInt(id, 10)
  const found = allProducts.find(p => p.id === numericId)
  if (found) return found

  // Dynamic fallback: if id is not found, dynamically generate a safe default object based on standard mock details
  return {
    id: numericId || 1,
    brand: 'Nike',
    name: `StepUp Premium Product (ID: ${numericId || 1})`,
    price: '1.250.000₫',
    oldPrice: '1.500.000₫',
    discount: '16%',
    reviews: 42,
    isNew: true,
    images: [
      { src: '/images/nike-air-force-1.png', flip: false },
      { src: '/images/nike-black1.png', flip: false },
      { src: '/images/nike-pink1.png', flip: false }
    ],
    colors: [
      { name: 'Cam Trắng', bg: 'linear-gradient(135deg, #FF4D00 50%, #ffffff 50%)' },
      { name: 'Đen Trắng', bg: 'linear-gradient(135deg, #1a1a1a 50%, #ffffff 50%)' }
    ],
    sizes: ['38', '39', '40', '41', '42', '44'],
    specs: [
      { name: 'Thương hiệu', value: 'SaigonShoes' },
      { name: 'Bảo hành', value: '12 tháng chính hãng' }
    ]
  }
}

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/placeholder.png';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  if (imagePath.startsWith('/images/')) {
    return imagePath;
  }
  const serverUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
  if (imagePath.startsWith('images/')) {
    return `${serverUrl}/${imagePath}`;
  }
  return `${serverUrl}/images/${imagePath}`;
}

export function mapBackendProduct(p) {
  if (!p) return null;

  // Find min price from variants
  let minPrice = 0;
  if (p.min_price !== undefined && p.min_price !== null) {
    minPrice = parseFloat(p.min_price);
  } else if (p.variants && p.variants.length > 0) {
    const prices = p.variants.map(v => parseFloat(v.price)).filter(pr => !isNaN(pr));
    if (prices.length > 0) {
      minPrice = Math.min(...prices);
    }
  }

  // Format price string in Vietnam Dong e.g. 1.250.000đ
  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(minPrice).replace(/\s/g, '').replace('₫', 'đ');

  // Main image
  let mainImage = '/images/placeholder.png';
  if (p.images && p.images.length > 0) {
    const firstImg = p.images[0];
    const imgPath = typeof firstImg === 'string' ? firstImg : (firstImg?.image || '');
    mainImage = getImageUrl(imgPath);
  } else if (p.variants && p.variants.length > 0) {
    const vImg = p.variants[0].image;
    mainImage = getImageUrl(vImg);
  }

  const brandName = p.brand?.name || 'SaigonShoes';
  const categoryName = p.category?.name || 'Giày Sneaker';
  const avgRatingVal = parseFloat(p.avg_rating) || 5;
  const ratingStars = '★'.repeat(Math.round(avgRatingVal)) + '☆'.repeat(5 - Math.round(avgRatingVal));

  // Extract unique sizes from variants
  let sizes = [];
  if (p.variants && p.variants.length > 0) {
    sizes = [...new Set(p.variants.map(v => {
      if (v.size && v.size.name) return v.size.name;
      return v.size_id ? String(v.size_id) : null;
    }))].filter(s => s !== null);
  }
  if (sizes.length === 0) {
    sizes = ['38', '39', '40', '41', '42', '43', '44'];
  }

  // Extract unique colors from variants
  let colors = [];
  if (p.variants && p.variants.length > 0) {
    const uniqueColorNames = [...new Set(p.variants.map(v => v.color?.name).filter(Boolean))];
    colors = uniqueColorNames.map(c => ({
      name: c,
      bg: c.toLowerCase() === 'đen' ? '#1a1a1a' : c.toLowerCase() === 'trắng' ? '#ffffff' : '#ccc'
    }));
  }

  // Images list
  let imagesList = [];
  if (p.images && p.images.length > 0) {
    imagesList = p.images.map(img => {
      const imgPath = typeof img === 'string' ? img : (img?.image || '');
      return { src: getImageUrl(imgPath), flip: false };
    });
  } else {
    imagesList = [{ src: mainImage, flip: false }];
  }

  return {
    id: p.id,
    brand: brandName,
    name: p.name,
    price: formattedPrice,
    numericPrice: minPrice,
    oldPrice: minPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(minPrice * 1.3).replace(/\s/g, '').replace('₫', 'đ') : null,
    image: mainImage,
    rating: ratingStars,
    reviews: p.rating ? p.rating.length : 12,
    category: categoryName,
    gender: p.gender === 'male' ? 'Nam' : p.gender === 'female' ? 'Nữ' : 'Cả hai',
    sizes: sizes,
    badges: [],
    soldCount: p.sold || 0,
    total: (p.sold || 0) + 100,
    isPopular: p.sold > 10,
    isBestSeller: p.sold > 20,
    isNew: true,
    images: imagesList,
    colors: colors,
    specs: [
      { name: 'Thương hiệu', value: brandName },
      { name: 'Dòng sản phẩm', value: p.name }
    ],
    slug: p.slug,
    rawVariants: p.variants || []
  };
}
