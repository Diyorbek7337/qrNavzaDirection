import React, { useState } from 'react';
import { Phone, MapPin, Instagram, Send } from 'lucide-react';
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
import Gushtlihotdog from "./assets/image/gushtlihotdog.png"
import NavzaPizza from "./assets/image/navzapizza.png"
import Tanduri from "./assets/image/tanduri.png"
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

export default function NavzaLoungeMenu() {
  const [activeCategory, setActiveCategory] = useState('burger');

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
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
        sizes: [
          { size: "30 sm", price: "52 000" },
          { size: "35 sm", price: "62 000" },
          { size: "40 sm", price: "70 000" }
        ]
      },
      { 
        name: "TOVUQ GRUDINKASI", 
        desc: "pishloq, sous, pomidor, bolgarskiy tovuq go'sht",
        image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&h=300&fit=crop",
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
      { 
        name: "4 FASL", 
        desc: "pishloq, sous, go'sht, kolbasa, sosiska, zaytun",
        image: Mikspizza,
        sizes: [
          { size: "30 sm", price: "90 000" },
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
      { name: "Oddiy", price: "33 000", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop" },
      { name: "Pishloqli", price: "36 000", image: "https://images.unsplash.com/photo-1599974789926-3e25a5fdc8e2?w=400&h=300&fit=crop" }
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
      { name: "Snikers", price: "35 000", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop" },
      { name: "Cheesecake", price: "45 000", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
      { name: "Bell-Roll", price: "20 000", image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=400&h=300&fit=crop" }
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
    desert: { name: "Desert", icon: "🍰" }
  };

  const contactInfo = {
    phone: "77 110 00 88",
    instagram: "navza_lounge",
    telegram: "navza_lounge",
    address: "Sho'rchi tumani"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-black-500 to-orange-600">
      {/* Header */}
      <div className="p-6 text-white shadow-2xl bg-gradient-to-r from-yellow-900 to-orange-600">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="px-6 py-3 bg-gray-900 rounded-lg">
              <img className='logotip' src={Logo} alt='logo'/>
            </div>
          </div>
          <h2 className="mt-2 text-2xl font-bold">YOQIMLI ISHTAHA!</h2>
        </div>
      </div>

      <div className="max-w-4xl p-4 pb-8 mx-auto">
        {/* Menu Section */}
        <div className="p-6 mt-6 mb-6 bg-white shadow-2xl rounded-2xl">
          <h2 className="mb-4 text-3xl font-bold text-center text-orange-600">
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
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                    : 'bg-orange-100 text-gray-700 hover:bg-orange-200'
                }`}
              >
                <span className="block mb-1 text-xl">{cat.icon}</span>
                <span className="text-xs">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {menuItems[activeCategory].map((item, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all bg-white border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-xl"
              >
                {item.image && (
                  <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold text-gray-800">{item.name}</h3>
                  {item.desc && (
                    <p className="mb-3 text-xs italic text-gray-600">{item.desc}</p>
                  )}
                  
                  {/* If item has sizes (for pizza) */}
                  {item.sizes ? (
                    <div className="space-y-2">
                      {item.sizes.map((sizeItem, sizeIndex) => (
                        <div key={sizeIndex} className="flex items-center justify-between p-2 rounded-lg bg-orange-50">
                          <span className="font-semibold text-gray-700">{sizeItem.size}</span>
                          <span className="font-bold text-orange-600">{sizeItem.price} so'm</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Regular items with single price */
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-600">{item.price} so'm</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-6 mb-6 bg-white shadow-2xl rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">📞 Bog'lanish</h2>
          
          <div className="space-y-4">
            {/* Phone */}
            <a
              href={`tel:+998${contactInfo.phone.replace(/\s/g, '')}`}
              className="flex items-center p-4 transition-all shadow-md bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200"
            >
              <div className="p-3 mr-4 bg-green-500 rounded-full">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Buyurtma uchun</p>
                <p className="text-xl font-bold text-gray-800">{contactInfo.phone}</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={`https://instagram.com/${contactInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 transition-all shadow-md bg-gradient-to-r from-pink-50 to-purple-100 rounded-xl hover:from-pink-100 hover:to-purple-200"
            >
              <div className="p-3 mr-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Instagram</p>
                <p className="font-bold text-gray-800">@{contactInfo.instagram}</p>
              </div>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/${contactInfo.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 transition-all shadow-md bg-gradient-to-r from-blue-50 to-cyan-100 rounded-xl hover:from-blue-100 hover:to-cyan-200"
            >
              <div className="p-3 mr-4 bg-blue-500 rounded-full">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Telegram</p>
                <p className="font-bold text-gray-800">@{contactInfo.telegram}</p>
              </div>
            </a>

            {/* Location */}
            <a
              href="https://maps.google.com/?q=Tashkent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 transition-all shadow-md bg-gradient-to-r from-orange-50 to-red-100 rounded-xl hover:from-orange-100 hover:to-red-200"
            >
              <div className="p-3 mt-1 mr-4 bg-red-500 rounded-full">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Manzil</p>
                <p className="font-bold text-gray-800">{contactInfo.address}</p>
                <p className="mt-1 text-xs text-gray-500"><a href='https://maps.app.goo.gl/cEui8VAz45u6d3E37' target='_blank' rel="noopener noreferrer">📍 Xaritada ko'rish</a></p>
              </div>
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div className="p-6 text-center text-white bg-black shadow-2xl rounded-2xl">
          <h3 className="mb-2 text-2xl font-bold">⏰ Ish vaqti</h3>
          <p className="text-xl font-semibold">Har kuni: 11:00 -02:00</p>
          <p className="mt-2 text-lg text-orange-100">🚚 Yetkazib berish: 20-30 daqiqa</p>
        </div>

        {/* Footer Logo */}
        <div className="mt-6 text-center text-white">
          <p className="text-lg">🍔 MA'ZALI VA TEZ YETKAZIB BERISH 🍕</p>
        </div>
      </div>
    </div>
  );
}