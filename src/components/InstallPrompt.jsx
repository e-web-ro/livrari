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
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '15px',
                    right: '15px',
                    zIndex: 9999,
                    maxWidth: '470px',
                    margin: '0 auto'
                }}
            >
                <div className="glass-panel" style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    background: 'rgba(20, 20, 20, 0.98)',
                    border: '2px solid var(--primary)',
                    boxShadow: '0 10px 40px rgba(255, 77, 77, 0.3)',
                    borderRadius: '24px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '16px', boxShadow: '0 5px 15px rgba(255, 77, 77, 0.4)' }}>
                            <Download size={28} color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px', color: 'white' }}>Instalează Aplicația</h4>
                            <p style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.4' }}>
                                Primești notificări și acces rapid la cei mai buni burgeri!
                            </p>
                        </div>
                        <button onClick={() => setShowPrompt(false)} style={{ color: '#666', padding: '5px' }}>
                            <X size={24} />
                        </button>
                    </div>

                    {isIOS ? (
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '12px',
                            borderRadius: '12px',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            border: '1px dashed #444'
                        }}>
                            <span>Apasă pe butonul de partajare</span>
                            <Share size={18} color="#007AFF" />
                            <span>apoi "Add to Home Screen"</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleInstall}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                padding: '16px',
                                fontSize: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
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
