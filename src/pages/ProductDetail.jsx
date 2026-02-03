import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Clock, Flame, Minus, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import burgerImg from '../assets/burger.png';
import pizzaImg from '../assets/pizza.png';

const products = [
    { id: 1, name: 'Royal Cheese Burger', price: 32.99, rating: 4.8, category: 'Burger', image: burgerImg, calories: '450 kcal', time: '15-20 min', desc: 'Un burger suculent cu carne de vită premium, brânză cheddar topită, ceapă caramelizată și sos special Royal.' },
    { id: 2, name: 'Pepperoni Classic', price: 45.00, rating: 4.9, category: 'Pizza', image: pizzaImg, calories: '850 kcal', time: '20-25 min', desc: 'Pizza clasică cu salam pepperoni picant, mozzarella din abundență și sos de roșii cu ierburi italiene.' },
    // ... ideally these would be in a shared data file
];

export default function ProductDetail({ addToCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id)) || products[0];

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="detail-page"
            style={{ minHeight: '100vh', background: 'var(--background)' }}
        >
            <div className="detail-header" style={{ position: 'relative', height: '40vh' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                    onClick={() => navigate(-1)}
                    style={{ position: 'absolute', top: 'var(--safe-area-top)', left: '20px', background: 'white', color: 'black', padding: '10px', borderRadius: '12px', zIndex: 10 }}
                >
                    <ChevronLeft />
                </button>
            </div>

            <div
                className="detail-content glass-panel"
                style={{
                    marginTop: '-40px',
                    position: 'relative',
                    padding: '30px 20px 120px',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    background: 'var(--surface)',
                    minHeight: '60vh'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h1 style={{ fontSize: '1.8rem' }}>{product.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent)' }}>
                        <Star size={18} fill="var(--accent)" />
                        <span style={{ fontWeight: '700' }}>{product.rating}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <Clock size={16} color="var(--primary)" />
                        <span>{product.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <Flame size={16} color="var(--primary)" />
                        <span>{product.calories}</span>
                    </div>
                </div>

                <h3 style={{ marginBottom: '10px' }}>Descriere</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    {product.desc}
                </p>

                <h3 style={{ marginBottom: '15px' }}>Ingrediente Suplimentare</h3>
                <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {['Bacon', 'Cheese', 'Onion', 'Jalapeno'].map(item => (
                        <div key={item} style={{ flex: '0 0 auto', padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                            {item}
                        </div>
                    ))}
                </div>

                <div
                    className="detail-footer"
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        maxWidth: '500px',
                        padding: '20px',
                        paddingBottom: 'calc(var(--safe-area-bottom) + 10px)',
                        background: 'rgba(26,26,26,0.95)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid var(--glass-border)',
                        zIndex: 100
                    }}
                >
                    <div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Preț Total</p>
                        <h2 style={{ color: 'var(--primary)' }}>{product.price.toFixed(2)} Lei</h2>
                    </div>
                    <button
                        className="btn-primary"
                        onClick={() => {
                            addToCart(product);
                            navigate(-1);
                        }}
                        style={{ padding: '15px 40px' }}
                    >
                        Adaugă în Coș
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
