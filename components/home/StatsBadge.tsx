"use client";

import { motion } from "framer-motion";

export default function StatsBadge() {
  return (
    <motion.div
      className="flex items-center justify-center gap-2 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.6 }}
    >
      {/* 8 */}
      <motion.h2
        className="stats-number leading-none"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        8
      </motion.h2>

      {/* + Years */}
      <div className="flex flex-col items-start">
        <motion.span
          className="stats-plus leading-none"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          +
        </motion.span>

        <motion.span
          className="stats-pill stats-years leading-none px-4 md:px-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          Years
        </motion.span>
      </div>
    </motion.div>
  );
}
