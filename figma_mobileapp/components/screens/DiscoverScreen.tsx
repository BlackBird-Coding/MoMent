import { useState } from 'react';
import { SearchField } from '../SearchField';
import { PillFilter } from '../PillFilter';
import { ServiceTile } from '../ServiceTile';
import { ProductCard } from '../ProductCard';
import { Plus, Stethoscope, Syringe, Smile, Baby, Shield, Heart, Calendar, GraduationCap, Utensils, Home } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../Logo';
import { ProductDetailModal } from '../modals/ProductDetailModal';
import { ServiceBookingModal } from '../modals/ServiceBookingModal';

export function DiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);

  const filters = ['All', 'Services', 'New', 'Used', 'Essentials', 'Toys', 'Clothing', 'Gear'];
  
  const services = [
    { icon: Stethoscope, label: 'Doctor Booking' },
    { icon: Syringe, label: 'Vaccination' },
    { icon: Smile, label: 'Dentist' },
    { icon: Baby, label: 'Nursery' },
    { icon: Shield, label: 'Insurance' },
    { icon: Heart, label: 'Lactation' },
    { icon: Calendar, label: 'Daycare' },
    { icon: GraduationCap, label: 'Classes' },
  ];

  const products = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1744424945702-d9b8927c3f59?w=400',
      name: 'Organic Cotton Baby Onesie Set (3-pack)',
      price: '฿450',
      badge: 'verified' as const,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1670453138643-a608e90b6bc9?w=400',
      name: 'Montessori Wooden Educational Toy Set',
      price: '฿890',
      badge: 'clean' as const,
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1633379204542-430941769df3?w=400',
      name: 'Ergonomic Baby Carrier - Front & Back',
      price: '฿1,200',
      badge: 'verified' as const,
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400',
      name: 'Natural Baby Shampoo & Body Wash',
      price: '฿280',
      badge: 'verified' as const,
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
      name: 'Bamboo Baby Feeding Set (4-piece)',
      price: '฿650',
      badge: 'verified' as const,
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400',
      name: 'Soft Sensory Play Mat (Used - Like New)',
      price: '฿420',
      badge: 'clean' as const,
    },
    {
      id: '7',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
      name: 'Baby Monitor with Night Vision & App',
      price: '฿1,850',
      badge: 'verified' as const,
    },
    {
      id: '8',
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400',
      name: 'Stroller Organizer with Cup Holders',
      price: '฿380',
      badge: 'verified' as const,
    },
    {
      id: '9',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400',
      name: 'Organic Baby Lotion & Diaper Cream',
      price: '฿520',
      badge: 'verified' as const,
    },
    {
      id: '10',
      image: 'https://images.unsplash.com/photo-1670453138643-a608e90b6bc9?w=400',
      name: 'Stacking Cups & Nesting Toys Set',
      price: '฿340',
      badge: 'verified' as const,
    },
    {
      id: '11',
      image: 'https://images.unsplash.com/photo-1633379204542-430941769df3?w=400',
      name: 'Convertible Car Seat (Used - 2 years)',
      price: '฿2,800',
      badge: 'clean' as const,
    },
    {
      id: '12',
      image: 'https://images.unsplash.com/photo-1744424945702-d9b8927c3f59?w=400',
      name: 'Swaddle Blanket Set - Muslin Cotton',
      price: '฿580',
      badge: 'verified' as const,
    },
    {
      id: '13',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
      name: 'Baby Food Maker & Steamer',
      price: '฿1,450',
      badge: 'verified' as const,
    },
    {
      id: '14',
      image: 'https://images.unsplash.com/photo-1670453138643-a608e90b6bc9?w=400',
      name: 'Activity Gym & Play Mat with Mobile',
      price: '฿920',
      badge: 'verified' as const,
    },
    {
      id: '15',
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400',
      name: 'Diaper Bag Backpack with Changing Pad',
      price: '฿780',
      badge: 'verified' as const,
    },
    {
      id: '16',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400',
      name: 'Baby Bath Tub with Temperature Sensor',
      price: '฿680',
      badge: 'verified' as const,
    },
  ];

  const featuredCollections = [
    { title: 'New Parent Essentials', items: 24, image: 'https://images.unsplash.com/photo-1664819361293-dc828072ffcc?w=300' },
    { title: 'Teething Relief', items: 12, image: 'https://images.unsplash.com/photo-1549633564-3ab4c92ff2d3?w=300' },
    { title: 'Sleep Solutions', items: 18, image: 'https://images.unsplash.com/photo-1559035843-e20a3b69c7a1?w=300' },
  ];

  return (
    <>
      <div className="flex-1 overflow-auto pb-20">
        {/* Header with gradient and logo */}
        <div className="bg-gradient-to-b from-[#F7FBFF] to-white px-4 pt-4 pb-3">
          <div className="mb-3">
            <Logo size="medium" />
          </div>
          <h2 className="mb-3 text-[#222]">Discover for Your Little One</h2>
          <SearchField 
            placeholder="Search products & services..." 
            withFilters 
            onFilterClick={() => {
              toast.info('Opening advanced filters...', {
                description: 'Filter by age, price, brand, and more',
              });
            }}
          />
        </div>

        {/* Filter pills - sticky */}
        <div className="sticky top-0 glass-blur bg-white/95 z-10 px-4 py-3 border-b border-[#E9ECF2] shadow-sm">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {filters.map((filter) => (
              <PillFilter
                key={filter}
                label={filter}
                active={activeFilter === filter}
                onClick={() => {
                  setActiveFilter(filter);
                  toast.success(`Showing ${filter.toLowerCase()} items`);
                }}
              />
            ))}
          </div>
        </div>

        {/* Services row */}
        <div className="px-4 py-4">
          <h3 className="mb-3 text-[#222]">Quick Services</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {services.map((service, index) => (
              <ServiceTile
                key={index}
                icon={service.icon}
                label={service.label}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>

        {/* Promo banner */}
        <div className="px-4 py-2">
          <button
            onClick={() => {
              toast.info('Age-based recommendations', {
                description: 'Products curated for 3-6 month developmental stage',
              });
            }}
            className="w-full bg-gradient-to-r from-[#E6B8FF]/20 to-[#6BBEFF]/20 rounded-2xl p-4 border border-[#E6B8FF]/30 text-left hover:shadow-sm transition-all tap-highlight"
          >
            <p className="text-sm text-[#222]">
              <span className="bg-[#E6B8FF] text-white px-2 py-0.5 rounded-full text-xs mr-2">
                3–6 months
              </span>
              Carefully curated essentials for your baby's developmental stage
            </p>
          </button>
        </div>

        {/* Featured Collections */}
        <div className="px-4 py-4">
          <h3 className="mb-3 text-[#222]">Featured Collections</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {featuredCollections.map((collection, i) => (
              <button
                key={i}
                onClick={() => {
                  toast.info(collection.title, {
                    description: `${collection.items} products curated for you`,
                  });
                }}
                className="flex-shrink-0 w-48 rounded-2xl overflow-hidden border border-[#E9ECF2] shadow-sm hover:shadow-md transition-all tap-highlight"
              >
                <div className="h-32 overflow-hidden">
                  <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 bg-white">
                  <p className="text-sm text-[#222] mb-1">{collection.title}</p>
                  <p className="text-xs text-[#666]">{collection.items} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#222]">Popular Products</h3>
            <button 
              onClick={() => {
                toast.info('Loading more products...');
              }}
              className="text-xs text-[#6BBEFF] tap-highlight"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>

        {/* Used listing CTA */}
        <div className="px-4 py-4">
          <button
            className="w-full bg-white border-2 border-dashed border-[#6BBEFF] rounded-2xl p-4 flex items-center justify-center gap-2 text-[#6BBEFF] hover:bg-[#6BBEFF]/5 transition-all duration-200 tap-highlight"
            onClick={() => {
              toast.success('Opening seller form...', {
                description: 'KYC verification ensures a safe, trusted marketplace',
              });
            }}
          >
            <Plus size={20} />
            Sell Your Gently Used Baby Items
          </button>
          <p className="text-xs text-center text-[#666] mt-2">
            KYC verified sellers only • Hygiene certified • Recall alerts included
          </p>
        </div>

        {/* Featured brands section */}
        <div className="px-4 py-3 pb-6">
          <h3 className="mb-3 text-[#222]">Trusted Brands</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {['Organic Baby', 'Little Sprouts', 'Pure Care', 'Happy Tots', 'Nature Kids', 'Gentle Touch', 'Baby Bliss', 'Tiny Treasures', 'Eco Baby', 'Sweet Dreams'].map((brand) => (
              <button
                key={brand}
                onClick={() => {
                  toast.info(`${brand}`, {
                    description: 'Viewing all products from this brand',
                  });
                }}
                className="px-4 py-2 bg-white rounded-xl border border-[#E9ECF2] shadow-sm text-sm text-[#666] whitespace-nowrap tap-highlight hover:border-[#6BBEFF] transition-all"
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Today's Deals */}
        <div className="px-4 py-3 pb-6">
          <h3 className="mb-3 text-[#222]">Today's Deals 🔥</h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                toast.success('Deal activated!', {
                  description: 'Added to your cart with discount',
                });
              }}
              className="w-full bg-gradient-to-r from-[#FFA78B]/10 to-[#FFA78B]/5 rounded-2xl p-4 border border-[#FFA78B]/30 hover:shadow-md transition-all tap-highlight text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-[#222] mb-1">Buy 2 Get 1 Free - Organic Diapers</p>
                  <p className="text-xs text-[#666]">Ends in 4 hours</p>
                </div>
                <span className="text-lg text-[#FFA78B]">50% OFF</span>
              </div>
            </button>
            <button
              onClick={() => {
                toast.success('Deal activated!', {
                  description: 'Added to your cart with discount',
                });
              }}
              className="w-full bg-gradient-to-r from-[#FFA78B]/10 to-[#FFA78B]/5 rounded-2xl p-4 border border-[#FFA78B]/30 hover:shadow-md transition-all tap-highlight text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-[#222] mb-1">Flash Sale - Baby Monitors</p>
                  <p className="text-xs text-[#666]">Limited stock</p>
                </div>
                <span className="text-lg text-[#FFA78B]">30% OFF</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAskCopilot={() => {
            setSelectedProduct(null);
            toast.success('Opening Copilot...', {
              description: 'Ask me anything about this product',
            });
          }}
        />
      )}

      {selectedService && (
        <ServiceBookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onConfirm={() => {
            setSelectedService(null);
            toast.success('Appointment booked!', {
              description: 'Added to your Care Dashboard',
            });
          }}
        />
      )}
    </>
  );
}
