import { X, Calendar, Clock, MapPin, Phone, Star } from 'lucide-react';

interface ServiceBookingModalProps {
  service: {
    label: string;
    icon: any;
  };
  onClose: () => void;
  onConfirm: () => void;
}

export function ServiceBookingModal({ service, onClose, onConfirm }: ServiceBookingModalProps) {
  const providers = [
    {
      name: 'Bangkok Children\'s Hospital',
      distance: '2.3 km',
      rating: 4.9,
      reviews: 823,
      nextSlot: 'Today 2:00 PM',
      price: '฿800',
    },
    {
      name: 'Happy Kids Clinic',
      distance: '3.1 km',
      rating: 4.8,
      reviews: 612,
      nextSlot: 'Today 3:30 PM',
      price: '฿650',
    },
    {
      name: 'Smile Pediatrics',
      distance: '4.5 km',
      rating: 4.7,
      reviews: 445,
      nextSlot: 'Tomorrow 10:00 AM',
      price: '฿750',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-auto animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E9ECF2] px-4 py-3 flex items-center justify-between z-10">
          <h3 className="text-[#222]">Book {service.label}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors tap-highlight"
          >
            <X size={20} className="text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-[#666] mb-4">
            Select a verified healthcare provider near you
          </p>

          {/* Provider List */}
          <div className="space-y-3">
            {providers.map((provider, i) => (
              <button
                key={i}
                onClick={onConfirm}
                className="w-full bg-white border border-[#E9ECF2] rounded-2xl p-4 hover:border-[#6BBEFF] hover:shadow-md transition-all duration-200 tap-highlight text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm text-[#222] mb-1">{provider.name}</h4>
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={12} className="text-yellow-400" fill="#FACC15" />
                      <span className="text-xs text-[#666]">
                        {provider.rating} ({provider.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-[#6BBEFF]">{provider.price}</span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-[#666]">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{provider.distance} away</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>Next: {provider.nextSlot}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#E9ECF2] flex gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    ✓ Licensed
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    ✓ Insurance
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    ✓ English
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Filter Options */}
          <div className="mt-4 pt-4 border-t border-[#E9ECF2]">
            <button className="text-sm text-[#6BBEFF] tap-highlight">
              Filter by distance, price, or availability →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
