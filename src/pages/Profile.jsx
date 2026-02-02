import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Headphones,
    CreditCard,
    History,
    Settings,
    LogOut,
    Bell,
    Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();

    const menuItems = [
        { icon: <MapPin size={22} />, label: 'Adresele mele', desc: 'Setați adresele pentru livrare rapidă', color: '#FF4D4D' },
        { icon: <CreditCard size={22} />, label: 'Metode de plată', desc: 'Carduri salvate și opțiuni de plată', color: '#FFA500' },
        { icon: <History size={22} />, label: 'Istoric comenzi', desc: 'Vezi toate comenzile anterioare', color: '#4CAF50' },
        { icon: <Headphones size={22} />, label: 'Suport & Contact', desc: 'Suntem aici să te ajutăm non-stop', color: '#2196F3' },
    ];

    const settingItems = [
        { icon: <Bell size={20} />, label: 'Notificări' },
        { icon: <Shield size={20} />, label: 'Confidențialitate' },
        { icon: <Settings size={20} />, label: 'Setări cont' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="profile-page"
            style={{ minHeight: '100vh', background: 'var(--background)', paddingBottom: '100px' }}
        >
            <header className="navbar" style={{ background: 'transparent' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'var(--surface)', padding: '10px', borderRadius: '12px' }}>
                    <ChevronLeft />
                </button>
                <h3 style={{ flex: 1, textAlign: 'center', marginRight: '40px' }}>Profilul Meu</h3>
            </header>

            <div className="profile-hero" style={{ padding: '20px', textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 15px' }}>
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="User"
                        style={{ width: '100%', height: '100%', borderRadius: '50%', border: '3px solid var(--primary)', padding: '3px' }}
                    />
                    <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '50%', border: '2px solid var(--background)' }}>
                        <Settings size={14} />
                    </div>
                </div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>Felix Ardeleanu</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>felix.ardeleanu@exemplu.ro</p>
            </div>

            <div className="profile-menu" style={{ padding: '0 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {menuItems.map((item, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass-panel"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '15px',
                                width: '100%',
                                textAlign: 'left',
                                border: '1px solid var(--glass-border)'
                            }}
                        >
                            <div style={{
                                background: `${item.color}22`,
                                color: item.color,
                                padding: '10px',
                                borderRadius: '12px',
                                display: 'flex'
                            }}>
                                {item.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>{item.label}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                            </div>
                            <ChevronRight size={20} color="var(--text-muted)" />
                        </motion.button>
                    ))}
                </div>

                <div style={{ marginTop: '40px' }}>
                    <h4 style={{ marginBottom: '15px', paddingLeft: '5px', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Setări General</h4>
                    <div className="glass-panel" style={{ overflow: 'hidden' }}>
                        {settingItems.map((item, index) => (
                            <button
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    padding: '18px 20px',
                                    width: '100%',
                                    borderBottom: index === settingItems.length - 1 ? 'none' : '1px solid var(--glass-border)',
                                    color: 'white'
                                }}
                            >
                                <span style={{ color: 'var(--text-muted)' }}>{item.icon}</span>
                                <span style={{ flex: 1, textAlign: 'left', fontWeight: '500' }}>{item.label}</span>
                                <ChevronRight size={18} color="var(--text-muted)" />
                            </button>
                        ))}
                    </div>
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                        marginTop: '40px',
                        width: '100%',
                        padding: '18px',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        color: '#ff4444',
                        background: 'rgba(255, 68, 68, 0.05)',
                        border: '1px solid rgba(255, 68, 68, 0.1)',
                        fontWeight: '700'
                    }}
                >
                    <LogOut size={20} />
                    Deconectare
                </motion.button>
            </div>
        </motion.div>
    );
}
