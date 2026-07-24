import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, ScrollText, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function ParticipantList({ participants }) {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const latestParticipants = useMemo(
    () => [...participants].reverse(),
    [participants]
  );

  const totalPages = Math.max(1, Math.ceil(latestParticipants.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [participants]);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages));
  }, [totalPages]);

  const pageStart = (page - 1) * pageSize;
  const visibleParticipants = latestParticipants.slice(pageStart, pageStart + pageSize);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-lg backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-violet-200">
            Registry
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Participants ({participants.length})
          </h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Compact roster with wallet identity and registration details.
          </p>
        </div>

        <div className="hidden h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#1F2937] text-violet-300 sm:flex">
          <ScrollText className="h-5 w-5" />
        </div>
      </div>

      {participants.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-[#1F2937] p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#030712]/50 text-violet-300">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">
            No participants yet
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-[#94A3B8]">
            Registrations will appear here with wallet and enrollment details.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {visibleParticipants.map((participant, index) => (
                <motion.article
                  key={`${participant.wallet}-${participant.rollNo}-${index}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="group rounded-2xl border border-white/10 bg-[#1F2937] p-6 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-[#111827]"
                >
                  <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div className="min-w-0 space-y-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-violet-300 ring-1 ring-white/10 transition group-hover:bg-violet-500/10 group-hover:text-violet-200">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-semibold text-white">
                            {participant.name}
                          </h3>
                          <p className="truncate text-sm text-[#94A3B8]">
                            {participant.department}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2">
                        <span className="truncate rounded-xl border border-white/10 bg-[#030712]/40 px-3 py-2 text-sm text-white">
                          Roll {participant.rollNo}
                        </span>
                        <span className="truncate rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-200">
                          {participant.department}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#030712]/40 p-4 md:min-w-56">
                      <p className="text-sm font-medium text-[#94A3B8]">Wallet</p>
                      <p className="mt-2 truncate font-mono text-sm text-white">
                        {participant.wallet.slice(0, 6)}...{participant.wallet.slice(-4)}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#1F2937] p-6">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#030712]/40 px-4 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>

            <div className="text-sm text-[#94A3B8]">
              Page <span className="font-semibold text-white">{page}</span> of <span className="font-semibold text-white">{totalPages}</span>
            </div>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#030712]/40 px-4 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </motion.section>
  );
}