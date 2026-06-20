"use client";

import { motion } from "framer-motion";

export default function QuizOptionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="glass w-full rounded-xl px-6 py-5 text-left text-base font-medium text-zinc-100 transition-colors hover:border-purple-400/40 hover:bg-purple-500/10 sm:text-lg"
    >
      {label}
    </motion.button>
  );
}
