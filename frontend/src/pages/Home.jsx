import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ShieldAlert, Sparkles } from "lucide-react";
import { getContract } from "../utils/blockchain";
import useWallet from "../hooks/useWallet";
import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";
import WorkshopCard from "../components/WorkshopCard";
import ParticipantList from "../components/ParticipantList";
import AdminPanel from "../components/AdminPanel";
import Footer from "../components/Footer";
import Loader from "../components/Loader";



export default function Home() {
  const { wallet, connectWallet } = useWallet();

  const [workshop, setWorkshop] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const heroStats = useMemo(() => {
    if (!workshop) {
      return [];
    }

    const occupiedSeats = workshop.totalSeats - workshop.remainingSeats;

    const totalSeats = Math.max(workshop.totalSeats, 1);

    return [
      {
        label: "Capacity",
        value: `${Math.round((occupiedSeats / totalSeats) * 100)}%`,
      },
      {
        label: "Registered",
        value: workshop.participants,
      },
      {
        label: "Network",
        value: "Sepolia",
      },
    ];
  }, [workshop]);

  async function loadWorkshop() {
    try {
      setLoading(true);

      const { contract } = await getContract();

      const workshopData = await contract.getWorkshop();
      const participantCount = await contract.getParticipantCount();
      const owner = await contract.getOwner();

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());
      }

      const participantList = [];

      for (let i = 0; i < Number(participantCount); i++) {
        const p = await contract.getParticipant(i);

        participantList.push({
          name: p[0],
          rollNo: p[1],
          department: p[2],
          wallet: p[3],
        });
      }

      setParticipants(participantList);

      setWorkshop({
        title: workshopData[0],
        description: workshopData[1],
        date: workshopData[2],
        totalSeats: Number(workshopData[3]),
        remainingSeats: Number(workshopData[4]),
        participants: Number(participantCount),
      });

      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to load workshop.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkshop();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_28%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,64px_64px,64px_64px] opacity-60" />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#111827] p-6 text-center shadow-lg shadow-black/30 backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Unable to load the workshop
            </h1>
            <p className="mt-2 text-sm text-[#94A3B8]">{error}</p>
            <button
              onClick={loadWorkshop}
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 text-sm font-semibold text-white transition hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
            >
              <RefreshCw className="h-4 w-4" />
              Retry loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_24%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.08),_transparent_30%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,100%_100%,72px_72px,72px_72px] opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-violet-500/10 to-transparent blur-3xl" />

      <div className="relative z-10">
        <Navbar wallet={wallet} connectWallet={connectWallet} />

        {workshop && (
          <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:items-start">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-lg backdrop-blur-xl"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.16),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.12),_transparent_24%)]" />
                  <div className="relative space-y-6">
                    <div>
                      <div className="inline-flex h-8 items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 text-sm font-semibold text-violet-200">
                        <Sparkles className="h-4 w-4" />
                        Blockchain Workshop Dashboard
                      </div>
                      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                        Blockchain Workshop Dashboard
                      </h1>
                      <p className="mt-2 text-sm text-[#94A3B8]">
                        Secure on-chain registration powered by Ethereum Sepolia.
                      </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-3">
                      {heroStats.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex h-full min-h-28 flex-col justify-between rounded-2xl border border-white/10 bg-[#1F2937] p-6"
                        >
                          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
                            {stat.label}
                          </p>
                          <p className="mt-3 text-lg font-semibold text-white">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <WorkshopCard workshop={workshop} />
                <RegisterForm onSuccess={loadWorkshop} />
              </div>

              <aside className="space-y-6 xl:sticky xl:top-24">
                <ParticipantList participants={participants} />
                <AdminPanel isOwner={isOwner} onSuccess={loadWorkshop} />
              </aside>
            </section>
          </div>
        )}

        {workshop && <Footer />}
      </div>
    </motion.main>
  );

}