import { motion } from "framer-motion";
import { Minus, RotateCcw, Settings2, ShieldCheck, Sparkles, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getSignerContract } from "../utils/blockchain";

export default function AdminPanel({
  isOwner,
  onSuccess,
}) {

  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!isOwner) return null;

  // ===========================
  // Increase Seats
  // ===========================

  async function increaseSeats() {

    try {

      setLoading(true);

      const { contract } =
        await getSignerContract();

      const tx =
        await contract.increaseSeats(Number(seats));

      toast.loading("Increasing Seats...");

      await tx.wait();

      toast.dismiss();

      toast.success("Seats Increased!");

      onSuccess();

    } catch (err) {

      toast.dismiss();

      toast.error(
        err.reason ||
        err.shortMessage ||
        "Transaction Failed"
      );

    } finally {

      setLoading(false);

    }

  }

  // ===========================
  // Decrease Seats
  // ===========================

  async function decreaseSeats() {

    try {

      setLoading(true);

      const { contract } =
        await getSignerContract();

      const tx =
        await contract.decreaseSeats(Number(seats));

      toast.loading("Reducing Seats...");

      await tx.wait();

      toast.dismiss();

      toast.success("Seats Reduced!");

      onSuccess();

    } catch (err) {

      toast.dismiss();

      toast.error(
        err.reason ||
        err.shortMessage ||
        "Transaction Failed"
      );

    } finally {

      setLoading(false);

    }

  }

  // ===========================
  // Reset Workshop
  // ===========================

  async function resetWorkshop() {

    try {

      setLoading(true);

      const { contract } =
        await getSignerContract();

      const tx =
        await contract.resetWorkshop();

      toast.loading("Resetting Workshop...");

      await tx.wait();

      toast.dismiss();

      toast.success("Workshop Reset!");

      onSuccess();

    } catch (err) {

      toast.dismiss();

      toast.error(
        err.reason ||
        err.shortMessage ||
        "Reset Failed"
      );

    } finally {

      setLoading(false);

    }

  }

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
            Admin console
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Workshop controls
          </h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Manage seats and reset the workshop from one secure console.
          </p>
        </div>

        <div className="hidden h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#1F2937] text-violet-300 sm:flex">
          <ShieldCheck className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#1F2937] p-6">
        <label className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
          <Settings2 className="h-4 w-4 text-violet-300" />
          Seat management
        </label>

        <div className="grid gap-3 sm:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)]">
          <input
            type="number"
            min="1"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 bg-[#030712]/50 px-4 text-sm text-white outline-none transition placeholder:text-[#94A3B8] focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Seat amount"
          />

          <button
            disabled={loading}
            onClick={increaseSeats}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Plus className="h-4 w-4" />
            Increase
          </button>

          <button
            disabled={loading}
            onClick={decreaseSeats}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Minus className="h-4 w-4" />
            Decrease
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-red-500/15 bg-red-500/5 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-300 ring-1 ring-red-500/15">
            <RotateCcw className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-white">
              Reset workshop
            </h3>
            <p className="mt-1 text-sm text-[#94A3B8]">
              Clear the workshop state and return all seats to the initial configuration.
            </p>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={resetWorkshop}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 text-sm font-semibold text-red-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Sparkles className="h-4 w-4" />
          Reset
        </button>
      </div>
    </motion.section>

  );

}