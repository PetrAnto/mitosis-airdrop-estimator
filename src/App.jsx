import { useState } from "react";

export default function MitosisAirdropEstimator() {
  const [points, setPoints] = useState(0);
  const [fdv, setFdv] = useState(150);

  const [hasMorse, setHasMorse] = useState(false);
  const [morsePct, setMorsePct] = useState(1);

  const [hasPartner, setHasPartner] = useState(false);
  const [partnerPct, setPartnerPct] = useState(0.5);

  const [hasMiRole, setHasMiRole] = useState(false);
  const [miRolePct, setMiRolePct] = useState(1);

  const [hasInternRole, setHasInternRole] = useState(false);
  const [internRolePct, setInternRolePct] = useState(1);

  const [testnetMito, setTestnetMito] = useState(0);
  const expeditionPct = 60;
  const testnetPct = 10; // Game of Mito is assumed fixed 10% (adjust if needed)

  const totalPoints = 194_000_000_000;

  const expeditionAllocation = (points / totalPoints) * (fdv * 1_000_000 * (expeditionPct / 100));
  const testnetAllocation = (testnetMito / 1_000_000) * (fdv * 1_000_000 * (testnetPct / 100)); // Assume 1M testnet MITO pool

  const additionalPct = 
    (hasMorse ? morsePct : 0) +
    (hasPartner ? partnerPct : 0) +
    (hasMiRole ? miRolePct : 0) +
    (hasInternRole ? internRolePct : 0);

  const additionalAllocation = (fdv * 1_000_000) * (additionalPct / 100);

  const totalBasePct = expeditionPct + testnetPct;
  const totalPct = totalBasePct + additionalPct;

  return (
    <div className="min-h-screen bg-black text-white max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">💧 PetrAnto Mitosis Airdrop Calculator</h1>
      <p className="text-sm text-gray-400 text-center">
        Estimate your airdrop allocation based on MITO Points, NFTs, Discord Roles and Testnet XP.
      </p>

      <hr className="my-4 border-gray-600" />

      <div className="space-y-4">
        <label className="block">Your MITO Points (Expedition Campaign)</label>
        <input
          type="number"
          className="w-1/2 p-2 text-black rounded"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          placeholder="e.g. 8191427"
        />
      </div>

      <hr className="my-4 border-gray-600" />

      <h2 className="text-xl font-semibold">Additional Rewards (% of FDV)</h2>

      <div className="space-y-2">
        <label>
          <input type="checkbox" checked={hasMorse} onChange={e => setHasMorse(e.target.checked)} />
          {" "}Own Morse NFT (% of FDV)
        </label>
        <input
          type="number"
          className="w-1/2 p-2 text-black rounded"
          value={morsePct}
          onChange={(e) => setMorsePct(Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <label>
          <input type="checkbox" checked={hasPartner} onChange={e => setHasPartner(e.target.checked)} />
          {" "}Own Partner Collection NFT (% of FDV)
        </label>
        <input
          type="number"
          className="w-1/2 p-2 text-black rounded"
          value={partnerPct}
          onChange={(e) => setPartnerPct(Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <label>
          <input type="checkbox" checked={hasMiRole} onChange={e => setHasMiRole(e.target.checked)} />
          {" "}Discord Mi-Role (% of FDV)
        </label>
        <input
          type="number"
          className="w-1/2 p-2 text-black rounded"
          value={miRolePct}
          onChange={(e) => setMiRolePct(Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <label>
          <input type="checkbox" checked={hasInternRole} onChange={e => setHasInternRole(e.target.checked)} />
          {" "}Discord Intern-Role (% of FDV)
        </label>
        <input
          type="number"
          className="w-1/2 p-2 text-black rounded"
          value={internRolePct}
          onChange={(e) => setInternRolePct(Number(e.target.value))}
        />
      </div>

      <hr className="my-4 border-gray-600" />

      <h2 className="text-xl font-semibold">Game of Mito Testnet</h2>
      <div className="space-y-2">
        <label>
          How many Testnet $MITO did you earn?<br />
          <span className="text-blue-300 text-sm">
            Use the {" "}
            <a href="https://murinxda.budibase.app/app/mitosis-tools#/testnet-rank" target="_blank" rel="noopener noreferrer" className="underline">
              Game of Mito Points Calculator
            </a>{" "}
            to find out.
          </span>
        </label>
        <input
          type="number"
          className="w-1/2 p-2 text-black rounded"
          value={testnetMito}
          onChange={(e) => setTestnetMito(Number(e.target.value))}
        />
      </div>

      <hr className="my-4 border-gray-600" />

      <div className="space-y-2">
        <label className="block">Fully Diluted Valuation (FDV) (in Million USD)</label>
        <input
          type="range"
          min="50"
          max="500"
          step="10"
          className="w-full"
          value={fdv}
          onChange={(e) => setFdv(Number(e.target.value))}
        />
        <div>Selected FDV: {fdv}M$</div>
      </div>

      <hr className="my-4 border-gray-600" />

      <div className="bg-gray-800 p-4 rounded space-y-4">
        <h2 className="text-lg font-bold mb-2">Estimated Allocation Summary</h2>
        <p>Total Base Airdrop: {totalBasePct}% of FDV ({expeditionPct}% Expedition, {testnetPct}% Testnet)</p>
        <p>Additional Rewards Total: {additionalPct}% of FDV</p>
        <p><strong>Total Simulated FDV Allocation: {totalPct}%</strong></p>

        <div className="pt-2">
          <h3 className="font-semibold text-md mb-1">Base Airdrop Breakdown</h3>
          <p>Expedition Allocation: <strong>${expeditionAllocation.toFixed(2)} USD</strong></p>
          <p>Testnet Allocation: <strong>${testnetAllocation.toFixed(2)} USD</strong></p>
          <p>Total Base Allocation: <strong>${(expeditionAllocation + testnetAllocation).toFixed(2)} USD</strong></p>
        </div>

        <div className="pt-4">
          <h3 className="font-semibold text-md mb-1">Additional Rewards</h3>
          <p>Total Additional Allocation: <strong>${additionalAllocation.toFixed(2)} USD</strong></p>
        </div>
      </div>

      <footer className="pt-4 text-center text-xs text-gray-500">
        Built by <a href="https://x.com/PetrAnto12" className="text-blue-400 hover:underline" target="_blank">@PetrAnto12</a>
      </footer>
    </div>
  );
}
