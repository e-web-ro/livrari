import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Detect if already installed
        const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
        setIsStandalone(standalone);

        if (standalone) return;

        // Detect iOS
        const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIosDevice);

        const handleBeforeInstallPrompt = (e) => {
            console.log('beforeinstallprompt event fired');
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true); // Show immediately when ready
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // For iOS or if the event doesn't fire quickly, show after 2 seconds
        const timer = setTimeout(() => {
            if (!standalone) {
                setShowPrompt(true);
            }
        }, 2000);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            clearTimeout(timer);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            // Fallback for Android if the event didn't fire yet or isn't supported
            if (!isIOS) {
                alert('Pentru a instala: Apasă pe cele 3 puncte (sus dreapta) și selectează "Adaugă pe ecranul de pornire" sau "Instalează aplicația".');
            }
            return;
        }

        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setShowPrompt(false);
            }
        } catch (err) {
            console.error('Installation error:', err);
        }
    };

    if (isStandalone || !showPrompt) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: '15px',
                    left: '15px',
                    right: '15px',
                    zIndex: 10000,
                    maxWidth: '470px',
                    margin: '0 auto',
                    pointerEvents: 'none'
                }}
            >
                <div className="glass-panel" style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'rgba(20, 20, 20, 0.98)',
                    border: '2px solid var(--primary)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                    borderRadius: '20px',
                    pointerEvents: 'auto'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '12px' }}>
                            <Download size={24} color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '2px', color: 'white' }}>Instalează Burgero</h4>
                            <p style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.2' }}>
                                Primești notificări și acces rapid!
                            </p>
                        </div>
                        <button onClick={() => setShowPrompt(false)} style={{ color: '#666', padding: '5px' }}>
                            <X size={20} />
                        </button>
                    </div>

                    {isIOS ? (
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '10px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            color: '#eee'
                        }}>
                            <span>Apasă</span>
                            <Share size={16} color="#007AFF" />
                            <span>apoi "Add to Home Screen"</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleInstall}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '14px',
                                borderRadius: '12px'
                            }}
                        >
                            Instalează Acum
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
