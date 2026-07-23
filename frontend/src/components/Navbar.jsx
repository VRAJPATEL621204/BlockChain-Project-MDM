export default function Navbar({ wallet, connectWallet }) {
  return (
    <nav className="flex justify-between items-center py-8">

      <div>
        <h1 className="text-6xl font-bold text-white flex items-center gap-3">
          🎓 Workshop Registration
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Ethereum Sepolia
        </p>
      </div>

      <button
        onClick={connectWallet}
        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition font-semibold"
      >
        {wallet
          ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
          : "Connect Wallet"}
      </button>

    </nav>
  );
}