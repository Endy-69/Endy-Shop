
  // importing hesdphones
import headphone1 from "/src/assets/products/headphone1.png"
import headphone2 from "/src/assets/products/headphone2.png"
import headphone3 from "/src/assets/products/headphone3.png"
import headphone4 from "/src/assets/products/headphone4.png"
import headphone5 from "/src/assets/products/headphone5.png"
import headphone6 from "/src/assets/products/headphone6.png"

  // importing watches
import watch1 from "/src/assets/products/watch1.png"
import watch2 from "/src/assets/products/watch2.png"
import watch3 from "/src/assets/products/watch3.png"

  // importing phones
import phone1 from "/src/assets/products/phone1.png"
import phone2 from "/src/assets/products/phone2.png"
import phone3 from "/src/assets/products/phone3.png"

 // importing laptops
import laptop1 from "/src/assets/products/laptop1.png"
import laptop2 from "/src/assets/products/laptop2.png"
import laptop3 from "/src/assets/products/laptop3.png"
import laptop4 from "/src/assets/products/laptop4.png"

  // importing vrs
import vr1 from "/src/assets/products/vr1.png"
import vr2 from "/src/assets/products/vr2.png"

 // importing vrs
import tablet1 from "/src/assets/products/tablet1.png"
import tablet2 from "/src/assets/products/tablet2.png"
import tablet3 from "/src/assets/products/tablet3.png"

// importing vrs
import glass1 from "/src/assets/products/glass1.png"
import glass2 from "/src/assets/products/glass2.png"

 // importing gamings
import gaming1 from "/src/assets/products/gaming1.png"
import gaming2 from "/src/assets/products/gaming2.png"
import gaming3 from "/src/assets/products/gaming3.png"

// importing speakeres
import speaker1 from "/src/assets/products/speaker1.png"
import speaker2 from "/src/assets/products/speaker2.png"

export const productsByCategory = {
  headphones: [
    {
      id: 'h1',
      title: "Vinci premium Smart Headphone",
      price: 4000,
      image: headphone1,
      description: "High-quality with noise cancellation",
      category: "headphones"
    },
    {
      id: 'h2',
      title: "Vinci 2.0 Smart Headphone",
      price: 3600,
      image: headphone2 ,
      description: "True wireless earbuds with active noise cancellation",
      category: "headphones"
    },
    {
      id: 'h3',
      title: "EKSA E900 Pro Gaming Headset",
      price: 3100,
      image: headphone3,
      description: "Professional gaming headset with surround sound",
      category: "headphones"
    },
    {
      id: 'h4',
      title: "Apple Airpod pro",
      price: 1200,
      image: headphone4,
      description: "Easy to use and fast charging",
      category: "headphones"
    },
    {
      id: 'h5',
      title: "Monster DNA On-Ear Headphone",
      price: 3200,
      image: headphone5,
      description: "High-quality sound and base",
      category: "headphones"
    },
    {
      id: 'h6',
      title: "Galaxy Bud 3",
      price: 1800,
      image: headphone6,
      description: "High-quality earbud",
      category: "headphones"
    },
    
  ],
  smartphones: [
    {
      id: 'p1',
      title: "Galaxy S24 Ultra",
      price: 68000,
      image: phone1,
      description: "Latest phone with new features",
      category: "samrtphone"
    },
    {
      id: 'p2',
      title: "Iphone 15 pro max",
      price: 72000,
      image: phone2,
      description: "High photo and vidio camera quality",
      category: "samrtphone"
    },
    {
      id: 'p3',
      title: "Google pixel 9 pro",
      price: 70000,
      image: phone3,
      description: "High camera quality with strength",
      category: "samrtphone"
    }
  ],
  smartwatches: [
    {
      id: 'sw1',
      title: "LEMFO DM98 Smartwatch",
      price:9600 ,
      image: watch1,
      description: "AI embeded digital watch",
      category: "smartwatches"
    },
    {
      id: 'sw2',
      title: "DZ09 Bluetooth Smartwatch",
      price: 6100,
      image: watch2,
      description: "Easy to use",
      category: "smartwatches"
    },
    {
      id: 'sw3',
      title: "I5 Plus Smartwatch",
      price: 5000,
      image: watch3,
      description: "Sports-focused smartwatch with GPS tracking",
      category: "smartwatches"
    }
  ],
  laptops: [
    {
      id: 'l1',
      title: "MacBook Pro",
      price: 120000,
      image: laptop1,
      description: "Powerful laptop for professionals with M2 chip",
      category: "laptops"
    },
    {
      id: 'l2',
      title: "Hp Elitebook",
      price: 105000,
      image: laptop2,
      description: "Ultra-light laptop perfect for everyday use",
      category: "laptops"
    },
    {
      id: 'l3',
      title: "Lenovo Thinkpad",
      price: 115000,
      image: laptop3,
      description: "Professional grade laptop with large display",
      category: "laptops"
    },
    {
      id: 'l4',
      title: "Dell",
      price: 100000,
      image: laptop4,
      description: "High performance laptop",
      category: "laptops"
    }
  ],
  vr: [
    {
      id: 'v1',
      title: "Apple Vison pro",
      price: 100000,
      image: vr1,
      description: "Premium VR headset for immersive experiences",
      category: "vr"
    },
    {
      id: 'v2',
      title: "Meta Quest 3",
      price: 90000,
      image: vr2,
      description: "Complete VR gaming set with controllers",
      category: "vr"
    },
   
  ],
  tablets: [
    {
      id: 't1',
      title: "Apple iPad Air 5",
      price: 50000,
      image: tablet1,
      description: "Fast performance and Liquid Retina display",
      category: "tablets"
    },
    {
      id: 't2',
      title: "HP Envy x360",
      price: 44000,
      image: tablet2,
      description: "Sleek design and high-quality materials",
      category: "tablets"
    },
    {
      id: 't3',
      title: "Huawei MatePad",
      price: 42000,
      image: tablet3,
      description: "Immersive sound and M-Pencil support",
      category: "tablets"
    }
  ],
  smartglasses: [
    {
      id: 'sg1',
      title: "Google Smart Glass",
      price: 14600,
      image: glass1,
      description: "Controlled by voice commands and a touchpad",
      category: "smartglasses"
    },
    {
      id: 'sg2',
      title: "Apple Smart Glass",
      price: 15000,
      image: glass2,
      description: "Glass with 3D Camera",
      category: "samrtglasses"
    },
  ],
  gaming: [
    {
      id: 'g1',
      title: "TITAN ARMY P32A2S2 Gaming Monitor",
      price: 90000,
      image: gaming1,
      description: "Four times faster response time than standard IPS",
      category: "gaming"
    },
    {
      id: 'g2',
      title: "Huntkey S980 Tornado PC case",
      price: 60000,
      image: gaming2,
      description: "Supports CPU coolers up to 160mm tall",
      category: "gaming"
    },
    {
      id: 'g3',
      title: "Razer Raiju Goystick",
      price: 3000,
      image: gaming3,
      description: "Comfortable grip and button layout",
      category: "gaming"
    }
  ],
  speakers: [
    {
      id: 'sp1',
      title: "Bose Smart Speaker.",
      price: 4300,
      image: speaker1,
      description: "360-degree sound with deeper bass",
      category: "speakers"
    },
    {
      id: 'sp2',
      title: "Amazon Echo Plus Smart speaker",
      price: 4000,
      image: speaker2,
      description: "allows to control smart home devices with your voice",
      category: "speakers"
    },
    
  ],
}; 