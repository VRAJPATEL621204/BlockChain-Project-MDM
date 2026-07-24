import { motion } from "framer-motion";
import { ArrowRight, CircleDot, Globe2, Wallet } from "lucide-react";

export default function Navbar({ wallet, connectWallet }) {
  const walletLabel = wallet
    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
    : "Not connected";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/75 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20">
            <CircleDot className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-2xl font-semibold tracking-tight text-white">
                Workshop Registration
              </h1>
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-200">
                SaaS dashboard
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-[#94A3B8]">
              <Globe2 className="h-4 w-4 text-blue-300" />
              Ethereum Sepolia testnet
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-sm font-medium text-green-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
          <div className="hidden h-12 max-w-[13rem] items-center gap-2 rounded-full border border-white/10 bg-[#111827] px-4 text-sm text-white shadow-lg shadow-black/10 md:flex">
            <Wallet className="h-4 w-4 text-blue-300" />
            <span className="max-w-[9rem] truncate font-mono tracking-wide">
              {wallet ? `Connected ${walletLabel}` : "Not connected"}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={connectWallet}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-violet-400/20 bg-gradient-to-r from-violet-600 to-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
          >
            <span>{wallet ? "Connected" : "Connect wallet"}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}