import { useState } from "react";
import { toast } from "react-hot-toast";
import { getSignerContract } from "../utils/blockchain";

export default function RegisterForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (!name || !rollNo || !department) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { contract } = await getSignerContract();

      const tx = await contract.register(
        name,
        rollNo,
        department
      );

      toast.loading("Transaction Pending...");

      await tx.wait();

      toast.dismiss();
      toast.success("Registration Successful!");

      setName("");
      setRollNo("");
      setDepartment("");

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      toast.dismiss();

      console.log(err);

      toast.error(
        err.reason ||
        err.shortMessage ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Register for Workshop
      </h2>

      <form
        onSubmit={handleRegister}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl bg-white/10
border
border-white/20
focus:ring-2
focus:ring-purple-500
rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="w-full rounded-xl bg-white/10
border
border-white/20
focus:ring-2
focus:ring-purple-500
rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full rounded-xl bg-white/10
border
border-white/20
focus:ring-2
focus:ring-purple-500
rounded-xl p-3"
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r
from-purple-600
to-pink-600
hover:scale-105
transition
duration-300 hover:bg-purple-700 transition p-3 font-semibold"
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </form>

    </div>
  );
}