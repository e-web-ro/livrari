import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if it's iOS
        const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIosDevice);

        // Check if already installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

        if (isStandalone) return;

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show prompt after a few seconds
            setTimeout(() => setShowPrompt(true), 3000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // For iOS, we can't detect beforeinstallprompt, so we just show it
        if (isIosDevice) {
            setTimeout(() => setShowPrompt(true), 5000);
        }

        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            alert('Te rugăm să folosești meniul browserului (cele 3 puncte) și să selectezi "Install App" sau "Add to Home Screen".');
            return;
        }

        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);

            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setShowPrompt(false);
            }
        } catch (err) {
            console.error('Error during installation:', err);
            alert('Te rugăm să folosești meniul browserului pentru instalare.');
        }
    };

    if (!showPrompt) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                style={{
                    position: 'fixed',
                    bottom: '100px',
                    left: '20px',
                    right: '20px',
                    zIndex: 2000,
                    maxWidth: '460px',
                    margin: '0 auto'
                }}
            >
                <div className="glass-panel" style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(30, 30, 30, 0.95)', border: '1px solid var(--primary)' }}>
                    <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '12px' }}>
                        <Download size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14px', marginBottom: '2px' }}>Instalează Burgero</h4>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            {isIOS
                                ? 'Apasă pe "Share" și "Add to Home Screen"'
                                : 'Adaugă aplicația pe ecranul tău principal'
                            }
                        </p>
                    </div>
                    {!isIOS && (
                        <button
                            onClick={handleInstall}
                            style={{ background: 'var(--primary)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}
                        >
                            Instalează
                        </button>
                    )}
                    <button onClick={() => setShowPrompt(false)} style={{ color: 'var(--text-muted)' }}>
                        <X size={18} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
