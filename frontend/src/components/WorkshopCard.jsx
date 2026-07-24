import { motion } from "framer-motion";
import { Armchair, CalendarDays, Sparkles, Users } from "lucide-react";

export default function WorkshopCard({ workshop }) {
  const occupiedSeats = workshop.totalSeats - workshop.remainingSeats;
  const totalSeats = Math.max(workshop.totalSeats, 1);
  const percentage = Math.min(
    100,
    (occupiedSeats / totalSeats) * 100
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-lg backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex h-8 items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 text-sm font-semibold text-violet-200">
            <Sparkles className="h-4 w-4" />
            Workshop overview
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
            {workshop.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#94A3B8]">
            {workshop.description}
          </p>
        </div>

        <div
          className={`inline-flex h-12 items-center gap-2 rounded-xl border px-4 text-sm font-semibold shadow-sm ${
            workshop.remainingSeats > 0
              ? "border-green-500/20 bg-green-500/10 text-green-300"
              : "border-red-500/20 bg-red-500/10 text-red-300"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              workshop.remainingSeats > 0 ? "bg-green-400" : "bg-red-400"
            }`}
          />
          {workshop.remainingSeats > 0 ? "Registration open" : "Workshop full"}
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="flex h-full min-h-28 flex-col justify-between rounded-2xl border border-white/10 bg-[#1F2937] p-6">
          <CalendarDays className="h-5 w-5 text-blue-300" />
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
            Workshop date
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {workshop.date}
          </p>
        </div>

        <div className="flex h-full min-h-28 flex-col justify-between rounded-2xl border border-white/10 bg-[#1F2937] p-6">
          <Armchair className="h-5 w-5 text-blue-300" />
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
            Seats remaining
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {workshop.remainingSeats} / {workshop.totalSeats}
          </p>
        </div>

        <div className="flex h-full min-h-28 flex-col justify-between rounded-2xl border border-white/10 bg-[#1F2937] p-6">
          <Users className="h-5 w-5 text-blue-300" />
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
            Participants
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {workshop.participants}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-[#1F2937] p-6">
        <div className="mb-3 flex items-center justify-between text-sm text-[#94A3B8]">
          <span>Capacity utilization</span>
          <span className="font-semibold text-white">{Math.round(percentage)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#030712]/70 ring-1 ring-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
          />
        </div>
      </div>
    </motion.section>
  );
}