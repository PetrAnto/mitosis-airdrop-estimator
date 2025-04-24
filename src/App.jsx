import { useState } from "react";

export default function MitosisAirdropEstimator() { const [points, setPoints] = useState(0); const [fdv, setFdv] = useState(150); const [testnetMito, setTestnetMito] = useState(0); const [morsePct, setMorsePct] = useState(2); const [partnerPct, setPartnerPct] = useState(3); const [discordMiPct, setDiscordMiPct] = useState(1); const [discordInternPct, setDiscordInternPct] = useState(1); const [kaitoPct, setKaitoPct] = useState(1); const [hasMorse, setHasMorse] = useState(false); const [hasPartner, setHasPartner] = useState(false); const [hasMiRole, setHasMiRole] = useState(false); const [hasInternRole, setHasInternRole] = useState(false); const [hasKaito, setHasKaito] = useState(false);

const totalPoints = 194_000_000_000; const morseSupply = 555; const partnerTotalSupply = 8000; const miRoleCount = 100; const internRoleCount = 200;

const estimateExpedition = (fdvVal, percent) => { const expeditionUsd = (fdvVal * 1_000_000) * percent * 0.6; return (points / totalPoints) * expeditionUsd; };

const estimateAdditional = (fdvVal, percent) => { const usd = fdvVal * 1_000_000 * percent; let total = 0; if (hasMorse) total += usd * (morsePct / 100) / morseSupply; if (hasPartner) total += usd * (partnerPct / 100) / partnerTotalSupply; if (hasMiRole) total += usd * (discordMiPct / 100) / miRoleCount; if (hasInternRole) total += usd * (discordInternPct / 100) / internRoleCount; if (hasKaito) total += usd * (kaitoPct / 100); return total; };

const estimateGameOfMito = (fdvVal, percent) => { const totalUsd = fdvVal * 1_000_000 * percent; const rewardShare = testnetMito / 1_000_000; return rewardShare * totalUsd; };

const allocation10 = estimateExpedition(fdv, 0.10) + estimateAdditional(fdv, 0.10); const allocation20 = estimateExpedition(fdv, 0.20) + estimateAdditional(fdv, 0.20); const testnetAllocation10 = estimateGameOfMito(fdv, 0.10); const testnetAllocation20 = estimateGameOfMito(fdv, 0.20);

return ( <div className="bg-black text-white min-h-screen p-6 space-y-6 max-w-3xl mx-auto"> <h1 className="text-2xl font-bold">Mitosis Airdrop Estimator</h1>

<div className="space-y-2">
    <label>Your MITO Points (Expedition Campaign)</label>
    <input type="number" className="w-full text-black" value={points} onChange={e => setPoints(Number(e.target.value))} />
  </div>

  <div className="space-y-2">
    <label>FDV ($M)</label>
    <input type="range" min="50" max="500" step="10" value={fdv} onChange={e => setFdv(Number(e.target.value))} className="w-full" />
    <div>FDV: {fdv}M</div>
  </div>

  <hr className="my-4 border-gray-600" />

  <h2 className="text-xl font-semibold">Additional Rewards (% of FDV)</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="space-y-2">
      <label><input type="checkbox" checked={hasMorse} onChange={e => setHasMorse(e.target.checked)} /> Morse NFT (%)</label>
      <input type="number" className="w-full text-black" value={morsePct} onChange={e => setMorsePct(Number(e.target.value))} />
    </div>
    <div className="space-y-2">
      <label><input type="checkbox" checked={hasPartner} onChange={e => setHasPartner(e.target.checked)} /> Partner NFTs (%)</label>
      <input type="number" className="w-full text-black" value={partnerPct} onChange={e => setPartnerPct(Number(e.target.value))} />
    </div>
    <div className="space-y-2">
      <label><input type="checkbox" checked={hasMiRole} onChange={e => setHasMiRole(e.target.checked)} /> Discord Mi-Role (%)</label>
      <input type="number" className="w-full text-black" value={discordMiPct} onChange={e => setDiscordMiPct(Number(e.target.value))} />
    </div>
    <div className="space-y-2">
      <label><input type="checkbox" checked={hasInternRole} onChange={e => setHasInternRole(e.target.checked)} /> Discord Intern-Role (%)</label>
      <input type="number" className="w-full text-black" value={discordInternPct} onChange={e => setDiscordInternPct(Number(e.target.value))} />
    </div>
    <div className="space-y-2">
      <label><input type="checkbox" checked={hasKaito} onChange={e => setHasKaito(e.target.checked)} /> Kaito Leaderboard (%)</label>
      <input type="number" className="w-full text-black" value={kaitoPct} onChange={e => setKaitoPct(Number(e.target.value))} />
    </div>
  </div>

  <hr className="my-4 border-gray-600" />

  <h2 className="text-xl font-semibold">Game of Mito Testnet</h2>
  <div className="space-y-2">
    <label>How many Testnet $MITO did you earn?<br />
      <span className="text-sm text-blue-300">
        Use <a href="https://murinxda.budibase.app/app/mitosis-tools#/testnet-rank" target="_blank" rel="noopener noreferrer" className="underline">this testnet rank calculator</a> to find out.
      </span>
    </label>
    <input type="number" className="w-full text-black" value={testnetMito} onChange={e => setTestnetMito(Number(e.target.value))} />
  </div>

  <hr className="my-4 border-gray-600" />

  <div className="bg-gray-800 p-4 rounded">
    <h2 className="text-lg font-bold mb-2">Estimated Allocation:</h2>
    <div>🔹 10% Airdrop scenario: <strong>${allocation10.toFixed(2)} USD</strong></div>
    <div>🔸 20% Airdrop scenario: <strong>${allocation20.toFixed(2)} USD</strong></div>
    <div>🎯 Game of Mito Testnet (10% scenario): <strong>${testnetAllocation10.toFixed(2)} USD</strong></div>
    <div>🎯 Game of Mito Testnet (20% scenario): <strong>${testnetAllocation20.toFixed(2)} USD</strong></div>
  </div>
</div>

); }

