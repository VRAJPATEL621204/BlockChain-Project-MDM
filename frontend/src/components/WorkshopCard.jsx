import { Calendar, Users, Armchair } from "lucide-react";

export default function WorkshopCard({ workshop }) {
  const percentage =
    ((workshop.totalSeats - workshop.remainingSeats) /
      workshop.totalSeats) *
    100;

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 mt-8">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

        <div>
          <h2 className="text-3xl font-bold text-white">
            {workshop.title}
          </h2>

          <p className="text-gray-300 mt-2">
            {workshop.description}
          </p>
        </div>

        <div
          className={`px-5 py-2 rounded-full font-semibold ${
            workshop.remainingSeats > 0
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {workshop.remainingSeats > 0
            ? "🟢 Registration Open"
            : "🔴 Workshop Full"}
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

          <Calendar className="text-purple-400 mb-3" size={28} />

          <p className="text-gray-400">
            Workshop Date
          </p>

          <p className="font-semibold text-lg mt-1">
            {workshop.date}
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

          <Armchair className="text-purple-400 mb-3" size={28} />

          <p className="text-gray-400">
            Seats Remaining
          </p>

          <p className="font-semibold text-lg mt-1">
            {workshop.remainingSeats} / {workshop.totalSeats}
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

          <Users className="text-purple-400 mb-3" size={28} />

          <p className="text-gray-400">
            Participants
          </p>

          <p className="font-semibold text-lg mt-1">
            {workshop.participants}
          </p>

        </div>

      </div>

      <div className="mt-10">

        <div className="flex justify-between mb-2">

          <span className="text-gray-400">
            Workshop Capacity
          </span>

          <span className="font-bold">
            {Math.round(percentage)}%
          </span>

        </div>

        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-green-400 via-purple-500 to-pink-500 rounded-full transition-all duration-700"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}