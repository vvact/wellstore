'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative w-full h-[60svh] sm:h-[70svh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero-bg.jpg" // Replace with your actual image path
          alt="Fashionable streetwear collection"
          fill
          className="object-cover"
          priority
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Content with animations */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-2xl text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
            <span className="block">TOP DEALS DELIVERED</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              TO YOUR DOOR
            </span>
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl mb-5 md:mb-6 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Fast, secure, and affordable online shopping in Kenya
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-6 text-base"
            onClick={() => router.push('/products')}
          >
            SHOP NOW
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}