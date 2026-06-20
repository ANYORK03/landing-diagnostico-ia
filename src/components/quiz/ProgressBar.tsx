"use client";

import { motion } from "framer-motion";

export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = Math.min(100, (current / total) * 100);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>
          Paso {Math.min(current, total)} de {total}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
