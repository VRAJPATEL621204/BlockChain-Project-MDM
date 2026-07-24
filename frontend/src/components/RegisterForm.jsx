import { motion } from "framer-motion";
import { LoaderCircle, LockKeyhole, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getSignerContract } from "../utils/blockchain";

function FloatingField({ label, value, onChange, type = "text", autoComplete }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#94A3B8]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="h-12 w-full rounded-xl border border-white/10 bg-[#030712]/50 px-4 text-sm text-white outline-none transition placeholder:text-[#94A3B8] focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-lg backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-violet-200">
            Registration
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Reserve your seat
          </h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Submit your details securely on-chain.
          </p>
        </div>
        <div className="hidden h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#1F2937] text-violet-300 sm:flex">
          <LockKeyhole className="h-5 w-5" />
        </div>
      </div>

      <form onSubmit={handleRegister} className="mt-8 space-y-6">
        <FloatingField
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

        <FloatingField
          label="Roll number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          autoComplete="off"
        />

        <FloatingField
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          autoComplete="organization"
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={loading ? undefined : { scale: 1.01 }}
          whileTap={loading ? undefined : { scale: 0.99 }}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Registering on-chain
            </>
          ) : (
            <>
              <UserRoundPlus className="h-4 w-4" />
              Register now
            </>
          )}
        </motion.button>
      </form>
    </motion.section>
  );
}