export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  badge?: string;
};

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const make = (
  id: string,
  name: string,
  price: number,
  rating: number,
  category: string,
  ids: string[],
  description: string,
  badge?: string,
): Product => ({
  id,
  name,
  price,
  rating,
  reviews: Math.floor(40 + rating * 80),
  category,
  image: img(ids[0]),
  images: ids.map((i) => img(i, 1200)),
  description,
  badge,
});

export const products: Product[] = [
  make(
    "p1",
    "Wireless Studio Headphones",
    12999,
    4.7,
    "Electronics",
    [
      "photo-1505740420928-5e560c06d30e",
      "photo-1518444065439-e933c06ce9cd",
      "photo-1583394838336-acd977736f90",
    ],
    "Premium over-ear headphones with active noise cancellation and 40-hour battery life.",
    "New",
  ),
  make(
    "p2",
    "Smart Fitness Watch",
    8499,
    4.5,
    "Electronics",
    [
      "photo-1546868871-7041f2a55e12",
      "photo-1579586337278-3befd40fd17a",
      "photo-1508685096489-7aacd43bd3b1",
    ],
    "Track workouts, sleep, and notifications with a vibrant AMOLED display.",
  ),
  make(
    "p3",
    "Mirrorless Camera 24MP",
    48999,
    4.8,
    "Electronics",
    [
      "photo-1502920917128-1aa500764cbd",
      "photo-1606983340126-99ab4feaa64a",
      "photo-1519183071298-a2962be96f83",
    ],
    "Compact mirrorless body with 4K video and interchangeable lens mount.",
    "Hot",
  ),
  make(
    "p4",
    "Portable Bluetooth Speaker",
    3499,
    4.4,
    "Electronics",
    [
      "photo-1608043152269-423dbba4e7e1",
      "photo-1545454675-3531b543be5d",
      "photo-1589003077984-894e133dabab",
    ],
    "Waterproof Bluetooth speaker with deep bass and 18-hour playback.",
  ),

  make(
    "p5",
    "Linen Oversized Shirt",
    2199,
    4.3,
    "Fashion",
    [
      "photo-1602810318383-e386cc2a3ccf",
      "photo-1521572163474-6864f9cf17ab",
      "photo-1620799140408-edc6dcb6d633",
    ],
    "Breathable linen shirt with a relaxed silhouette, perfect for warm days.",
  ),
  make(
    "p6",
    "Tailored Wool Coat",
    9999,
    4.6,
    "Fashion",
    [
      "photo-1539109136881-3be0616acf4b",
      "photo-1591047139829-d91aecb6caea",
      "photo-1544022613-e87ca75a784a",
    ],
    "Long wool blend coat with notched lapels and a clean modern cut.",
  ),
  make(
    "p7",
    "Denim Slim Jeans",
    2799,
    4.2,
    "Fashion",
    [
      "photo-1542272604-787c3835535d",
      "photo-1604176354204-9268737828e4",
      "photo-1582552938357-32b906df40cb",
    ],
    "Mid-rise slim jeans in soft stretch denim. Built to last.",
    "Sale",
  ),
  make(
    "p8",
    "Knit Pullover Sweater",
    3499,
    4.5,
    "Fashion",
    [
      "photo-1620799140188-3b2a02fd9a77",
      "photo-1434389677669-e08b4cac3105",
      "photo-1576566588028-4147f3842f27",
    ],
    "Chunky-knit pullover crafted from a warm wool blend.",
  ),

  make(
    "p9",
    "Runner Performance Sneakers",
    5999,
    4.7,
    "Shoes",
    [
      "photo-1542291026-7eec264c27ff",
      "photo-1600185365483-26d7a4cc7519",
      "photo-1595950653106-6c9ebd614d3a",
    ],
    "Lightweight running shoes with responsive foam midsole.",
    "Hot",
  ),
  make(
    "p10",
    "Classic Leather Boots",
    7499,
    4.6,
    "Shoes",
    [
      "photo-1520639888713-7851133b1ed0",
      "photo-1608256246200-53e635b5b65f",
      "photo-1605812860427-4024433a70fd",
    ],
    "Full-grain leather boots with a goodyear-welted sole.",
  ),
  make(
    "p11",
    "Canvas Low Top Sneakers",
    1999,
    4.1,
    "Shoes",
    [
      "photo-1525966222134-fcfa99b8ae77",
      "photo-1551107696-a4b0c5a0d9a2",
      "photo-1460353581641-37baddab0fa2",
    ],
    "Everyday canvas sneakers with a cushioned insole.",
  ),
  make(
    "p12",
    "Trail Hiking Shoes",
    6499,
    4.5,
    "Shoes",
    [
      "photo-1606107557195-0e29a4b5b4aa",
      "photo-1539185441755-769473a23570",
      "photo-1551107696-a4b0c5a0d9a2",
    ],
    "Grippy trail shoes built for rugged terrain and long miles.",
  ),

  make(
    "p13",
    "Minimalist Leather Wallet",
    1499,
    4.4,
    "Accessories",
    [
      "photo-1627123424574-724758594e93",
      "photo-1606760227091-3dd870d97f1d",
      "photo-1559563458-527698bf5295",
    ],
    "Slim bifold wallet handcrafted from vegetable-tanned leather.",
  ),
  make(
    "p14",
    "Aviator Sunglasses",
    1899,
    4.3,
    "Accessories",
    [
      "photo-1572635196237-14b3f281503f",
      "photo-1577803645773-f96470509666",
      "photo-1511499767150-a48a237f0083",
    ],
    "Classic aviator sunglasses with polarized lenses.",
  ),
  make(
    "p15",
    "Everyday Backpack 20L",
    3299,
    4.6,
    "Accessories",
    [
      "photo-1553062407-98eeb64c6a62",
      "photo-1581605405669-fcdf81165afa",
      "photo-1559563458-527698bf5295",
    ],
    "Water-resistant backpack with padded laptop sleeve.",
  ),
  make(
    "p16",
    "Automatic Wrist Watch",
    11999,
    4.7,
    "Accessories",
    [
      "photo-1524592094714-0f0654e20314",
      "photo-1547996160-81dfa63595aa",
      "photo-1539874754764-5a96559165b0",
    ],
    "Sapphire crystal automatic watch with exhibition caseback.",
    "New",
  ),

  make(
    "p17",
    "Ceramic Table Lamp",
    4299,
    4.5,
    "Home Decor",
    [
      "photo-1507473885765-e6ed057f782c",
      "photo-1513506003901-1e6a229e2d15",
      "photo-1530603907829-659ab4ee2bb1",
    ],
    "Sculptural ceramic lamp with a warm linen shade.",
  ),
  make(
    "p18",
    "Handwoven Wool Throw",
    2799,
    4.4,
    "Home Decor",
    [
      "photo-1522444195799-478538b28823",
      "photo-1493663284031-b7e3aefcae8e",
      "photo-1505693416388-ac5ce068fe85",
    ],
    "Cozy throw blanket woven from natural wool fibers.",
  ),
  make(
    "p19",
    "Terracotta Planter Set",
    1899,
    4.3,
    "Home Decor",
    [
      "photo-1485955900006-10f4d324d411",
      "photo-1459411552884-841db9b3cc2a",
      "photo-1485955900006-10f4d324d411",
    ],
    "Set of three terracotta planters in graduated sizes.",
  ),
  make(
    "p20",
    "Framed Abstract Print",
    2499,
    4.6,
    "Home Decor",
    [
      "photo-1513519245088-0e12902e5a38",
      "photo-1554907984-15263bfd63bd",
      "photo-1502082553048-f009c37129b9",
    ],
    "Limited-edition abstract giclée print in oak frame.",
  ),

  make(
    "p21",
    "Hardcover Novel Collection",
    1499,
    4.8,
    "Books",
    [
      "photo-1512820790803-83ca734da794",
      "photo-1495446815901-a7297e633e8d",
      "photo-1519682337058-a94d519337bc",
    ],
    "Three-book hardcover collection of award-winning fiction.",
    "Hot",
  ),
  make(
    "p22",
    "Design Coffee Table Book",
    2199,
    4.7,
    "Books",
    [
      "photo-1544947950-fa07a98d237f",
      "photo-1535905557558-afc4877a26fc",
      "photo-1531346878377-a5be20888e57",
    ],
    "Large-format design book exploring contemporary architecture.",
  ),
  make(
    "p23",
    "Cooking Masterclass Book",
    1799,
    4.5,
    "Books",
    [
      "photo-1466637574441-749b8f19452f",
      "photo-1543002588-bfa74002ed7e",
      "photo-1485322551133-3a4c27a9d925",
    ],
    "Beautifully photographed cookbook with seasonal recipes.",
  ),
  make(
    "p24",
    "Children's Picture Book Set",
    1299,
    4.6,
    "Books",
    [
      "photo-1503676260728-1c00da094a0b",
      "photo-1497633762265-9d179a990aa6",
      "photo-1481627834876-b7833e8f5570",
    ],
    "Whimsically illustrated picture books for early readers.",
  ),
];

export const categories = [
  {
    name: "Electronics",
    description: "Gadgets, audio, cameras & more",
    image: img("photo-1518770660439-4636190af475"),
  },
  {
    name: "Fashion",
    description: "Wear that moves with you",
    image: img("photo-1483985988355-763728e1935b"),
  },
  {
    name: "Shoes",
    description: "Sneakers, boots and everyday kicks",
    image: img("photo-1549298916-b41d501d3772"),
  },
  {
    name: "Accessories",
    description: "Finishing touches done right",
    image: img("photo-1611923134239-b9be5816e23d"),
  },
  {
    name: "Home Decor",
    description: "Make every room feel like home",
    image: img("photo-1493663284031-b7e3aefcae8e"),
  },
  {
    name: "Books",
    description: "Stories, ideas and inspiration",
    image: img("photo-1495446815901-a7297e633e8d"),
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getRelated = (p: Product) =>
  products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
