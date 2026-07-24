import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Loader() {
	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4 text-white">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_24%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,72px_72px,72px_72px] opacity-70" />
			<motion.div
				initial={{ opacity: 0, scale: 0.98 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.35, ease: "easeOut" }}
				className="relative grid w-full max-w-5xl gap-6 sm:grid-cols-2"
			>
				{[0, 1].map((index) => (
					<motion.div
						key={index}
						animate={{ opacity: [0.45, 0.85, 0.45] }}
						transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
						className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-lg backdrop-blur-xl"
					>
						<div className="h-4 w-36 rounded-full bg-white/10" />
						<div className="mt-4 h-8 w-2/3 rounded-xl bg-white/10" />
						<div className="mt-3 h-4 w-full rounded-full bg-white/10" />
						<div className="mt-3 h-4 w-5/6 rounded-full bg-white/10" />
						<div className="mt-6 h-28 rounded-2xl bg-[#1F2937]" />
					</motion.div>
				))}

				<div className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-lg backdrop-blur-xl sm:col-span-2">
					<div className="flex items-center gap-3">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
							className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600"
						>
							<Sparkles className="h-5 w-5 text-white" />
						</motion.div>
						<div>
							<p className="text-lg font-semibold text-white">Loading workshop dashboard</p>
							<p className="text-sm text-[#94A3B8]">Fetching on-chain workshop state and participant records.</p>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
