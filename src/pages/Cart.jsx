import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Trash2, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cart, removeFromCart, updateQuantity }) {
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cart-page"
            style={{ minHeight: '100vh', paddingBottom: '120px' }}
        >
            <header className="navbar" style={{ background: 'transparent' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'var(--surface)', padding: '10px', borderRadius: '12px' }}>
                    <ChevronLeft />
                </button>
                <h3 style={{ flex: 1, textAlign: 'center', marginRight: '40px' }}>Coșul tău</h3>
            </header>

            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
                    <h2>Coșul este gol</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Adaugă câteva produse delicioase pentru a începe.</p>
                    <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: '30px' }}>Înapoi la meniu</button>
                </div>
            ) : (
                <div className="cart-items" style={{ padding: '0 15px' }}>
                    {cart.map(item => (
                        <motion.div
                            layout
                            key={item.id}
                            className="glass-panel"
                            style={{
                                display: 'flex',
                                gap: '15px',
                                padding: '12px',
                                marginBottom: '12px',
                                borderRadius: '22px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', borderRadius: '18px', objectFit: 'cover' }} />
                            <div style={{ flex: 1, padding: '5px 0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>{item.name}</h4>
                                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'rgba(255,255,255,0.2)' }}><Trash2 size={18} /></button>
                                </div>
                                <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.1rem', margin: '5px 0 10px' }}>{item.price.toFixed(2)} Lei</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'var(--surface)', padding: '6px 14px', borderRadius: '12px' }}>
                                        <button onClick={() => updateQuantity(item.id, -1)} style={{ color: 'var(--text-muted)' }}><Minus size={16} /></button>
                                        <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} style={{ color: 'var(--primary)' }}><Plus size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="summary" style={{ marginTop: '30px', padding: '20px', borderRadius: '25px', background: 'var(--surface)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                            <span>{total.toFixed(2)} Lei</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Taxă livrare</span>
                            <span>5.00 Lei</span>
                        </div>
                        <div style={{ borderTop: '1px solid var(--glass-border)', margin: '15px 0', paddingTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: '700' }}>Total</span>
                            <span style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--primary)' }}>{(total + 5).toFixed(2)} Lei</span>
                        </div>
                    </div>
                </div>
            )}

            {cart.length > 0 && (
                <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '500px', padding: '0 20px' }}>
                    <button
                        className="btn-primary"
                        style={{ width: '100%', padding: '20px', borderRadius: '20px' }}
                        onClick={() => navigate('/checkout')}
                    >
                        Plasează Comanda
                    </button>
                </div>
            )}
        </motion.div>
    );
}
