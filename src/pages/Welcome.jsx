import React from 'react';
import { motion } from 'framer-motion';
import splashImg from '../assets/splash.png';

export default function Welcome({ onFinish }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="welcome-screen"
            style={{
                height: '100vh',
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${splashImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '40px 20px',
                textAlign: 'center'
            }}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '10px', fontWeight: '900', letterSpacing: '-0.05em' }}>BURGERO</h1>
                <p style={{ color: '#ccc', marginBottom: '30px', fontSize: '1.1rem' }}>
                    Cele mai delicioase preparate livrate direct la ușa ta, rapid și sigur.
                </p>
                <button
                    className="btn-primary"
                    onClick={onFinish}
                    style={{ width: '100%', padding: '20px' }}
                >
                    Începe Comanda
                </button>
            </motion.div>
        </motion.div>
    );
}
