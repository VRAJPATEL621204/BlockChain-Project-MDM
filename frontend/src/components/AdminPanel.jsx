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

    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 mt-8 shadow-2xl">

      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">
        👑 Admin Panel
      </h2>

      <div className="space-y-6">

        <div>

          <label className="block text-gray-300 mb-2 font-medium">
            Seat Management
          </label>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="number"
              min="1"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full md:w-40 bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              disabled={loading}
              onClick={increaseSeats}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition duration-300 rounded-xl py-3 font-semibold"
            >
              ➕ Increase Seats
            </button>

            <button
              disabled={loading}
              onClick={decreaseSeats}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition duration-300 rounded-xl py-3 font-semibold"
            >
              ➖ Decrease Seats
            </button>

          </div>

        </div>

        <div className="border-t border-white/10 pt-6">

          <button
            disabled={loading}
            onClick={resetWorkshop}
            className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 transition duration-300 rounded-xl py-3 font-semibold"
          >
            🔄 Reset Workshop
          </button>

        </div>

      </div>

    </div>

  );

}