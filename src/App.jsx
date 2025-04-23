import { useState } from "react";

export default function MitosisAirdropEstimator() {
  const [points, setPoints] = useState(0);
  const [fdv, setFdv] = useState(150);
  const [hasNft, setHasNft] = useState(false);
  const [hasDiscordRole, setHasDiscordRole] = useState(false);
  const [xp, setXp] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [nftWeight, setNftWeight] = useState(0.15);
  const [discordWeight, setDiscordWeight] = useState(0.15);
  const [xpWeight, setXpWeight] = useState(0.10);

  const totalPoints = 194_000_000_000;

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
    if (hasNft) bonus += nftWeight * bonusPool;
    if (hasDiscordRole) bonus += discordWeight * bonusPool;
    bonus += xpWeight * bonusPool * (xp / 100);
    return bonus;
  };

  const allocation10 = estimateExpeditionAllocation(fdv, 0.10) + estimateBonusAllocation(fdv, 0.10);
  const allocation20 = estimateExpeditionAllocation(fdv, 0.20) + estimateBonusAllocation(fdv, 0.20);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 sm:p-4 space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <img src="https://mitosis.org/favicon.svg" alt="Mitosis Logo" className="h-10 sm:h-8" />
        <h1 className="text-2xl font-bold sm:text-xl text-center sm:text-left">💧 Mitosis Airdrop Estimator</h1>
      </div>
      <p className="text-sm text-gray-300 text-center sm:text-left">
        Estimate your airdrop allocation in USD, based on your MITO Points, NFT ownership, testnet XP and Discord role.
      </p>
      <hr className="my-4 border-gray-700" />

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

        <label className="block text-sm font-medium">
          <input
            type="checkbox"
            className="mr-2"
            checked={hasNft}
            onChange={(e) => setHasNft(e.target.checked)}
          />
          Owns eligible NFT (e.g. Morse or partner collections)
        </label>

        <label className="block text-sm font-medium">
          <input
            type="checkbox"
            className="mr-2"
            checked={hasDiscordRole}
            onChange={(e) => setHasDiscordRole(e.target.checked)}
          />
          Verified Discord community role
        </label>

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
            <div className="text-sm font-medium">Customize bonus weights (sum should be ~40%)</div>
            <label className="block text-sm">NFT weight (%)
              <input
                type="number"
                className="w-full mt-1 px-2 py-1 rounded text-black"
                value={nftWeight * 100}
                onChange={(e) => setNftWeight(parseFloat(e.target.value) / 100)}
              />
            </label>
            <label className="block text-sm">Discord Role weight (%)
              <input
                type="number"
                className="w-full mt-1 px-2 py-1 rounded text-black"
                value={discordWeight * 100}
                onChange={(e) => setDiscordWeight(parseFloat(e.target.value) / 100)}
              />
            </label>
            <label className="block text-sm">XP weight (%)
              <input
                type="number"
                className="w-full mt-1 px-2 py-1 rounded text-black"
                value={xpWeight * 100}
                onChange={(e) => setXpWeight(parseFloat(e.target.value) / 100)}
              />
            </label>
          </div>
        )}
      </div>

      <hr className="my-4 border-gray-700" />

      <div className="bg-gray-800 p-4 rounded">
        <div className="text-lg font-semibold mb-2">Estimated Allocation:</div>
        <div className="text-sm">🔹 10% Airdrop scenario: <strong>${allocation10.toFixed(2)} USD</strong></div>
        <div className="text-sm">🔸 20% Airdrop scenario: <strong>${allocation20.toFixed(2)} USD</strong></div>
      </div>
    </div>
  );
}
