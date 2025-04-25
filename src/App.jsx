import { useState } from "react";

export default function MitosisAirdropEstimator() {
  const [points, setPoints] = useState(0);
  const [fdv, setFdv] = useState(150);
  const [hasMorseNft, setHasMorseNft] = useState(false);
  const [hasPartnerNft, setHasPartnerNft] = useState(false);
  const [hasMiRole, setHasMiRole] = useState(false);
  const [miRolePercent, setMiRolePercent] = useState(1);
  const [hasInternRole, setHasInternRole] = useState(false);
  const [internRolePercent, setInternRolePercent] = useState(1);
  const [xp, setXp] = useState(0);

  const totalPoints = 194_000_000_000;
  const morseNftSupply = 2924;
  const partnerNftSupply = 38888;

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

    if (hasMorseNft) bonus += bonusPool * (1 / morseNftSupply);
    if (hasPartnerNft) bonus += bonusPool * (1 / partnerNftSupply);
    if (hasMiRole) bonus += bonusPool * (miRolePercent / 100);
    if (hasInternRole) bonus += bonusPool * (internRolePercent / 100);
    bonus += 0.10 * bonusPool * (xp / 100); // XP Bonus (fixed 10% pool)

    return bonus;
  };

  const allocation10 = estimateExpeditionAllocation(fdv, 0.10) + estimateBonusAllocation(fdv, 0.10);
  const allocation20 = estimateExpeditionAllocation(fdv, 0.20) + estimateBonusAllocation(fdv, 0.20);

  return (
    <div className="min-h-screen bg-black text-white max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">💧 PetrAnto Mitosis Airdrop Calculator</h1>
      <p className="text-sm text-gray-400 text-center">
        Estimate your airdrop allocation based on your MITO Points, NFT holdings, Discord roles, and Testnet XP.
      </p>

      <hr className="border-gray-700 my-4" />

      {/* Expedition Points */}
      <label htmlFor="points" className="block text-sm font-medium">Your MITO Points</label>
      <input
        id="points"
        type="number"
        className="w-1/2 p-2 rounded text-black"
        value={points}
        onChange={(e) => setPoints(parseFloat(e.target.value))}
        placeholder="e.g. 8191427"
      />
      <div className="text-xs text-gray-400">Used to calculate your share in the Expedition 60% pool</div>

      <hr className="border-gray-700 my-4" />

      {/* NFT Ownership Section */}
      <label className="block text-sm font-medium">
        <input
          type="checkbox"
          className="mr-2"
          checked={hasMorseNft}
          onChange={(e) => setHasMorseNft(e.target.checked)}
        />
        Owns Morse NFT (2,924 total supply)
      </label>

      <label className="block text-sm font-medium mt-2">
        <input
          type="checkbox"
          className="mr-2"
          checked={hasPartnerNft}
          onChange={(e) => setHasPartnerNft(e.target.checked)}
        />
        Owns Partner Collection NFT (38,888 total supply)
      </label>

      <hr className="border-gray-700 my-4" />

      {/* Discord Roles Section */}
      <label className="block text-sm font-medium">
        <input
          type="checkbox"
          className="mr-2"
          checked={hasMiRole}
          onChange={(e) => setHasMiRole(e.target.checked)}
        />
        Verified Mi-Role
      </label>
      {hasMiRole && (
        <>
          <input
            type="range"
            min={0}
            max={15}
            step={0.5}
            value={miRolePercent}
            onChange={(e) => setMiRolePercent(parseFloat(e.target.value))}
            className="w-1/2"
          />
          <div className="text-xs text-gray-400">Mi-Role Bonus: {miRolePercent}% of Bonus Pool</div>
        </>
      )}

      <label className="block text-sm font-medium mt-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={hasInternRole}
          onChange={(e) => setHasInternRole(e.target.checked)}
        />
        Verified Intern-Role
      </label>
      {hasInternRole && (
        <>
          <input
            type="range"
            min={0}
            max={15}
            step={0.5}
            value={internRolePercent}
            onChange={(e) => setInternRolePercent(parseFloat(e.target.value))}
            className="w-1/2"
          />
          <div className="text-xs text-gray-400">Intern-Role Bonus: {internRolePercent}% of Bonus Pool</div>
        </>
      )}

      <hr className="border-gray-700 my-4" />

      {/* Testnet XP Section */}
      <label htmlFor="xp" className="block text-sm font-medium">Testnet XP (0–100)</label>
      <input
        id="xp"
        type="range"
        min={0}
        max={100}
        step={1}
        value={xp}
        onChange={(e) => setXp(parseInt(e.target.value))}
        className="w-1/2"
      />
      <div className="text-xs text-gray-400">Testnet XP: {xp} /100</div>

      <hr className="border-gray-700 my-4" />

      {/* FDV Section */}
      <label htmlFor="fdv" className="block text-sm font-medium">Fully Diluted Valuation (FDV) in million USD</label>
      <input
        id="fdv"
        type="range"
        min={50}
        max={500}
        step={10}
        value={fdv}
        onChange={(e) => setFdv(parseInt(e.target.value))}
        className="w-1/2"
      />
      <div className="text-sm text-muted-foreground">Selected FDV: {fdv} M$</div>

      <hr className="border-gray-700 my-4" />

      {/* Results */}
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
