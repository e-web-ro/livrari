import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Home as HomeIcon, Heart, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import burgerImg from '../assets/burger.png';
import pizzaImg from '../assets/pizza.png';

const products = [
    { id: 1, name: 'Royal Cheese Burger', price: 32.99, rating: 4.8, category: 'Burger', image: burgerImg, popular: true },
    { id: 2, name: 'Pepperoni Classic', price: 45.00, rating: 4.9, category: 'Pizza', image: pizzaImg, popular: true },
    { id: 3, name: 'Crispy Chicken Burger', price: 28.50, rating: 4.6, category: 'Burger', image: burgerImg, popular: false },
    { id: 4, name: 'Veggie Delight', price: 38.00, rating: 4.7, category: 'Pizza', image: pizzaImg, popular: false },
    { id: 5, name: 'Double Bacon Burger', price: 36.99, rating: 4.9, category: 'Burger', image: burgerImg, popular: true },
    { id: 6, name: 'Quattro Formaggi', price: 48.00, rating: 4.8, category: 'Pizza', image: pizzaImg, popular: false },
];

const categories = ['Toate', 'Burger', 'Pizza', 'Băuturi', 'Desert'];

export default function Home({ addToCart, cartCount }) {
    const [activeCategory, setActiveCategory] = useState('Toate');
    const navigate = useNavigate();

    const filteredProducts = activeCategory === 'Toate'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="home-page"
        >
            <header className="navbar">
                <div className="location">
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Livrăm la</p>
                    <h4 style={{ fontSize: '14px' }}>Strada Principală nr. 10</h4>
                </div>
                <div className="profile-pic">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>
            </header>

            <div className="search-container">
                <div className="search-bar">
                    <Search size={20} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="Ce dorești să mănânci azi?"
                        style={{ background: 'none', border: 'none', color: 'white', outline: 'none', width: '100%' }}
                    />
                </div>
            </div>

            <div className="category-scroll">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-item ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="featured-banner" style={{ padding: '0 20px 25px' }}>
                <div className="glass-panel" style={{ padding: '20px', background: 'linear-gradient(45deg, #FF4D4D22, #FFA50022)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Oferta Zilei!</h2>
                        <p style={{ fontSize: '0.9rem', color: '#ccc', width: '60%' }}>Cumpără un meniu Burgero și primești un desert cadou.</p>
                        <button style={{ marginTop: '12px', background: 'white', color: 'black', padding: '8px 16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px' }}>
                            Comandă Acum
                        </button>
                    </div>
                    <img
                        src={burgerImg}
                        alt="Promo"
                        style={{ position: 'absolute', right: '-20px', top: '10px', width: '120px', transform: 'rotate(-15deg)', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}
                    />
                </div>
            </div>

            <div className="product-grid">
                {filteredProducts.map(product => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={product.id}
                        className="product-card card-glossy"
                    >
                        {product.popular && (
                            <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--gold-gradient)', color: 'black', padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '800', zIndex: 5 }}>
                                POPULAR
                            </div>
                        )}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                            onClick={() => navigate(`/product/${product.id}`)}
                            style={{ boxShadow: 'var(--shadow-sm)' }}
                        />
                        <div className="product-info">
                            <h3 style={{ color: 'white', fontWeight: '600' }}>{product.name}</h3>
                            <p className="product-price text-gradient" style={{ fontSize: '1.2rem' }}>{product.price.toFixed(2)} Lei</p>
                        </div>
                        <button
                            className="add-btn"
                            onClick={() => addToCart(product)}
                            style={{ boxShadow: '0 4px 10px rgba(255, 77, 77, 0.3)' }}
                        >
                            <Plus size={18} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <nav className="bottom-nav" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <button className="nav-item active"><HomeIcon size={24} /><span style={{ marginTop: '4px', fontWeight: '600' }}>Acasă</span></button>
                <button className="nav-item"><Heart size={24} /><span style={{ marginTop: '4px', fontWeight: '600' }}>Favorite</span></button>
                <button className="nav-item" onClick={() => navigate('/cart')}>
                    <div style={{ position: 'relative' }}>
                        <ShoppingBag size={24} />
                        {cartCount > 0 && <span className="cart-badge" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>{cartCount}</span>}
                    </div>
                    <span style={{ marginTop: '4px', fontWeight: '600' }}>Coș</span>
                </button>
                <button className="nav-item" onClick={() => navigate('/profile')}><User size={24} /><span style={{ marginTop: '4px', fontWeight: '600' }}>Profil</span></button>
            </nav>
        </motion.div >
    );
}
