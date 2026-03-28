/**
 * Zeraf Ability Mock Database (Client-Side)
 * This acts as the central data store for the boutique, simulating a real database.
 */

export const MOCK_DB = {
  products: [
    { id: 1, name: "Adaptive Magnetic-Zip Hoodie", price: 89.00, stock: 45, category: "ADAPTIVE", status: "In Stock" },
    { id: 2, name: "Sensory-Free Seamless Tee", price: 39.00, stock: 112, category: "ADAPTIVE", status: "In Stock" },
    { id: 3, name: "Seated-Cut Boutique Chinos", price: 75.00, stock: 18, category: "BOTTOMS", status: "Low Stock" },
    { id: 4, name: "One-Handed Military Parka", price: 139.00, stock: 12, category: "OUTERWEAR", status: "Low Stock" },
    { id: 5, name: "Red Flounced Runway Dress", price: 145.00, stock: 8, category: "DRESSES", status: "Boutique Exclusive" },
    { id: 7, name: "Button-Front Designer Gown", price: 165.00, stock: 5, category: "DRESSES", status: "Low Stock" },
    { id: 8, name: "Wide-Fit Magnetic Trainers", price: 120.00, stock: 32, category: "FOOTWEAR", status: "In Stock" }
  ],
  
  orders: [
    { id: 'ORD-2026-001', customer: 'Sarah Jenkins', date: 'Mar 24, 2026', amount: 129.00, status: 'Shipped', product: 'Adaptive Magnetic-Zip Hoodie' },
    { id: 'ORD-2026-002', customer: 'Michael Chen', date: 'Mar 23, 2026', amount: 79.50, status: 'Processing', product: 'Seated-Cut Boutique Chinos' },
    { id: 'ORD-2026-003', customer: 'Elena Rodriguez', date: 'Mar 22, 2026', amount: 210.00, status: 'Delivered', product: 'Red Flounced Runway Dress' }
  ],

  customers: [
    { id: 'CUST-001', name: 'Sarah Jenkins', email: 'sarah.j@example.com', orders: 3, totalSpent: 450.00 },
    { id: 'CUST-002', name: 'Michael Chen', email: 'm.chen@example.com', orders: 1, totalSpent: 79.50 }
  ],

  stats: {
    totalRevenue: "$45,280.00",
    activeOrders: 12,
    customersTotal: 842,
    conversionRate: "4.2%"
  },

  homeContent: {
    heroSlides: [
      {
        image: "/image/BER04428.jpg",
        title: "Elegance Without Boundaries",
        subtitle: "Couture adaptive fashion inspired by the rich heritage of Ethiopia.",
        cta: "EXPLORE COLLECTION"
      },
      {
        image: "/image/BER04434.jpg",
        title: "Dignity in Every Stitch",
        subtitle: "Exclusive designs putting ease and accessibility as the absolute priority.",
        cta: "SHOP THE LOOK"
      }
    ],
    missionTitle: "Inclusive Masterpieces",
    missionSubtitle: "Every stitch is a testament to the strength and dignity of our community."
  },

  homeAboutSection: {
    image: "/image/BER04153.jpg",
    bodyText: "Zeraf Ability is more than a fashion brand; it's a resilient movement. Born from the Ethiopian word for triumph, we construct adaptive couture that dissolves the boundaries of style, ensuring that personal expression and functional ease exist as one.",
    founderLine: "Founder Beza Mengistu architected this vision to celebrate the artisanal soul of heritage craftsmanship while pioneering modern, inclusive solutions for the global stage."
  },

  featuredCollections: [
    { id: 1, title: "The Independence Line", tag: "Minimalist", image: "/image/BER04428.jpg" },
    { id: 2, title: "Heritage Fusion", tag: "Ethiopian Pattern", image: "/image/BER04434.jpg" },
    { id: 3, title: "Runway Access", tag: "Luxury Adaptive", image: "/image/photo_2026-03-19_04-52-22.jpg" }
  ],

  founderSection: {
    name: "Beza Mengistu",
    image1: "/image/photo_2026-03-19_04-52-22.jpg",
    image1Alt: "Beza Mengistu Expo",
    bio1: "Beza Mengistu is the visionary lead architect behind Zeraf Ability. Driven by a deep passion for inclusive design and immense respect for her Ethiopian heritage, Beza dedicates her career to bridging the gap between high-fashion aesthetics and accessible functionality.",
    image2: "/image/photo_2026-03-19_02-47-24.jpg",
    image2Alt: "Beza Mengistu Award",
    bio2: "From showcasing groundbreaking collections at prestigious international events to receiving global accolades for her advocacy, Beza serves as a leading pivotal voice in adaptive fashion. Every single garment she architects stands as a testament to her belief that clothing should celebrate individuality without compromise."
  },
  aboutContent: {
    heroTagline: "Building Identity",
    heroHeadline: "Zeraf Story",
    heroSubtext: "A journey of resilience, architecting a world where dignity and style are woven together for every body.",
    storyHeading: "Resilient Spirit",
    storyBody: "The name \"Zeraf\" is a powerful Ethiopian word embodying resilience, triumph, and winning. It reflects our spirit and the strength we aim to inspire in every individual who wears our adaptive designs.",
    craftsmanshipHeading: "The Craftsmanship",
    craftsmanshipBody: "Every single piece is a political and cultural act. By working alongside skilled Ethiopian women artisans, we preserve heritage techniques while solving modern, functional challenges.",
    sectionHeadline: "The Future is Inclusive",
    missionTitle: "Mission",
    missionBody: "To empower through inclusive design, ensuring independence and preserving the soul of traditional craftsmanship for the global stage.",
    visionTitle: "Vision",
    visionBody: "To lead the global adaptive movement, demonstrating that accessible luxury is not just a concept, but a standard for the industry.",
    founderName: "Beza Mengistu",
    founderTitle: "Founder & Creative Director",
    founderBio: "Beza founded Zeraf Ability after experiencing firsthand the gap in adaptive fashion for people with disabilities. Drawing from Ethiopia's rich textile heritage, she built a brand that fuses beauty, dignity, and functionality.",
    founderImage: "/image/BER04153.jpg",
    ctaHeadline: "Ready to explore the collection?",
    ctaButton: "VIEW RELEASES",
    featuredCollectionsTagline: "Our signature adaptive collections — crafted for every body, every story."
  },
  siteLogo: "/image/Screenshot 2026-03-19 033934.png"
};

// Persistence functions
export const getDb = () => {
  const localDb = localStorage.getItem('zeraf_mock_db');
  return localDb ? JSON.parse(localDb) : MOCK_DB;
};

export const updateDb = (newData) => {
  localStorage.setItem('zeraf_mock_db', JSON.stringify(newData));
};
