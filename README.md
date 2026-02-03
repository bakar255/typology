
#  Typology E-commerce Clone

A modern, fully-functional e-commerce website built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates advanced React patterns, state management, and responsive design.


<div align="center">
  <img src="public/screen.PNG" alt="Typology E-commerce Homepage" width="45%" />
  <img src="public/screen1.PNG" alt="Product Page" width="45%" />
  <br/>
  <img src="public/screen2.png" alt="" width="45%" />
  <img src="public/screen3.PNG" alt="" width="45%" />
</div>


## 🚀 Live Demo

**[View Live Site](https://typology-clone.vercel.app/)**

##  Features

###  **Shopping Cart System**
- Global state management with React Context API
- Add/remove products with quantity controls
- Real-time cart updates and total calculations
- Persistent cart state during session


##  Tech Stack

- **Framework**: Next.js 15 with App Router, NodeJs Express, Prisma
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API

##  Architecture

### **Context Providers**
- `CartContext`: Global cart state management
- `SearchContext`: Search functionality and results

### **Components Structure**
```
src/
├── components/
│   ├── header.tsx          # Navigation with search & cart
│   ├── hero.tsx            # Animated hero carousel
│   ├── proprety.tsx        # Product grid
│   ├── footer.tsx          # Newsletter & links
│   └── secondeProprety.tsx # Additional content
├── pages/
│   ├── index.tsx           # Homepage
│   └── product/[id].tsx    # Dynamic product pages
├── context/
│   ├── CartContext.tsx     # Cart state management
│   └── SearchContext.tsx   # Search functionality
└── data/
    └── products.ts         # Product data & types
```


##  Key Features Implementation

### **Shopping Cart**
- Context API for global state
- Add/remove/update quantities
- Real-time total calculations
- Session persistence

### **Documentation**

Typology is a e-commerce built e-commerce with mutiple categories insiped from various website on the internet, i did the following tasks :

- Navbar with search engine context and mutiple functinanlity as favorite items, mutiple languages,

- Hero section with animations

- Reutilisable UI components for Logo, product-card, button with React

- Legally scraped data from real websites and incorporate them to the actual database

- Real footers with newsletters and informations about 
