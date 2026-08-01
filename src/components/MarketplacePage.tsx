import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Tag, 
  Plus, 
  X, 
  Check, 
  ChevronRight, 
  MapPin, 
  User, 
  Mail, 
  Grid, 
  Filter, 
  Sparkles,
  Search,
  BookOpen,
  Trash2,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import logoBadge from '../assets/images/ochil_logo_badge_1785148841944.jpg';

export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'INSTRUMENT' | 'ACCESSORY' | 'FREE_SWAP';
  price: string;
  condition: string;
  sellerName: string;
  sellerContact: string;
  description: string;
  imageUrl?: string;
  isCustomUploaded?: boolean;
}

interface MarketplacePageProps {
  onOpenContact: () => void;
  onNavigateHome?: () => void;
  isEmbedded?: boolean;
  isAdminMode?: boolean;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onOpenContact, onNavigateHome, isEmbedded = false, isAdminMode = false }) => {
  // Items state
  const [items, setItems] = useState<MarketplaceItem[]>([
    {
      id: 'm-1',
      title: 'Kala KA-15S Satin Mahogany Soprano Ukulele',
      category: 'INSTRUMENT',
      price: '£35',
      condition: 'Excellent (Like New)',
      sellerName: 'Pauline Sutton (Committee)',
      sellerContact: 'pauline@ochilstrummers.org.uk',
      description: 'Perfect beginner ukulele. Satin mahogany finish with high-quality Aquila Nylgut strings installed. Comes with a padded black gig bag. Selling to upgrade to a tenor.',
      imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'm-2',
      title: 'Snark HZ-1 Clip-on Ukulele & Guitar Tuner',
      category: 'ACCESSORY',
      price: '£8',
      condition: 'Good (Working Perfect)',
      sellerName: 'Duncan Fraser',
      sellerContact: 'duncan@example.com',
      description: 'Super accurate hertz tuner that clips onto the headstock. Bright multi-colour display. Battery included and recently replaced. Great for tuning up during noisy rehearsals.',
      imageUrl: 'https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'm-3',
      title: 'Solid Maple Folding Ukulele Stand',
      category: 'ACCESSORY',
      price: '£12',
      condition: 'Very Good',
      sellerName: 'Hamish Dewar',
      sellerContact: 'hamish@example.com',
      description: 'Beautifully finished real maple wood A-frame stand. Folds completely flat to fit inside a backpack. Padded foam arms protect the ukulele varnish.',
      imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'm-4',
      title: 'Mahalo Soprano Ukulele (Red)',
      category: 'FREE_SWAP',
      price: 'FREE',
      condition: 'Fair (A few scuffs)',
      sellerName: 'Alva Rehearsal Hall Spares',
      sellerContact: 'committee@ochilstrummers.org.uk',
      description: 'Given away to any complete beginner looking to try strumming. Fully playable, standard tuning. Free to a good home or swap for a packet of chocolate biscuits for halftime break!',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'm-5',
      title: 'Premium Adjustable Ukulele Strap (Thistle Pattern)',
      category: 'ACCESSORY',
      price: '£6',
      condition: 'Brand New',
      sellerName: 'Fiona MacLeod',
      sellerContact: 'fiona@example.com',
      description: 'Adjustable neck strap with beautiful purple thistle embroidery. Double leather ends. No strap buttons required — clips onto the soundhole.',
      imageUrl: 'https://images.unsplash.com/photo-1611604548018-d56b73761a5b?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'INSTRUMENT' | 'ACCESSORY' | 'FREE_SWAP'>('ALL');

  // New Listing Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'INSTRUMENT' | 'ACCESSORY' | 'FREE_SWAP'>('INSTRUMENT');
  const [newPrice, setNewPrice] = useState('');
  const [newCondition, setNewCondition] = useState('Excellent');
  const [newSellerName, setNewSellerName] = useState('');
  const [newSellerContact, setNewSellerContact] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string>('');

  // Contact Seller State
  const [contactedItem, setContactedItem] = useState<MarketplaceItem | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSellerName.trim() || !newSellerContact.trim()) return;

    const finalImage = uploadedImageBase64 || newImageUrl.trim() || undefined;

    const newItem: MarketplaceItem = {
      id: 'm-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      price: newPrice.trim() || 'FREE',
      condition: newCondition,
      sellerName: newSellerName.trim(),
      sellerContact: newSellerContact.trim(),
      description: newDescription.trim(),
      imageUrl: finalImage,
      isCustomUploaded: true
    };

    setItems([newItem, ...items]);
    setShowAddModal(false);

    // Reset Form
    setNewTitle('');
    setNewCategory('INSTRUMENT');
    setNewPrice('');
    setNewCondition('Excellent');
    setNewSellerName('');
    setNewSellerContact('');
    setNewDescription('');
    setNewImageUrl('');
    setUploadedImageBase64('');
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this marketplace listing?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Handler for custom image upload file
  const handleImageUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImageBase64(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContactSellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactedItem(null);
      setContactMessage('');
    }, 3000);
  };

  return (
    <div className={`bg-[#F4F2E9] text-[#1A1A1A] ${isEmbedded ? '' : 'min-h-screen'}`}>
      
      {/* 1. Page Header (Matching Banner Format) */}
      {!isEmbedded && (
        <section className="relative bg-[#3A1554] text-white py-6 sm:py-8 border-b border-purple-900/40">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left Column: Title and text */}
              <div className="max-w-3xl space-y-2 text-left">
                <div className="inline-block bg-purple-900/60 text-purple-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-purple-700/50 mb-1">
                  OCHIL SWAP &amp; SELL
                </div>
                <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
                  Member Marketplace
                </h1>
                <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                  Browse pre-loved ukuleles, accessories, and songbooks uploaded by our club members. Sell your unused gear or find an upgrade!
                </p>
              </div>

              {/* Right Column: Logo in line with writing */}
              <div className="shrink-0">
                <img
                  src={logoBadge}
                  alt="Ochil Strummers Logo"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/20 shadow-lg object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 2. Main Body */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search, Filter & Add Row */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: 'ALL', label: 'All Items' },
              { id: 'INSTRUMENT', label: 'Ukuleles & Instruments' },
              { id: 'ACCESSORY', label: 'Accessories' },
              { id: 'FREE_SWAP', label: 'Free' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#3A1554] text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input + Post Button */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search marketplace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:border-[#3A1554] focus:ring-1 focus:ring-[#3A1554] text-xs outline-none bg-gray-50/50"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Item</span>
            </button>
          </div>

        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Header Tag + Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    item.category === 'INSTRUMENT'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : item.category === 'ACCESSORY'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-green-100 text-green-800 border border-green-200'
                  }`}>
                    {item.category === 'INSTRUMENT' ? 'Instrument' : item.category === 'ACCESSORY' ? 'Accessory' : 'Free'}
                  </span>
                  
                  <span className="text-sm font-bold text-gray-400">
                    {item.condition}
                  </span>
                </div>

                {/* Optional Listing Image */}
                {item.imageUrl && (
                  <div className="w-full h-44 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Title */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#3A1554] leading-snug">
                    {item.title}
                  </h3>
                  <div className="inline-flex items-center gap-1 text-[#596C34] font-extrabold text-lg mt-1">
                    <Tag className="w-4 h-4" />
                    <span>{item.price}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Seller Detail Block */}
                <div className="bg-[#F4F2E9]/80 border border-gray-200/50 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-[#3A1554] flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-gray-800">{item.sellerName}</div>
                    <div className="text-[10px] text-gray-500">{item.sellerContact}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() => setContactedItem(item)}
                  className="flex-1 bg-[#3A1554] hover:bg-[#2A0F3D] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>Contact Seller</span>
                </button>
                {isAdminMode && (
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-700">No matching items found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try resetting your filters or adjusting your search term to see other items available in the community.
              </p>
            </div>
          )}
        </div>

        {/* 3. Recommended Beginner Gear Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6 text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-green-100 text-[#596C34] text-xs font-extrabold px-3 py-1 rounded-full uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMITTEE PICKS FOR BEGINNERS</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#3A1554]">
              Recommended Ukulele Gear for Beginners
            </h3>
            <p className="text-xs text-gray-600">
              New to the instrument? The Ochil Strummers committee recommends starting with these highly reliable, cost-effective options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-100 bg-[#F4F2E9]/45 p-5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#3A1554] flex items-center justify-center font-bold">1</div>
              <h4 className="font-serif font-bold text-base text-[#3A1554]">Soprano or Concert Ukulele</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We highly recommend the <strong>Kala KA-15S (Soprano)</strong> or <strong>Kala KA-C (Concert)</strong>. These are beautiful mahogany laminate ukuleles that hold tune remarkably well and offer rich tone for around £50–£75.
              </p>
            </div>

            <div className="border border-gray-100 bg-[#F4F2E9]/45 p-5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#3A1554] flex items-center justify-center font-bold">2</div>
              <h4 className="font-serif font-bold text-base text-[#3A1554]">Clip-On Tuner</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                A headstock tuner is essential for quick tuning during rehearsals. The <strong>Snark SN-6X Ukulele Tuner</strong> (approx. £12) is highly visual, fully rotational, and accurate even in a noisy pub room environment.
              </p>
            </div>

            <div className="border border-gray-100 bg-[#F4F2E9]/45 p-5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#3A1554] flex items-center justify-center font-bold">3</div>
              <h4 className="font-serif font-bold text-base text-[#3A1554]">Felt Plectrums &amp; Gig Bags</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Standard guitar picks can damage ukulele strings. If you prefer to use a pick, use <strong>soft wool felt plectrums</strong> for a warmer, traditional strumming sound. Always keep your instrument in a padded gig bag to safeguard against drops.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ================= MODAL: MEMBER POSTS NEW ITEM ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto animate-fade-in text-left">
            
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 bg-purple-100 text-[#3A1554] text-xs font-bold px-3 py-1 rounded-full uppercase">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>POST A CLASSIFIED AD</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#3A1554]">
                List an Item on Marketplace
              </h3>
              <p className="text-xs text-gray-600">
                Are you upgrading, selling accessories, or have a spare ukulele to lend/give away? Fill out this form to share with Ochil Strummers members.
              </p>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Item Name / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vintage Concert Ukulele with gig bag"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm font-bold text-[#3A1554]"
                  >
                    <option value="INSTRUMENT">Ukulele / Instrument</option>
                    <option value="ACCESSORY">Accessory (Tuner, Case, Strap, Stand)</option>
                    <option value="FREE_SWAP">Free Giveaway / Borrow / Swap</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Asking Price (or FREE / SWAP)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. £45 or FREE"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Condition
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Excellent / Good / Fair"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gordon Campbell"
                    value={newSellerName}
                    onChange={(e) => setNewSellerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Contact Information (Email or Mobile)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. gordon@example.com or 07712 345678"
                  value={newSellerContact}
                  onChange={(e) => setNewSellerContact(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description / Bullet Points
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell buyers more about the item, why you are selling, any minor cosmetic defects, and if you can bring it to Monday rehearsals."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Item Picture (Upload File or Enter URL)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-[#3A1554] px-4 py-2.5 rounded-xl border border-purple-200 text-xs font-bold cursor-pointer transition-colors">
                      <Camera className="w-4 h-4" />
                      <span>Select Photo File...</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUploadChange}
                        className="hidden"
                      />
                    </label>
                    {uploadedImageBase64 && (
                      <span className="text-xs text-green-600 flex items-center gap-1 font-bold">
                        <Check className="w-4 h-4" /> Photo Loaded!
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">OR URL:</span>
                    <input
                      type="url"
                      placeholder="https://example.com/ukulele.jpg"
                      value={newImageUrl}
                      onChange={(e) => {
                        setNewImageUrl(e.target.value);
                        if (e.target.value) setUploadedImageBase64('');
                      }}
                      className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Publish Ad</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL: CONTACT SELLER INQUIRY ================= */}
      {contactedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative text-left animate-fade-in">
            
            <button
              onClick={() => setContactedItem(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!contactSubmitted ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-purple-100 text-[#3A1554] text-xs font-bold px-3 py-1 rounded-full uppercase">
                    <Mail className="w-3.5 h-3.5" />
                    <span>INQUIRE ABOUT ITEM</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#3A1554]">
                    Contact {contactedItem.sellerName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Send a quick inquiry regarding <strong>"{contactedItem.title}"</strong> ({contactedItem.price}).
                  </p>
                </div>

                <form onSubmit={handleContactSellerSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={`e.g. Hi ${contactedItem.sellerName.split(' ')[0]}, I'm interested in your ${contactedItem.title}. Can you bring it along to the next Monday session at Johnstone Arms? Thanks!`}
                      className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:bg-white focus:outline-none focus:border-[#3A1554] text-xs leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#3A1554] hover:bg-[#2A0F3D] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-amber-300" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-100 text-[#596C34] flex items-center justify-center mx-auto border border-green-300">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold font-serif text-[#3A1554]">Inquiry Sent!</h3>
                <p className="text-xs text-gray-600 leading-normal max-w-xs mx-auto">
                  Your message has been dispatched to <strong>{contactedItem.sellerName}</strong> at <strong>{contactedItem.sellerContact}</strong>. They will respond to you shortly!
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
