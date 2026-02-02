import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CreditCard, Banknote, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cart = [] }) {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5; // +5 taxa livrare

    const handleConfirmOrder = () => {
        setIsProcessing(true);
        // Simulăm procesarea plății / comenzii
        setTimeout(() => {
            navigate('/tracking');
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="checkout-page"
            style={{ minHeight: '100vh', paddingBottom: '120px' }}
        >
            <header className="navbar" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', background: 'transparent' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'var(--surface)', padding: '10px', borderRadius: '12px' }}>
                    <ChevronLeft />
                </button>
                <h3 style={{ flex: 1, textAlign: 'center', marginRight: '40px' }}>Finalizare Comandă</h3>
            </header>

            <div style={{ padding: '0 15px' }}>
                <div className="checkout-section" style={{ marginBottom: '25px' }}>
                    <h4 style={{ marginBottom: '12px', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', paddingLeft: '5px' }}>Adresa de livrare</h4>
                    <div className="glass-panel" style={{ padding: '18px', display: 'flex', gap: '15px', alignItems: 'center', background: 'var(--surface)' }}>
                        <div style={{ background: 'rgba(255, 77, 77, 0.1)', padding: '12px', borderRadius: '12px' }}>
                            <MapPin size={24} color="var(--primary)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: '600' }}>Strada Principală nr. 10</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bloc 4, Scara B, Ap. 12, Interfon 12</p>
                        </div>
                        <button style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Edit</button>
                    </div>
                </div>

                <div className="checkout-section" style={{ marginBottom: '25px' }}>
                    <h4 style={{ marginBottom: '15px', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Timp estimat</h4>
                    <div className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(255, 165, 0, 0.1)', padding: '12px', borderRadius: '12px' }}>
                            <Clock size={24} color="var(--secondary)" />
                        </div>
                        <div>
                            <p style={{ fontWeight: '600' }}>25 - 35 minute</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Livrare rapidă prin curier propriu</p>
                        </div>
                    </div>
                </div>

                <div className="checkout-section" style={{ marginBottom: '25px' }}>
                    <h4 style={{ marginBottom: '15px', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Metoda de plată</h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                            onClick={() => setPaymentMethod('card')}
                            className={`glass-panel ${paymentMethod === 'card' ? 'active-payment' : ''}`}
                            style={{
                                padding: '20px',
                                display: 'flex',
                                gap: '15px',
                                alignItems: 'center',
                                textAlign: 'left',
                                width: '100%',
                                border: paymentMethod === 'card' ? '1px solid var(--primary)' : '1px solid var(--glass-border)'
                            }}
                        >
                            <div style={{
                                background: paymentMethod === 'card' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                padding: '10px',
                                borderRadius: '10px',
                                transition: 'all 0.3s'
                            }}>
                                <CreditCard size={20} color={paymentMethod === 'card' ? 'white' : 'var(--text-muted)'} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: '600' }}>Card bancar</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>**** **** **** 4242</p>
                            </div>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: `2px solid ${paymentMethod === 'card' ? 'var(--primary)' : 'var(--glass-border)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {paymentMethod === 'card' && <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%' }} />}
                            </div>
                        </button>

                        <button
                            onClick={() => setPaymentMethod('cash')}
                            className={`glass-panel ${paymentMethod === 'cash' ? 'active-payment' : ''}`}
                            style={{
                                padding: '20px',
                                display: 'flex',
                                gap: '15px',
                                alignItems: 'center',
                                textAlign: 'left',
                                width: '100%',
                                border: paymentMethod === 'cash' ? '1px solid var(--primary)' : '1px solid var(--glass-border)'
                            }}
                        >
                            <div style={{
                                background: paymentMethod === 'cash' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                padding: '10px',
                                borderRadius: '10px',
                                transition: 'all 0.3s'
                            }}>
                                <Banknote size={20} color={paymentMethod === 'cash' ? 'white' : 'var(--text-muted)'} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: '600' }}>Cash la livrare</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Plătește numerar curierului</p>
                            </div>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: `2px solid ${paymentMethod === 'cash' ? 'var(--primary)' : 'var(--glass-border)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {paymentMethod === 'cash' && <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%' }} />}
                            </div>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="processing-overlay"
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.85)',
                                backdropFilter: 'blur(10px)',
                                zIndex: 1000,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                padding: '40px'
                            }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    border: '4px solid var(--glass-border)',
                                    borderTop: '4px solid var(--primary)',
                                    borderRadius: '50%',
                                    marginBottom: '20px'
                                }}
                            />
                            <h3 className="text-gradient">Se procesează comanda...</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Vă rugăm să nu închideți aplicația.</p>
                            <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontSize: '0.9rem', fontWeight: '500' }}>
                                <ShieldCheck size={18} /> Plată securizată SSL
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '500px', padding: '0 20px' }}>
                    <button
                        className="btn-primary"
                        style={{
                            width: '100%',
                            padding: '20px',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                        onClick={handleConfirmOrder}
                        disabled={isProcessing}
                    >
                        <span style={{ fontWeight: '800' }}>
                            {paymentMethod === 'card' ? 'Plătește și Comandă' : 'Confirmă Comanda'}
                        </span>
                        <span style={{ opacity: 0.8, fontWeight: '700' }}>{total.toFixed(2)} Lei</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
