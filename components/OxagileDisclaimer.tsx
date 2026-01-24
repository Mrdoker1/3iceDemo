'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

export default function OxagileDisclaimer() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="fixed bottom-6 left-6 z-50 w-[420px]"
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0">
            <Image
              src={getAssetPath('/background.png')}
              alt="Background"
              fill
              className="object-cover opacity-20"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/95 via-[#16213e]/95 to-[#0f0f1e]/95 backdrop-blur-md" />
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
              aria-label="Close disclaimer"
            >
              <X size={20} />
            </button>

            {/* Logo and Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#E63946] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#E63946]/30">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5068 2.61475L12.5023 2.60675L4.10075 7.45775L4.11975 7.49075V13.214H4.12325C4.19475 17.9918 7.838 21.9027 12.503 22.3935C17.168 21.903 20.8115 17.992 20.8828 13.214V7.48825L20.8993 7.45975L12.5068 2.61475ZM12.503 19.889V12.9193H6.60875V8.91275L12.503 5.51V12.9193H18.3938V13.214H18.398C18.3285 16.6123 15.7883 19.4135 12.503 19.889Z" fill="white"/>
                </svg>
              </div>
              <div>
                <h3 className="text-[#E63946] font-black text-lg tracking-wide">
                  INTERNAL USE ONLY
                </h3>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">
                  PROTOTYPE DISCLAIMER
                </p>
              </div>
            </div>

            {/* Disclaimer text */}
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              This prototype is the proprietary property of{' '}
              <span className="text-white font-bold">Oxagile</span>. Access is restricted to authorized personnel for internal review.
            </p>
            <p className="text-gray-400 text-xs italic leading-relaxed mb-5">
              For inquiries regarding this interface or the underlying tech stack, please reach out to our team.
            </p>

            {/* Contact button */}
            <a
              href="https://www.oxagile.com/contacts/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#E63946] to-[#c42a36] hover:from-[#ff4757] hover:to-[#E63946] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#E63946]/30 hover:shadow-[#E63946]/50"
              >
                CONTACT US
              </motion.button>
            </a>

            {/* Oxagile logo at bottom */}
            <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-center">
              <svg width="90" height="25" viewBox="0 0 144 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
                <path d="M102.452 6.2713e-06L105.999 6.271e-06L105.999 3.55378L102.452 3.55378L102.452 6.2713e-06ZM133.853 8.36183C136.566 8.25731 139.069 9.40706 140.843 11.393C142.721 13.588 143.764 16.3056 143.659 19.1277C143.659 19.2322 143.66 19.6503 143.555 20.4865L127.281 20.4865C127.489 24.2493 130.619 27.0714 134.375 26.9669C136.774 26.9669 138.965 26.0262 140.738 24.4583L142.616 26.9669C140.321 29.0573 137.191 30.2071 134.062 30.1026C131.245 30.2071 128.533 29.1619 126.551 27.0714C124.568 24.981 123.525 22.1588 123.629 19.2322C123.525 16.3056 124.568 13.4834 126.551 11.393C128.428 9.40706 131.141 8.36183 133.853 8.36183ZM133.853 11.4975C132.184 11.393 130.619 12.0201 129.472 13.1699C128.324 14.3196 127.594 15.8875 127.385 17.5598L140.113 17.5598C140.008 15.8875 139.278 14.3196 138.13 13.1699C136.878 12.1247 135.418 11.4975 133.853 11.4975ZM117.579 30.1026L114.032 30.1026L114.032 6.27033e-06L117.579 6.27003e-06L117.579 30.1026ZM3.13624 11.9156C5.2227 9.82515 8.03943 8.6754 10.9605 8.77992C13.8815 8.6754 16.6982 9.82515 18.7847 11.9156C20.8712 13.9015 22.0187 16.7237 21.9144 19.6503C22.0187 22.5769 20.8712 25.399 18.7847 27.385C16.6982 29.4754 13.8815 30.6252 10.9605 30.5207C8.03943 30.6252 5.2227 29.4754 3.13624 27.385C1.04978 25.399 -0.0977784 22.5769 0.00654476 19.6503C-0.0977784 16.7237 1.04978 13.9015 3.13624 11.9156ZM10.9605 12.1247C8.97834 12.0201 7.10052 12.8563 5.74432 14.2151C4.38812 15.6784 3.55353 17.5598 3.65785 19.5458C3.55353 21.5317 4.38812 23.5176 5.74432 24.8764C7.10052 26.2352 8.97834 27.0714 10.9605 26.9669C12.9426 27.0714 14.8204 26.2352 16.1766 24.8764C17.5328 23.4131 18.3674 21.5317 18.2631 19.5458C18.3674 17.5598 17.5328 15.5739 16.1766 14.2151C14.8204 12.8563 12.9426 12.1247 10.9605 12.1247ZM67.8166 30.1026L64.2696 30.1026L64.2696 27.2805C62.4961 29.3709 59.7837 30.6252 56.967 30.5207C54.1502 30.6252 51.4378 29.4754 49.56 27.385C47.5779 25.2945 46.4303 22.4724 46.5347 19.6503C46.4303 16.7237 47.4736 14.0061 49.56 11.9156C51.4378 9.92967 54.1502 8.77992 56.967 8.88444C59.7837 8.77992 62.4961 9.92967 64.2696 12.1247L64.2696 9.19801L67.8166 9.19801L67.8166 30.1026ZM57.3843 12.1247C55.4021 12.0201 53.5243 12.8563 52.1681 14.3196C50.8119 15.7829 50.0816 17.6644 50.186 19.6503C50.186 21.6362 50.9162 23.5176 52.2724 24.981C55.0892 27.8031 59.6794 27.8031 62.4961 24.981C63.8523 23.5176 64.5826 21.6362 64.4782 19.6503C64.5826 17.6644 63.8523 15.7829 62.4961 14.3196C61.1399 12.8563 59.2621 12.1247 57.3843 12.1247ZM105.999 30.1026L102.452 30.1026L102.452 9.19801L105.999 9.19801L105.999 30.1026ZM84.091 8.77992C86.9077 8.6754 89.5158 9.82515 91.2893 12.0201L91.2893 9.19801L94.8363 9.19801L94.8363 28.5347C95.0449 31.4614 93.8974 34.2835 91.8109 36.2694C89.6201 38.2553 86.6991 39.1961 83.778 39.0915C78.7705 39.0915 76.3711 37.5237 76.3711 37.5237L78.4575 34.8061C80.1267 35.6423 81.9002 35.9558 83.778 35.9558C85.7602 36.0604 87.7423 35.4332 89.2028 34.0744C90.559 32.7156 91.2893 30.8342 91.185 28.8483L91.185 26.9669C89.5158 29.1619 86.8034 30.3116 83.9867 30.2071C81.2743 30.3116 78.5619 29.1619 76.5797 27.1759C74.5976 25.0855 73.5544 22.3679 73.6587 19.4412C73.5544 16.6191 74.5976 13.797 76.5797 11.7066C78.6662 9.82515 81.3786 8.6754 84.091 8.77992ZM84.5083 12.1247C82.6305 12.0201 80.7526 12.8563 79.3964 14.2151C78.0402 15.6784 77.4143 17.5598 77.4143 19.4412C77.31 21.3227 78.0402 23.2041 79.3964 24.6674C82.2132 27.4895 86.6991 27.4895 89.5158 24.6674C90.872 23.3086 91.6023 21.4272 91.4979 19.4412C91.6023 17.4553 90.872 15.5739 89.5158 14.2151C88.2639 12.8563 86.4904 12.1247 84.5083 12.1247Z" fill="white"/>
                <path d="M51.3335 6.27557e-06L46.952 6.27594e-06L31.8251 19.6503L39.9623 30.1026L44.3439 30.1026L36.1023 19.3367L51.3335 6.27557e-06Z" fill="white"/>
                <path d="M23.5836 9.19801L27.9651 9.19801L36.1023 19.3367L20.4539 39.6141L16.0723 39.6141L31.8251 19.6503L23.5836 9.19801Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
