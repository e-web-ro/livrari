import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Tracking() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(prev => (prev < 4 ? prev + 1 : prev));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const steps = [
        { id: 1, label: 'Comandă Primită', desc: 'Burgero a confirmat comanda ta.' },
        { id: 2, label: 'În Preparare', desc: 'Produsele tale sunt gătite acum.' },
        { id: 3, label: 'Pe Drum', desc: 'Curierul Alex se îndreaptă spre tine.' },
        { id: 4, label: 'Livrat', desc: 'Poftă bună! Comanda a ajuns.' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tracking-page"
            style={{ minHeight: '100vh', background: 'var(--background)' }}
        >
            <header className="navbar">
                <button onClick={() => navigate('/')} style={{ background: 'var(--surface)', padding: '10px', borderRadius: '12px' }}>
                    <ChevronLeft />
                </button>
                <h3 style={{ flex: 1, textAlign: 'center', marginRight: '40px' }}>Urmărire Comandă</h3>
            </header>

            <div className="map-simulation" style={{ height: '35vh', position: 'relative', overflow: 'hidden', background: '#222' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'repeating-linear-gradient(45deg, #000 0px, #000 10px, #111 10px, #111 20px)' }}></div>
                <motion.div
                    animate={{ x: [0, 100, 50], y: [0, -50, -100] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', top: '50%', left: '40%', color: 'var(--primary)' }}
                >
                    <MapPin size={40} fill="var(--primary)" />
                </motion.div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                    <div className="glass-panel" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '25px', overflow: 'hidden' }}>
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Curier" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '0.9rem' }}>Curierul tău: Alex</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Timp estimat: 10-15 min</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ background: 'var(--success)', color: 'white', padding: '10px', borderRadius: '12px' }}><Phone size={18} /></button>
                            <button style={{ background: 'var(--primary)', color: 'white', padding: '10px', borderRadius: '12px' }}><MessageSquare size={18} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tracking-status" style={{ padding: '30px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {steps.map((s) => (
                        <div key={s.id} style={{ display: 'flex', gap: '20px', opacity: s.id <= step ? 1 : 0.4 }}>
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '12px',
                                    background: s.id <= step ? 'var(--primary)' : 'var(--surface)',
                                    border: '4px solid var(--background)',
                                    zIndex: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {s.id < step && <CheckCircle2 size={16} color="white" />}
                                </div>
                                {s.id < 4 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '24px',
                                        bottom: '-30px',
                                        width: '2px',
                                        background: s.id < step ? 'var(--primary)' : 'var(--surface)'
                                    }}></div>
                                )}
                            </div>
                            <div style={{ marginTop: '-4px' }}>
                                <h4 style={{ fontSize: '1rem', color: s.id === step ? 'var(--primary)' : 'white' }}>{s.label}</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {step === 4 && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="btn-primary"
                        style={{ width: '100%', marginTop: '40px' }}
                        onClick={() => navigate('/')}
                    >
                        Comandă Nouă
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
