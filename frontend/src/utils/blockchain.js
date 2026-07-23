import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../config/contract";

export async function getContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    provider
  );

  return {
    provider,
    contract,
  };
}

export async function getSignerContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    signer
  );

  return {
    provider,
    signer,
    contract,
  };
}