import { motion } from "framer-motion";
import { Blocks, CircleCheckBig, Globe2 } from "lucide-react";

export default function Footer() {
	return (
		<motion.footer
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: "easeOut" }}
			className="mx-auto mt-8 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
		>
			<div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-lg backdrop-blur-xl md:flex-row md:items-center md:justify-between">
				<div>
					<p className="text-sm font-semibold text-white">
						Built with React + Solidity + Ethereum
					</p>
					<p className="mt-1 text-sm text-[#94A3B8]">
						Minimal dashboard running on Sepolia.
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-2 text-sm">
					<span className="inline-flex h-10 items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 font-medium text-green-300">
						<CircleCheckBig className="h-4 w-4" />
						Sepolia online
					</span>
					<span className="inline-flex h-10 items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 font-medium text-violet-200">
						<Blocks className="h-4 w-4" />
						On-chain
					</span>
					<span className="inline-flex h-10 items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 font-medium text-blue-200">
						<Globe2 className="h-4 w-4" />
						Ethereum ready
					</span>
				</div>
			</div>
		</motion.footer>
	);
}
