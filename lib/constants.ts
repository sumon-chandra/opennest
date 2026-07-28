export const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
]

export const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Properties: [
    { label: "Browse Properties", href: "/properties" },
    { label: "Categories", href: "/categories" },
    { label: "New Listings", href: "/properties" },
    { label: "Featured", href: "/properties" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Support", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Community", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "#" },
    { label: "Disclaimer", href: "#" },
  ],
}

export const CATEGORIES = [
  {
    id: "1",
    name: "Modern Apartments",
    count: 328,
    image: "/categories/1.png",
  },
  { id: "2", name: "Luxury Villas", count: 145, image: "/categories/2.png" },
  { id: "3", name: "Beachfront Homes", count: 89, image: "/categories/3.png" },
  { id: "4", name: "Mountain Cabins", count: 67, image: "/categories/4.png" },
  { id: "5", name: "City Lofts", count: 234, image: "/categories/5.png" },
  {
    id: "6",
    name: "Countryside Estates",
    count: 112,
    image: "/categories/6.png",
  },
]

export const AMENITIES = [
  { id: "1", name: "WiFi", icon: "Wifi" },
  { id: "2", name: "Kitchen", icon: "UtensilsCrossed" },
  { id: "3", name: "Air Conditioning", icon: "Wind" },
  { id: "4", name: "Parking", icon: "ParkingCircle" },
  { id: "5", name: "Pool", icon: "Waves" },
  { id: "6", name: "Gym", icon: "Dumbbell" },
  { id: "7", name: "Washer/Dryer", icon: "Droplets" },
  { id: "8", name: "Heating", icon: "Flame" },
  { id: "9", name: "Pets Allowed", icon: "PawPrint" },
  { id: "10", name: "Elevator", icon: "ArrowUp" },
]

export const LOCATIONS = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
]

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
]

export const FAQ_ITEMS = [
  {
    question: "How do I book a property?",
    answer:
      'Browse our properties, select your desired dates, and click "Request Booking". Our team will process your request and send confirmation details.',
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, bank transfers, and digital payment methods for your convenience.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, cancellations are free up to 14 days before your check-in date. Late cancellations may incur a fee.",
  },
  {
    question: "Is the price inclusive of taxes?",
    answer:
      "Our listed prices include the nightly rate. Additional taxes and fees will be shown before checkout.",
  },
  {
    question: "What if there&apos;s an issue during my stay?",
    answer:
      "Our 24/7 support team is available to help. Contact us immediately through the app or website.",
  },
  {
    question: "Do you offer long-term rentals?",
    answer:
      "Yes! Many of our properties offer discounted rates for monthly and long-term bookings.",
  },
]
