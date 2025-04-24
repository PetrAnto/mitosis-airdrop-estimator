import { useState } from "react";

export default function MitosisAirdropEstimator() { const [points, setPoints] = useState(0); const [fdv, setFdv] = useState(150); const [testnetMito, setTestnetMito] = useState(0); const [expeditionPct, setExpeditionPct] = useState(6); const [testnetPct, setTestnetPct] = useState(4); const [morsePct, setMorsePct] = useState(2); const [partnerPct, setPartnerPct] = useState(3); const [discordMiPct, setDiscordMiPct] = useState(1); const [discordInternPct, setDiscordInternPct] = useState(1); const [kaitoPct, setKaitoPct] = useState(1); const [hasMorse, setHasMorse] = useState(false); const [hasPartner, setHasPartner] = useState(false); const [hasMiRole, setHasMiRole] = useState(false); const [hasInternRole, setHasInternRole] = useState(false); const [hasKaito, setHasKaito] = useState(false);

const totalPoints = 194_000_000_000; const morseSupply = 555; const partnerTotalSupply = 8000; const miRoleCount = 100; const internRoleCount = 200;

const estimateExpedition = (fdvVal, pct) => { const expeditionUsd = (fdvVal * 1_000_000) * (pct / 100); return (points / totalPoints) * expeditionUsd; };

const estimateAdditional = (fdvVal) => { const usd = fdvVal * 1_000_000; let total = 0; if (hasMorse) total += usd * (morsePct / 100) / morseSupply; if (hasPartner) total += usd * (partnerPct / 100) / partnerTotalSupply; if (hasMiRole) total += usd * (discordMiPct / 100) / miRoleCount; if (hasInternRole) total += usd * (discordInternPct / 100) / internRoleCount; if (hasKaito) total += usd * (kaitoPct / 100); return total; };

const estimateGameOfMito = (fdvVal, pct) => { const totalUsd = fdvVal * 1_000_000 * (pct / 100); const rewardShare = testnetMito / 1_000_000; return rewardShare * totalUsd; };

const expeditionAllocation = estimateExpedition(fdv, expeditionPct); const testnetAllocation = estimateGameOfMito(fdv, testnetPct); const additionalAllocation = estimateAdditional(fdv);

const totalBasePct = expeditionPct + testnetPct; const totalPct = totalBasePct + morsePct + partnerPct + discordMiPct + discordInternPct + kaitoPct;

return ( <div className="bg-black text-white min-h-screen py-10 px-4 sm:px-8 flex justify-center"> <div className="space-y-6 w-full max-w-xl"> <h1 className="text-2xl font-bold text-center">Mitosis Airdrop Estimator</h1>

<div className="space-y-2">
      <label>Your MITO Points (Expedition Campaign)</label>
      <input type="number" className="w-full max-w-sm text-black px-2 py-1 rounded" value={points} onChange={e => setPoints(Number(e.target.value))} />
    </div>

    <div className="space-y-2">
      <label>FDV ($M)</label>
      <input type="range" min="50" max="500" step="10" value={fdv} onChange={e => setFdv(Number(e.target.value))} className="w-full" />
      <div>FDV: {fdv}M</div>
    </div>

    <div className="space-y-2">
      <label>How much % of FDV is allocated to Expedition rewards?</label>
      <input type="range" min="0" max="20" step="1" value={expeditionPct} onChange={e => setExpeditionPct(Number(e.target.value))} className="w-full" />
      <div>{expeditionPct}% of FDV</div>
    </div>

    <div className="space-y-2">
      <label>How much % of FDV is allocated to Game of Mito Testnet rewards?</label>
      <input type="range" min="0" max="20" step="1" value={testnetPct} onChange={e => setTestnetPct(Number(e.target.value))} className="w-full" />
      <div>{testnetPct}% of FDV</div>
    </div>

    <hr className="my-4 border-gray-600" />

    <h2 className="text-xl font-semibold">Additional Rewards (% of FDV)</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label><input type="checkbox" checked={hasMorse} onChange={e => setHasMorse(e.target.checked)} /> Morse NFT (%)</label>
        <input type="number" className="w-full max-w-sm text-black px-2 py-1 rounded" value={morsePct} onChange={e => setMorsePct(Number(e.target.value))} />
      </div>
      <div className="space-y-2">
        <label><input type="checkbox" checked={hasPartner} onChange={e => setHasPartner(e.target.checked)} /> Partner NFTs (%)</label>
        <input type="number" className="w-full max-w-sm text-black px-2 py-1 rounded" value={partnerPct} onChange={e => setPartnerPct(Number(e.target.value))} />
      </div>
      <div className="space-y-2">
        <label><input type="checkbox" checked={hasMiRole} onChange={e => setHasMiRole(e.target.checked)} /> Discord Mi-Role (%)</label>
        <input type="number" className="w-full max-w-sm text-black px-2 py-1 rounded" value={discordMiPct} onChange={e => setDiscordMiPct(Number(e.target.value))} />
      </div>
      <div className="space-y-2">
        <label><input type="checkbox" checked={hasInternRole} onChange={e => setHasInternRole(e.target.checked)} /> Discord Intern-Role (%)</label>
        <input type="number" className="w-full max-w-sm text-black px-2 py-1 rounded" value={discordInternPct} onChange={e => setDiscordInternPct(Number(e.target.value))} />
      </div>
      <div className="space-y-2">
        <label><input type="checkbox" checked={hasKaito} onChange={e => setHasKaito(e.target.checked)} /> Kaito Leaderboard (%)</label>
        <input type="number" className="w-full max-w-sm text-black px-2 py-1 rounded" value={kaitoPct} onChange={e => setKaitoPct(Number(e.target.value))} />
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
      <input type="number" className="w-full max-w-sm text-black px-2 py-1 rounded" value={testnetMito} onChange={e => setTestnetMito(Number(e.target.value))} />
    </div>

    <hr className="my-4 border-gray-600" />

    <div className="bg-gray-800 p-4 rounded space-y-4">
      <h2 className="text-lg font-bold mb-2">Estimated Allocation Summary</h2>
      <p>Total base airdrop: {totalBasePct}% of FDV ({expeditionPct}% expedition, {testnetPct}% testnet)</p>
      <p>Additional rewards total: {morsePct + partnerPct + discordMiPct + discordInternPct + kaitoPct}% of FDV</p>
      <p><strong>Total simulated FDV allocation: {totalPct}%</strong></p>

      <div>
        <h3 className="font-semibold text-md mb-1">Base Airdrop Breakdown</h3>
        <p>Expedition: <strong>${expeditionAllocation.toFixed(2)} USD</strong></p>
        <p>Testnet: <strong>${testnetAllocation.toFixed(2)} USD</strong></p>
        <p>Total Base: <strong>${(expeditionAllocation + testnetAllocation).toFixed(2)} USD</strong></p>
      </div>

      <div>
        <h3 className="font-semibold text-md mt-4 mb-1">Additional Rewards</h3>
        <p>Total: <strong>${additionalAllocation.toFixed(2)} USD</strong></p>
      </div>

      <div>
        <h3 className="font-semibold text-md mt-4 mb-1">Estimated Final Airdrop</h3>
        <p><strong>${(expeditionAllocation + testnetAllocation + additionalAllocation).toFixed(2)} USD</strong></p>
      </div>
    </div>
  </div>
</div>

); }

