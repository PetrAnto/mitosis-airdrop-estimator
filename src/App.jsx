import { useState } from "react";

export default function MitosisAirdropEstimator() {
  const [points, setPoints] = useState(0);
  const [fdv, setFdv] = useState(150);
  const [hasNft, setHasNft] = useState(false);
  const [hasDiscordRole, setHasDiscordRole] = useState(false);
  const [xp, setXp] = useState(0);

  const totalPoints = 194_000_000_000;
  const morseNftSupply = 2924;
  const partnerNftTotal = 38888;

  const estimateExpeditionAllocation = (fdvValue, percent) => {
    const totalUSD = (fdvValue * 1_000_000) * percent;
    const expeditionShare = 0.60;
    const expeditionUSD = totalUSD * expeditionShare;
    return (points / totalPoints) * expeditionUSD;
  };

  const estimateBonusAllocation = (fdvValue, percent) => {
    const totalUSD = (fdvValue * 1_000_000) * percent;
    const bonusPool = totalUSD * 0.40;
    let bonus = 0;
    if (hasNft) bonus += bonusPool * (1 / (partnerNftTotal + morseNftSupply));
    if (hasDiscordRole) bonus += bonusPool * 0.15;
    bonus += 0.10 * bonusPool * (xp / 100);
    return bonus;
  };

  const allocation10 = estimateExpeditionAllocation(fdv, 0.10) + estimateBonusAllocation(fdv, 0.10);
  const allocation20 = estimateExpeditionAllocation(fdv, 0.20) + estimateBonusAllocation(fdv, 0.20);

  return (
    <div className="min-h-screen bg-black text-white max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">💧 PetrAnto Mitosis Airdrop Calculator</h1>
      <p className="text-sm text-gray-400 text-center">
        Estimate your airdrop allocation in USD, based on your MITO Points, NFT ownership, testnet XP and Discord role.
      </p>

      <hr className="my-4 border-gray-700" />

      <div className="space-y-4">
        <label htmlFor="points" className="block text-sm font-medium">Your MITO Points</label>
        <input
          id="points"
          className="w-1/2 p-2 rounded text-black"
          type="number"
          value={points}
          onChange={(e) => setPoints(parseFloat(e.target.value))}
          placeholder="e.g. 8191427"
        />
        <div className="text-xs text-gray-400">Used to calculate your share in the Expedition 60% pool</div>

        <label htmlFor="xp" className="block text-sm font-medium">Testnet XP (0–100)</label>
        <input
          id="xp"
          type="range"
          min={0}
          max={100}
          value={xp}
          onChange={(e) => setXp(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-sm">XP: {xp}</div>
        <div className="text-xs text-gray-400">Adds a % share from a 10% Testnet XP Bonus Pool</div>

        <label className="block text-sm font-medium mt-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={hasNft}
            onChange={(e) => setHasNft(e.target.checked)}
          />
          Owns eligible NFT (Morse or partner collections)
        </label>
        <div className="text-xs text-gray-400">Pro-rata distribution based on ~41,000 NFTs + Morse NFTs separately</div>

        <label className="block text-sm font-medium">
          <input
            type="checkbox"
            className="mr-2"
            checked={hasDiscordRole}
            onChange={(e) => setHasDiscordRole(e.target.checked)}
          />
          Verified Discord community role
        </label>
        <div className="text-xs text-gray-400">Assumed to receive 15% of Bonus Pool shared equally</div>

        <label htmlFor="fdv" className="block text-sm font-medium mt-4">Fully Diluted Valuation (FDV) in million USD</label>
        <input
          id="fdv"
          type="range"
          min={50}
          max={500}
          step={10}
          value={fdv}
          onChange={(e) => setFdv(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-muted-foreground">Selected FDV: {fdv} M$</div>
      </div>

      <hr className="my-4 border-gray-700" />

      <div className="bg-gray-800 p-4 rounded">
        <div className="text-lg font-semibold mb-2">Estimated Allocation:</div>
        <div className="text-sm">🔹 10% Airdrop scenario: <strong>${allocation10.toFixed(2)} USD</strong></div>
        <div className="text-sm">🔸 20% Airdrop scenario: <strong>${allocation20.toFixed(2)} USD</strong></div>
      </div>

      <footer className="pt-4 text-center text-xs text-gray-500">
        Built by <a href="https://x.com/PetrAnto12" className="text-blue-400 hover:underline" target="_blank">@PetrAnto12</a>
      </footer>
    </div>
  );
}
