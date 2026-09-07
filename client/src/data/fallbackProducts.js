const fallbackProducts = [
  {
    id: 'multi-millet-noodles',
    name: 'Multi Millet Noodles',
    price: 100,
    weight: '180g',
    category: 'Dry & Instant Grocery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image:
      'https://res.cloudinary.com/dskzfipt3/image/upload/v1781327380/medusa/1781327380348-pomelli_photoshoot_image_1_1_0612%20%2821%29.png.jpg',
    tags: ['Millet Goodness', 'Crunchy', 'Delight'],
    description:
      'Millet-based noodles made for a quick and convenient meal.',
  },

  {
    id: 'pearl-millet-noodles',
    name: 'Pearl Millet Noodles',
    price: 120,
    weight: '180g',
    category: 'Dry & Instant Grocery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image:
      'https://res.cloudinary.com/dskzfipt3/image/upload/v1781328453/medusa/1781328451789-pomelli_photoshoot_image_1_1_0612%20%2811%29.png.jpg',
    tags: ['Bajra Rich', 'Tasty', 'Noodles'],
    description:
      'Pearl millet noodles combining convenience with millet goodness.',
  },

  {
    id: 'little-millet-noodles',
    name: 'Little Millet Noodles',
    price: 120,
    weight: '180g',
    category: 'Dry & Instant Grocery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image:
      'https://res.cloudinary.com/dskzfipt3/image/upload/v1781328677/medusa/1781328675643-pomelli_photoshoot_image_1_1_0612%20%289%29.png.jpg',
    tags: ['Millet Rich', 'Tasty', 'Noodles'],
    description:
      'Little millet noodles for a convenient everyday meal.',
  },

  {
    id: 'foxtail-millet-noodles',
    name: 'Foxtail Millet Noodles',
    price: 110,
    weight: '180g',
    category: 'Dry & Instant Grocery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image:
      'https://res.cloudinary.com/dskzfipt3/image/upload/v1781328909/medusa/1781328907725-pomelli_photoshoot_image_1_1_0612%20%287%29.png.jpg',
    tags: ['Millet', 'Quick', 'Bites', 'Healthy'],
    description:
      'Foxtail millet noodles offering a quick and tasty meal option.',
  },

  {
    id: 'jowar-palak-khakhra',
    name: 'Jowar Palak Khakhra',
    price: 130,
    weight: '200g',
    category: 'Snacks & Namkeen',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image:
      'https://res.cloudinary.com/dskzfipt3/image/upload/v1781329341/medusa/1781329339472-pomelli_photoshoot_image_1_1_0612%20%2813%29.png.jpg',
    tags: ['Healthy Jowar', 'Crispy', 'Crunch'],
    description:
      'Crispy jowar and palak khakhra made for a wholesome snack.',
  },

  {
    id: 'chorafali-khakhra',
    name: 'Chorafali Khakhra',
    price: 130,
    weight: '200g',
    category: 'Snacks & Namkeen',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Traditional', 'Crunchy', 'Savory', 'Delight'],
    description:
      'Traditional crunchy and savoury khakhra.',
  },

  {
    id: 'bajra-methi-khakhra',
    name: 'Bajra Methi Khakhra',
    price: 130,
    weight: '200g',
    category: 'Snacks & Namkeen',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Bajra', 'Healthy', 'Crispy', 'Crunch'],
    description:
      'Crispy bajra and methi khakhra for a wholesome snack.',
  },

  {
    id: 'jowar-bajara-palak-khakhra',
    name: 'Jowar Bajara Palak Khakhra',
    price: 130,
    weight: '200g',
    category: 'Snacks & Namkeen',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image:
      'https://res.cloudinary.com/dskzfipt3/image/upload/v1781328227/medusa/1781328225920-pomelli_photoshoot_image_1_1_0612%20%2823%29.png.jpg',
    tags: ['Nutritious Millet', 'Rustic', 'Flavor'],
    description:
      'Nutritious millet-based khakhra with a rustic flavour.',
  },

  {
    id: 'hulage-kulith-shengoli',
    name: 'Hulage / Kulith Shengoli',
    price: 90,
    weight: '220g',
    category: 'Dry & Instant Grocery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Kulith', 'Rustic', 'Comfort'],
    description:
      'A traditional kulith-based food with a rustic, comforting flavour.',
  },

  {
    id: 'shevga-soup',
    name: 'Shevga Soup',
    price: 38,
    weight: '30g',
    category: 'Dry & Instant Grocery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Healthy', 'Moringa', 'Comfort'],
    description:
      'A convenient moringa-based soup option.',
  },

  {
    id: 'aaswad-mitha-paan',
    name: 'Aaswad Mitha Paan',
    price: 0,
    weight: '100g',
    category: 'Mukhvas & Digestives',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 0,
    image: '',
    tags: ['Sweet Paan', 'Tasty', 'Fresh'],
    description:
      'Sweet paan flavoured mukhvas.',
  },

  {
    id: 'shahi-mukhwas',
    name: 'Shahi Mukhwas',
    price: 0,
    weight: '100g',
    category: 'Mukhvas & Digestives',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 0,
    image: '',
    tags: ['Royal Flavor', 'Cool', 'Fresh'],
    description:
      'A refreshing royal-flavoured mukhwas.',
  },

  {
    id: 'mapro-strawberry-fruit-crush',
    name: 'Mapro Strawberry Fruit Crush',
    price: 252,
    weight: '1000g',
    category: 'Sweets & Bakery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image:
      'https://res.cloudinary.com/dskzfipt3/image/upload/v1781082686/medusa/1781082685214-pomelli_photoshoot_image_1_1_0526%20%284%29%20%286%29.png.jpg',
    tags: ['Sweet', 'Strawberry', 'Goodness'],
    description:
      'Sweet strawberry fruit crush.',
  },

  {
    id: 'mapro-rose-sharbat',
    name: 'Mapro Rose Sharbat',
    price: 252,
    weight: '1000g',
    category: 'Sweets & Bakery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image:
      'https://res.cloudinary.com/dskzfipt3/image/upload/v1781081677/medusa/1781081675602-pomelli_photoshoot_image_1_1_0526%20%287%29%20%285%29.png.jpg',
    tags: ['Classic', 'Rose', 'Refreshment'],
    description:
      'Classic rose-flavoured refreshing sharbat.',
  },

  {
    id: 'mapro-pink-guava-fruit-crush',
    name: 'Mapro Pink Guava Fruit Crush',
    price: 180,
    weight: '1000g',
    category: 'Sweets & Bakery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Sweet', 'Guava', 'Refreshment'],
    description:
      'Sweet and refreshing pink guava fruit crush.',
  },

  {
    id: 'mapro-mango-fruit-crush',
    name: 'Mapro Mango Fruit Crush',
    price: 252,
    weight: '1000g',
    category: 'Sweets & Bakery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Rich', 'Mango', 'Flavor'],
    description:
      'Rich mango-flavoured fruit crush.',
  },

  {
    id: 'chitale-gulabjam',
    name: 'Chitale Gulabjam',
    price: 85,
    weight: '250g',
    category: 'Sweets & Bakery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Soft', 'Sweetness', 'Festive Joy'],
    description:
      'Soft and sweet gulabjam suitable for festive occasions.',
  },

  {
    id: 'sitafal-milk-shake',
    name: 'Sitafal Milk Shake',
    price: 30,
    weight: '80g',
    category: 'Dairy & Beverages',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Rich', 'Refreshing', 'Sitafal'],
    description:
      'Rich and refreshing sitafal milk shake.',
  },

  {
    id: 'rose-milk-shake',
    name: 'Rose Milk Shake',
    price: 30,
    weight: '80g',
    category: 'Dairy & Beverages',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Rose', 'Creamy', 'Refreshment'],
    description:
      'Creamy and refreshing rose milk shake.',
  },

  {
    id: 'pista-milk-shake',
    name: 'Pista Milk Shake',
    price: 30,
    weight: '80g',
    category: 'Dairy & Beverages',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Pista', 'Smooth', 'Refreshing'],
    description:
      'Smooth and refreshing pista milk shake.',
  },

  {
    id: 'pineapple-milk-shake',
    name: 'Pineapple Milk Shake',
    price: 30,
    weight: '80g',
    category: 'Dairy & Beverages',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Creamy', 'Tropical', 'Flavor Burst'],
    description:
      'Creamy tropical pineapple milk shake.',
  },

  {
    id: 'butterscotch-milk-shake',
    name: 'Butterscotch Milk Shake',
    price: 30,
    weight: '80g',
    category: 'Dairy & Beverages',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Smooth', 'Sweet', 'Butterscotch'],
    description:
      'Smooth and sweet butterscotch milk shake.',
  },

  {
    id: 'ready-faluda-mix-blue-berry',
    name: 'Ready Faluda Mix Blue Berry',
    price: 45,
    weight: 'Available on product page',
    category: 'Dry & Instant Grocery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Blueberry', 'Refreshing', 'Creamy Delight'],
    description:
      'Blueberry flavoured ready faluda mix.',
  },

  {
    id: 'ready-faluda-mix-strawberry',
    name: 'Ready Faluda Mix Strawberry',
    price: 45,
    weight: 'Available on product page',
    category: 'Dry & Instant Grocery',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Sweet', 'Creamy', 'Faluda Bliss'],
    description:
      'Strawberry flavoured ready faluda mix.',
  },

    {
    id: 'shreya-thecha-green-chilli-lemon-chutney',
    name: 'Shreya Thecha - Green Chilli Lemon Chutney',
    price: 30,
    weight: 'Available on product page',
    category: 'Pickles & Condiments',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Thecha', 'Green Chilli', 'Lemon', 'Spicy'],
    description:
      'A spicy green chilli and lemon chutney inspired by traditional Maharashtrian flavours.',
  },

  {
    id: 'sawai-kolhapuri-thecha',
    name: 'Sawai Kolhapuri Thecha',
    price: 30,
    weight: 'Available on product page',
    category: 'Pickles & Condiments',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Kolhapuri', 'Thecha', 'Spicy', 'Traditional'],
    description:
      'A traditional Kolhapuri-style thecha with a bold and spicy flavour.',
  },

  {
    id: 'ravimagic-mainmula-pickle',
    name: 'Ravimagic Mainmula Pickle',
    price: 96,
    weight: 'Available on product page',
    category: 'Pickles & Condiments',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Pickle', 'Traditional', 'Tangy'],
    description:
      'A traditional pickle offering a tangy and flavourful accompaniment.',
  },

  {
    id: 'shevaga-lonche',
    name: 'Shevaga Lonche',
    price: 150,
    weight: 'Available on product page',
    category: 'Pickles & Condiments',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Shevga', 'Pickle', 'Traditional', 'Maharashtrian'],
    description:
      'Traditional shevga pickle inspired by authentic Maharashtrian flavours.',
  },

  {
    id: 'prawns-pickle-kolambi-lonche',
    name: 'Prawns Pickle (Kolambi Lonche)',
    price: 280,
    weight: 'Available on product page',
    category: 'Pickles & Condiments',
    region: 'Konkan',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Prawns', 'Kolambi', 'Konkan', 'Pickle'],
    description:
      'A traditional Konkan-style prawns pickle with rich regional flavour.',
  },

  {
    id: 'ambadi-bhajiche-lonche',
    name: 'Ambadi Bhajiche Lonche',
    price: 190,
    weight: 'Available on product page',
    category: 'Pickles & Condiments',
    region: 'Maharashtra',
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    image: '',
    tags: ['Ambadi', 'Pickle', 'Traditional', 'Maharashtrian'],
    description:
      'Traditional Ambadi vegetable pickle inspired by authentic Maharashtrian recipes.',
  }
]

export default fallbackProducts