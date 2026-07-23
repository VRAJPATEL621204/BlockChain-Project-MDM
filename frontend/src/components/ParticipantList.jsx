import { User, GraduationCap } from "lucide-react";

export default function ParticipantList({ participants }) {

  // Latest registrations first
  const latestParticipants = [...participants].reverse();

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 mt-8 shadow-xl">

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <GraduationCap className="text-purple-500" />
        Participants ({participants.length})
      </h2>

      {participants.length === 0 ? (

        <p className="text-gray-400">
          No participants registered yet.
        </p>

      ) : (

        <div className="h-[420px] overflow-y-scroll pr-2 space-y-5">

          {latestParticipants.map((participant, index) => (

            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 hover:border-purple-500 hover:scale-[1.01] transition-all duration-300"
            >

              <div className="flex flex-col md:flex-row justify-between gap-5">

                <div>

                  <h3 className="text-xl font-semibold flex items-center gap-2">

                    <User
                      size={20}
                      className="text-purple-400"
                    />

                    {participant.name}

                  </h3>

                  <p className="text-gray-400 mt-3">
                    <span className="font-semibold">
                      Roll Number:
                    </span>{" "}
                    {participant.rollNo}
                  </p>

                  <p className="text-gray-400">
                    <span className="font-semibold">
                      Department:
                    </span>{" "}
                    {participant.department}
                  </p>

                </div>

                <div className="text-left md:text-right">

                  <p className="text-sm text-gray-500">
                    Wallet
                  </p>

                  <p className="text-sm font-mono text-purple-400">
                    {participant.wallet.slice(0, 6)}
                    ...
                    {participant.wallet.slice(-4)}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}