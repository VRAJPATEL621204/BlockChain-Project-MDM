import { useEffect, useState } from "react";
import { getContract } from "../utils/blockchain";
import useWallet from "../hooks/useWallet";
import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";
import WorkshopCard from "../components/WorkshopCard";
import ParticipantList from "../components/ParticipantList";
import AdminPanel from "../components/AdminPanel";



export default function Home() {
  const { wallet, connectWallet } = useWallet();

  const [workshop, setWorkshop] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

async function loadWorkshop() {

  try {

    setLoading(true);

    const { contract } = await getContract();

    const workshopData =
      await contract.getWorkshop();

    const participantCount =
      await contract.getParticipantCount();

    const owner =
  await contract.getOwner();

const accounts =
  await window.ethereum.request({
    method: "eth_accounts",
  });

if(accounts.length){

  setIsOwner(

    owner.toLowerCase() ===
    accounts[0].toLowerCase()

  );

}

    const participantList = [];

    for (
      let i = 0;
      i < Number(participantCount);
      i++
    ) {

      const p =
        await contract.getParticipant(i);

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Loading Workshop...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    
 <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white p-8">

    <Navbar
    wallet={wallet}
    connectWallet={connectWallet}
/>

    {workshop && (
      <>
        <WorkshopCard workshop={workshop} />

        {/* Registration Form */}
        <RegisterForm onSuccess={loadWorkshop} />

        <ParticipantList
    participants={participants}
/>


<AdminPanel

    isOwner={isOwner}

    onSuccess={loadWorkshop}

/>

      </>
    )}

  </div>
);

}