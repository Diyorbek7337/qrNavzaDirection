import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Instagram, Send, Star, X } from 'lucide-react';
import { database, auth } from './firebase';
import { ref, set, get, runTransaction } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import Logo from "../public/Ресу22рс 3.png"
import Gamburger from "./assets/image/burger.png"
import BigGamburger from "./assets/image/bigburger.png"
import Chizburger from "./assets/image/cheeseburger.png"
import BigChizburger from "./assets/image/bigcheeseburger.png"
import Lavash from "./assets/image/minilavash.png"
import Lavashchiz from "./assets/image/lavashcheese.png"
import Tandirlavash from "./assets/image/tandirlavash.png"
import Kattatandir from "./assets/image/kattatandir.png"
import Oddiy from "./assets/image/hotdogoddiy.png"
import Korolevskiy from "./assets/image/korolevskiy.png"
import Chizdog from "./assets/image/chizdog.png"
import Triple from "./assets/image/triple.png"
import Gushtlihotdog from "./assets/image/gushtlihotdog.jpg"
import NavzaPizza from "./assets/image/navzapizza.png"
import Tanduri from "./assets/image/tanduri.jpg"
import Barbekyu from "./assets/image/barbekyupizza.jpg"
import Klab from "./assets/image/klab.jpg"
import Donar from "./assets/image/donar.jpg"
import Mikspizza from "./assets/image/mikspizza.png"
import Pitta from "./assets/image/pitta.jpg"
import Sosiska from "./assets/image/sosiska.png"
import Fri from "./assets/image/fri.png"
import SosiskaFri from "./assets/image/sosiskafri.png"
import Chesnochniy from "./assets/image/chesnochniy.png"
import Sirniy from "./assets/image/sirniy.png"
import Gosht4 from "./assets/image/4gosht.png"
import Cola from "./assets/image/cola.png"
import Fanta from "./assets/image/fanta.png"
import Sprite from "./assets/image/sprite.png"
import ArkTea from "./assets/image/arktea.png"
import Barf from "./assets/image/barf.png"
import Sezar from "./assets/image/sezar.png"
import Olivye from "./assets/image/olivye.png"
import Mujskoy from "./assets/image/mujskoy.png"
import Margarita from "./assets/image/margarita.png"
import TovuqGrudinkasi from "./assets/image/tovuqgrudinkasi.png"
import Snikers from "./assets/image/snikers.png"
import Cheesecake from "./assets/image/cheesecake.jpg"
import Blinroll from "./assets/image/Blinroll.jpg"
import Kurasan from "./assets/image/kurasan.jpg"
import Blinniy from "./assets/image/blinniy.png"
import Kiyevskiy from "./assets/image/kiyevskiy.png"
import KlubnikaiBanan from "./assets/image/klubnika.png"
import Twister from "./assets/image/twister.png"
import Kivi from "./assets/image/kivi.jpg"
import Qulupnay from "./assets/image/qulupnay.png"
import Ocean from "./assets/image/ocean.png"

export default function NavzaLoungeMenu() {
  const [activeCategory, setActiveCategory] = useState('burger');
  const [ratings, setRatings] = useState({});
  const [userRatings, setUserRatings] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratingModal, setRatingModal] = useState({ show: false, item: null, category: null });

  // User authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        loadUserRatings(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // Ratinglarni yuklash
  useEffect(() => {
    loadAllRatings();
  }, []);

  const loadAllRatings = async () => {
    try {
      const ratingsRef = ref(database, 'ratings');
      const snapshot = await get(ratingsRef);
      if (snapshot.exists()) {
        setRatings(snapshot.val());
      }
      setLoading(false);
    } catch (error) {
      console.error('Rating yuklashda xato:', error);
      setLoading(false);
    }
  };

  const loadUserRatings = async (uid) => {
    try {
      const userRatingsRef = ref(database, `userRatings/${uid}`);
      const snapshot = await get(userRatingsRef);
      if (snapshot.exists()) {
        setUserRatings(snapshot.val());
      }
    } catch (error) {
      console.error('User ratinglarni yuklashda xato:', error);
    }
  };

  // Rating berish
  const handleRating = async (itemName, category, stars) => {
    if (!userId) {
      alert('Iltimos, kuting...');
      return;
    }

    const itemKey = `${category}_${itemName.replace(/\s/g, '_')}`;

    // Foydalanuvchi allaqachon baholagan bo'lsa
    if (userRatings[itemKey]) {
      alert('Siz bu ovqatni allaqachon baholagansiz!');
      return;
    }

    try {
      // Transaction bilan ratingni yangilash (race condition'dan saqlaydi)
      const ratingRef = ref(database, `ratings/${itemKey}`);
      
      await runTransaction(ratingRef, (currentData) => {
        if (currentData === null) {
          return {
            total: stars,
            count: 1,
            average: stars
          };
        } else {
          const newTotal = currentData.total + stars;
          const newCount = currentData.count + 1;
          return {
            total: newTotal,
            count: newCount,
            average: newTotal / newCount
          };
        }
      });

      // Foydalanuvchining ratingini saqlash
      const userRatingRef = ref(database, `userRatings/${userId}/${itemKey}`);
      await set(userRatingRef, stars);

      // Local state'ni yangilash
      setUserRatings(prev => ({ ...prev, [itemKey]: stars }));
      
      // Ratinglarni qayta yuklash
      await loadAllRatings();

      alert(`Rahmat! Siz ${stars} yulduz berdingiz 🌟`);
    } catch (error) {
      console.error('Rating saqlashda xato:', error);
      alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    }
  };

  const openRatingModal = (itemName, category) => {
    const itemKey = `${category}_${itemName.replace(/\s/g, '_')}`;
    if (userRatings[itemKey]) {
      alert('Siz bu ovqatni allaqachon baholagansiz!');
      return;
    }
    setRatingModal({ show: true, item: itemName, category });
  };

  const closeRatingModal = () => {
    setRatingModal({ show: false, item: null, category: null });
  };

  // Yulduzlarni render qilish
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="absolute w-4 h-4 text-gray-300" />
            <div className="absolute w-2 overflow-hidden">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  // Interactive stars
  const RatingStars = ({ onRate }) => {
    const [hover, setHover] = useState(0);
    
    return (
      <div className="flex justify-center gap-2 my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onRate(star)}
            className="transition-transform hover:scale-125"
          >
            <Star 
              className={`w-10 h-10 ${
                star <= hover 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

 const menuItems = {
    burger: [
      { name: "Gamburger", price: "32 000", image: Gamburger },
      { name: "Big Burger", price: "43 000", image: BigGamburger },
      { name: "Chizburger", price: "35 000", image: Chizburger },
      { name: "Big Chizburger", price: "48 000", image: BigChizburger },
    ],
    lavash: [
      { name: "Mini", price: "30 000", image: Lavash },
      { name: "Mini Pishloqli", price: "33 000", image: Lavashchiz },
      { name: "Oddiy", price: "34 000", image: Lavash },
      { name: "Oddiy Pishloqli", price: "37 000", image: Lavashchiz },
      { name: "Katta", price: "60 000", image: Lavash },
      { name: "Tandir", price: "39 000", image: Tandirlavash },
      { name: "Katta Tandir", price: "61 000", image: Kattatandir }
    ],
    hotdog: [
      { name: "Oddiy", price: "19 000", image: Oddiy },
      { name: "Korolevskiy", price: "24 000", image: Korolevskiy },
      { name: "Chizdog", price: "22 000", image: Chizdog },
      { name: "Tripl", price: "26 000", image: Triple },
      { name: "Go'shtli", price: "32 000", image: Gushtlihotdog }
    ],
    pizza: [
      { 
        name: "NAVZA", 
        desc: "pishloq, sous, pomidor, qizil piyoz, qo'ziqorin, go'sht",
        image: NavzaPizza,
        sizes: [
          { size: "30 sm", price: "94 000" },
          { size: "35 sm", price: "104 000" },
          { size: "40 sm", price: "130 000" }
        ]
      },
      { 
        name: "MARGARITA", 
        desc: "pishloq, sous, pomidor, zaytun",
        image: Margarita,
        sizes: [
          { size: "30 sm", price: "52 000" },
          { size: "35 sm", price: "62 000" },
          { size: "40 sm", price: "70 000" }
        ]
      },
      { 
        name: "TOVUQ GRUDINKASI", 
        desc: "pishloq, sous, pomidor, bolgarskiy tovuq go'sht",
        image: TovuqGrudinkasi,
        sizes: [
          { size: "30 sm", price: "74 000" },
          { size: "35 sm", price: "84 000" },
          { size: "40 sm", price: "121 000" }
        ]
      },
      { 
        name: "PEPPERONI", 
        desc: "pishloq, sous, kolbasa",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
        sizes: [
          { size: "30 sm", price: "74 000" },
          { size: "35 sm", price: "94 000" },
          { size: "40 sm", price: "110 000" }
        ]
      },
      { 
        name: "MIKS BUYUK", 
        desc: "pishloq, sous, pomidor, bolgarskiy, makkajo'xori, qo'ziqorin, sosiska, vetchina, go'sht, zaytun, indeyka",
        image: Mikspizza,
        sizes: [
          { size: "45 sm", price: "150 000" }
        ]
      },
      { 
        name: "MAFIA", 
        desc: "pishloq, sous, pomidor, bolgarskiy, makkajo'xori, qo'ziqorin, go'sht, tovuq go'sht",
        image: Barbekyu,
        sizes: [
          { size: "40 sm", price: "130 000" },
          { size: "45 sm", price: "150 000" }
        ]
      },
      { 
        name: "TANDURI", 
        desc: "pishloq, sous, kolbasa, sosiska",
        image:Tanduri,
        sizes: [
          { size: "30 sm", price: "90 000" },
          { size: "35 sm", price: "100 000" },
          { size: "40 sm", price: "120 000" }
        ]
      },
      { 
        name: "BARBEKYU", 
        desc: "pishloq, sous, go'sht, tovuq go'sht, qo'ziqorin",
        image: Barbekyu,
        sizes: [
          { size: "30 sm", price: "84 000" },
          { size: "35 sm", price: "94 000" },
          { size: "40 sm", price: "120 000" }
        ]
      },
       { 
        name: "MIKS", 
        desc: "pishloq, sous, go'sht, qo'ziqorin, pomidor, bolgarskiy, makkajo'xori, sosiska, vetchina",
        image: Mikspizza,
        sizes: [
          { size: "30 sm", price: "90 000" },
          { size: "35 sm", price: "100 000" },
          { size: "40 sm", price: "120 000" }
        ]
      },
       { 
        name: "4 GO'SHT", 
        desc: "pishloq, sous, go'sht, kolbasa, sosiska, vetchina",
        image: Gosht4,
        sizes: [
          { size: "30 sm", price: "87 000" },
          { size: "35 sm", price: "97 000" },
          { size: "40 sm", price: "120 000" }
        ]
      },
    
    ],
    pitta: [
      { name: "Oddiy", price: "36 000", image: Pitta },
      { name: "Mangal", price: "39 000", image: Pitta },
      { name: "Katta", price: "60 000", image: Pitta }
    ],
    donar: [
      { name: "O'rta", price: "30 000", image: Donar },
      { name: "Katta", price: "33 000", image: Donar }
    ],
    klab: [
      { name: "O'rta", price: "45 000", image: Klab }
    ],
    kfc: [
      { name: "Strips 0,5kg", price: "65 000", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop" },
      { name: "Strips 1kg", price: "110 000", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop" }
    ],
    twister: [
      { name: "Oddiy", price: "33 000", image: Twister },
      { name: "Pishloqli", price: "36 000", image: Twister }
    ],
    garnir: [
      { name: "Fri o'rta", price: "16 000", image: Fri },
      { name: "Fri katta", price: "20 000", image: Fri },
      { name: "Kotlet", price: "16 000", image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=400&h=300&fit=crop" },
      { name: "Sosiska", price: "5 000", image: Sosiska },
      { name: "Sosiska + Fri", price: "28 000", image: SosiskaFri },
      { name: "Chesnochniy sous", price: "2 000", image: Chesnochniy },
      { name: "Pishloq", price: "3 000", image: Sirniy }
    ],
    Salat: [
      { name: "Barf", price: "30 000", image: Barf },
      { name: "Sezar", price: "35 000", image: Sezar },
      { name: "Olivye", price: "25 000", image: Olivye },
      { name: "Mujskoy Kapriz", price: "40 000", image: Mujskoy }
    ],
    ichimlik: [
      { name: "Coca-Cola 0.5L", price: "8 000", image: Cola },
      { name: "Fanta 0.5L", price: "8 000", image: Fanta },
      { name: "Sprite 1.5L", price: "16 000", image: Sprite },
      { name: "Coca-Cola 1.5L", price: "16 000", image: Cola },
      { name: "Fanta 1.5L", price: "16 000", image: Fanta },
      { name: "Coca-Cola 1L", price: "12 000", image: Cola },
      { name: "Fanta 1L", price: "12 000", image: Fanta }, 
      { name: "Ark Tea 0.5L", price: "5 000", image: ArkTea },
      { name: "Ark Tea 1.25L", price: "10 000", image: ArkTea }
    ],
    desert: [
      { name: "Snikers", price: "33 000", image: Snikers },
      { name: "Cheesecake", price: "45 000", image: Cheesecake },
      { name: "Blin-Roll", price: "30 000", image: Blinroll },
      { name: "Kurasan", price: "36 000", image: Kurasan },
      { name: "Blinniy", price: "33 000", image: Blinniy },
      { name: "Kiyevskiy", price: "35 000", image: Kiyevskiy },
      { name: "Klubnika i Banan", price: "30 000", image: KlubnikaiBanan }
    ],
    ice: [
      { name: "Kivi", price: "15 000", image: Kivi },
      { name: "Qulupnay", price: "15 000", image: Qulupnay },
      { name: "Ocean", price: "15 000", image: Ocean }
    
    ]
  };

  const categories = {
    burger: { name: "Burger", icon: "🍔" },
    lavash: { name: "Lavash", icon: "🌯" },
    hotdog: { name: "Hot-Dog", icon: "🌭" },
    pizza: { name: "Pizza", icon: "🍕" },
    pitta: { name: "Pitta", icon: "🥙" },
    donar: { name: "Donar", icon: "🌮" },
    klab: { name: "Klab Sendvich", icon: "🥪" },
    kfc: { name: "KFC", icon: "🍗" },
    twister: { name: "Twister", icon: "🌯" },
    garnir: { name: "Garnir", icon: "🍟" },
    Salat: { name: "Salat", icon: "🥗" },
    ichimlik: { name: "Ichimlik", icon: "🥤" },
    desert: { name: "Desert", icon: "🍰" },
    ice: { name: "Ice Bar", icon: "🍧" }
  };

  const contactInfo = {
    phone: "77 110 00 88",
    instagram: "navza_lounge",
    telegram: "navza_lounge",
    address: "Sho'rchi tumani"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-gray-100">
      {/* Rating Modal */}
      {ratingModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl">
            <button
              onClick={closeRatingModal}
              className="absolute text-gray-400 top-4 right-4 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="pr-8 mb-2 text-2xl font-bold text-center text-gray-900">
              {ratingModal.item}
            </h3>
            <p className="mb-4 text-center text-gray-600">
              Ovqatni baholang
            </p>
            
            <RatingStars 
              onRate={(stars) => {
                handleRating(ratingModal.item, ratingModal.category, stars);
                closeRatingModal();
              }}
            />
            
            <button
              onClick={closeRatingModal}
              className="w-full px-4 py-2 mt-4 font-semibold text-gray-800 transition-all bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-6 text-white shadow-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-black">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-3">
            <div >
              <img className='logotip' src={Logo} alt='logo'/>
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-emerald-400">YOQIMLI ISHTAHA!</h2>
        </div>
      </div>

      <div className="max-w-4xl p-4 pb-8 mx-auto">
        {/* Menu Section */}
        <div className="p-6 mt-6 mb-6 bg-white border-2 shadow-2xl rounded-2xl border-emerald-100">
          <h2 className="mb-4 text-3xl font-bold text-center text-gray-900">
            📋 MENYU
          </h2>
          
          {/* Category Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-6 md:grid-cols-5">
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-2 rounded-xl font-bold text-sm transition-all ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <span className="block mb-1 text-xl">{cat.icon}</span>
                <span className="text-xs">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {menuItems[activeCategory]?.map((item, index) => {
              const itemKey = `${activeCategory}_${item.name.replace(/\s/g, '_')}`;
              const itemRating = ratings[itemKey] || { total: 0, count: 0, average: 0 };
              const userRated = userRatings[itemKey];
              
              return (
                <div
                  key={index}
                  className="overflow-hidden transition-all bg-white border-2 border-emerald-200 rounded-xl hover:border-emerald-500 hover:shadow-xl"
                >
                  {item.image && (
                    <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                      />
                      {/* Rating Badge */}
                      {itemRating.count > 0 && (
                        <div className="absolute px-2 py-1 rounded-lg shadow-md top-2 right-2 bg-white/90 backdrop-blur-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold text-gray-900">
                              {itemRating.average.toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({itemRating.count})
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{item.name}</h3>
                    
                    {/* Rating Display */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {renderStars(itemRating.average)}
                      </div>
                      {itemRating.count > 0 && (
                        <span className="text-xs text-gray-500">
                          {itemRating.count} baho
                        </span>
                      )}
                    </div>

                    {item.desc && (
                      <p className="mb-3 text-xs italic text-gray-600">{item.desc}</p>
                    )}
                    
                    {/* Prices */}
                    {item.sizes ? (
                      <div className="mb-3 space-y-2">
                        {item.sizes.map((sizeItem, sizeIndex) => (
                          <div key={sizeIndex} className="flex items-center justify-between p-2 border rounded-lg bg-emerald-50 border-emerald-200">
                            <span className="font-semibold text-gray-700">{sizeItem.size}</span>
                            <span className="font-bold text-emerald-600">{sizeItem.price} so'm</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-emerald-600">{item.price} so'm</span>
                      </div>
                    )}

                    {/* Rate Button */}
                    <button
                      onClick={() => openRatingModal(item.name, activeCategory)}
                      disabled={userRated || !userId}
                      className={`w-full font-semibold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                        userRated
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          : !userId
                          ? 'bg-gray-400 text-white cursor-wait'
                          : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                      {!userId ? 'Yuklanmoqda...' : userRated ? `Siz ${userRated} ⭐ berdingiz` : 'Baholash'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 mb-6 bg-white border-2 shadow-2xl rounded-2xl border-emerald-100">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">📞 Bog'lanish</h2>
          
          <div className="space-y-4">
            {/* Phone */}
            <a
              href={`tel:+998${contactInfo.phone.replace(/\s/g, '')}`}
              className="flex items-center p-4 transition-all border shadow-md bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:from-emerald-100 hover:to-teal-100 border-emerald-200"
            >
              <div className="p-3 mr-4 rounded-full bg-emerald-600">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Buyurtma uchun</p>
                <p className="text-xl font-bold text-gray-900">{contactInfo.phone}</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={`https://instagram.com/${contactInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 transition-all border border-pink-200 shadow-md bg-gradient-to-r from-pink-50 to-purple-100 rounded-xl hover:from-pink-100 hover:to-purple-200"
            >
              <div className="p-3 mr-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Instagram</p>
                <p className="font-bold text-gray-900">@{contactInfo.instagram}</p>
              </div>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/${contactInfo.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 transition-all border border-blue-200 shadow-md bg-gradient-to-r from-blue-50 to-cyan-100 rounded-xl hover:from-blue-100 hover:to-cyan-200"
            >
              <div className="p-3 mr-4 bg-blue-500 rounded-full">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Telegram</p>
                <p className="font-bold text-gray-900">@{contactInfo.telegram}</p>
              </div>
            </a>

            {/* Location */}
            <a
              href="https://maps.app.goo.gl/cEui8VAz45u6d3E37"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 transition-all border border-gray-200 shadow-md bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl hover:from-gray-100 hover:to-emerald-100"
            >
              <div className="p-3 mt-1 mr-4 bg-gray-800 rounded-full">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Manzil</p>
                <p className="font-bold text-gray-900">{contactInfo.address}</p>
                <p className="mt-1 text-xs text-gray-500">📍 Xaritada ko'rish</p>
              </div>
            </a>
          </div>
        </div>
        {/* Working Hours */}
         <div className="p-6 text-center text-white shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl">
          <h3 className="mb-2 text-2xl font-bold">⏰ Ish vaqti</h3>
          <p className="text-xl font-semibold">Har kuni: 11:00 - 02:00</p>
          <p className="mt-2 text-lg text-emerald-100">🚚 Yetkazib berish: 20-30 daqiqa</p>
        </div>

        {/* Footer Logo */}
        <div className="mt-6 text-center text-gray-700">
          <p className="text-sm font-semibold">🌿 NAVZA LOUNGE - MAZALI VA TEZ 🌿</p>
        </div>
        
      </div>
    </div>
  );
}