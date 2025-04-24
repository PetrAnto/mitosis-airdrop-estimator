import { useState } from "react";

export default function MitosisAirdropEstimator() { const [points, setPoints] = useState(0); const [fdv, setFdv] = useState(150); const [xp, setXp] = useState(0); const [showAdvanced, setShowAdvanced] = useState(false);

const [morsePercent, setMorsePercent] = useState(0); const [discordPercent, setDiscordPercent] = useState(0); const [partnersPercent, setPartnersPercent] = useState(0); const [kaitoPercent, setKaitoPercent] = useState(0);

const totalPoints = 194_000_000_000;

const estimateExpeditionAllocation = (fdvValue, percent) => { const totalUSD = fdvValue * 1_000_000 * percent; const expeditionShare = 0.60; return (points / totalPoints) * (totalUSD * expeditionShare); };

const estimateAdditionalRewards = (fdvValue) => { const totalUSD = fdvValue * 1_000_000; const morse = totalUSD * (morsePercent / 100); const discord = totalUSD * (discordPercent / 100); const partners = totalUSD * (partnersPercent / 100); const kaito = totalUSD * (kaitoPercent / 100); return morse + discord + partners + kaito; };

const estimateGameOfMito = (fdvValue, percent = 0.20) => { const totalUSD = fdvValue * 1_000_000 * percent; const gofShare = 0.27; // 27% of points are top 20% return (points / (totalPoints * 0.73)) * (totalUSD * gofShare); };

const allocation10 = estimateExpeditionAllocation(fdv, 0.10) + estimateAdditionalRewards(fdv); const allocation20 = estimateExpeditionAllocation(fdv, 0.20) + estimateAdditionalRewards(fdv); const gameOfMito20 = estimateGameOfMito(fdv);

return ( <div className="bg-gray-900 text-white min-h-screen p-6 sm:p-4 space-y-6 max-w-3xl mx-auto"> <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"> <img src="https://mitosis.org/logo-dark.svg" alt="Mitosis Logo" className="h-10 sm:h-8" /> <h1 className="text-2xl font-bold sm:text-xl text-center sm:text-left">💧 Mitosis Airdrop Estimator</h1> </div> <p className="text-sm text-gray-300 text-center sm:text-left"> Estimate your airdrop allocation in USD, based on your MITO Points, and custom allocation assumptions. </p> <hr className="my-4 border-gray-700" />

<div className="space-y-4">
    <label className="block text-sm font-medium">Your MITO Points</label>
    <input
      type="number"
      className="w-full border rounded px-3 py-2 text-black"
      value={points}
      onChange={(e) => setPoints(parseFloat(e.target.value))}
      placeholder="e.g. 8191427"
    />

    <label className="block text-sm font-medium mt-4">Testnet XP (0–100)</label>
    <input
      type="range"
      min={0}
      max={100}
      value={xp}
      onChange={(e) => setXp(parseInt(e.target.value))}
      className="w-full"
    />
    <div className="text-sm">XP: {xp}</div>

    <label className="block text-sm font-medium mt-4">Fully Diluted Valuation (FDV) in million USD</label>
    <input
      type="range"
      min={50}
      max={500}
      step={10}
      value={fdv}
      onChange={(e) => setFdv(parseInt(e.target.value))}
      className="w-full"
    />
    <div className="text-sm">Selected FDV: {fdv} M$</div>

    <button
      onClick={() => setShowAdvanced(!showAdvanced)}
      className="mt-4 text-sm text-blue-400 underline"
    >
      {showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
    </button>

    {showAdvanced && (
      <div className="space-y-2 mt-2">
        <div className="text-sm font-medium">Custom % of FDV allocated to additional rewards:</div>
        <label className="block text-sm">Morse NFTs (%)
          <input
            type="number"
            className="w-full mt-1 px-2 py-1 rounded text-black"
            value={morsePercent}
            onChange={(e) => setMorsePercent(parseFloat(e.target.value))}
          />
        </label>
        <label className="block text-sm">Discord Role (%)
          <input
            type="number"
            className="w-full mt-1 px-2 py-1 rounded text-black"
            value={discordPercent}
            onChange={(e) => setDiscordPercent(parseFloat(e.target.value))}
          />
        </label>
        <label className="block text-sm">Partner NFTs (%)
          <input
            type="number"
            className="w-full mt-1 px-2 py-1 rounded text-black"
            value={partnersPercent}
            onChange={(e) => setPartnersPercent(parseFloat(e.target.value))}
          />
        </label>
        <label className="block text-sm">Kaito Leaderboard (%)
          <input
            type="number"
            className="w-full mt-1 px-2 py-1 rounded text-black"
            value={kaitoPercent}
            onChange={(e) => setKaitoPercent(parseFloat(e.target.value))}
          />
        </label>
      </div>
    )}
  </div>

  <hr className="my-4 border-gray-700" />

  <div className="bg-gray-800 p-4 rounded space-y-1">
    <div className="text-lg font-semibold">Estimated Allocation:</div>
    <div className="text-sm">🔹 10% Airdrop scenario: <strong>${allocation10.toFixed(2)} USD</strong></div>
    <div className="text-sm">🔸 20% Airdrop scenario: <strong>${allocation20.toFixed(2)} USD</strong></div>
    <div className="text-sm">🎯 Game of Mito Testnet (Top 27% weight): <strong>${gameOfMito20.toFixed(2)} USD</strong></div>
  </div>
</div>
  );
}
