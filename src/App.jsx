import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function MitosisAirdropEstimator() {
  const [points, setPoints] = useState(0);
  const [fdv, setFdv] = useState(150);

  const [expeditionPct, setExpeditionPct] = useState(15);
  const [testnetPct, setTestnetPct] = useState(10);

  const [hasMorse, setHasMorse] = useState(false);
  const [morsePct, setMorsePct] = useState(1);

  const [hasPartner, setHasPartner] = useState(false);
  const [partnerPct, setPartnerPct] = useState(0.5);

  const [hasMiRole, setHasMiRole] = useState(false);
  const [miRolePct, setMiRolePct] = useState(0.1);

  const [hasInternRole, setHasInternRole] = useState(false);
  const [internRolePct, setInternRolePct] = useState(0.1);

  const [testnetMito, setTestnetMito] = useState(0);

  const totalPoints = 194_000_000_000;

  const morseSupply = 2924;
  const partnerSupply = 38888;
  const miRoleSupply = 100;
  const internRoleSupply = 200;

  const expeditionAllocation = (points / totalPoints) * (fdv * 1_000_000 * (expeditionPct / 100));
  const testnetAllocation = (testnetMito / 1_000_000) * (fdv * 1_000_000 * (testnetPct / 100));

  const additionalAllocation = (fdv * 1_000_000) * (
    (hasMorse ? (morsePct / 100) / morseSupply : 0) +
    (hasPartner ? (partnerPct / 100) / partnerSupply : 0) +
    (hasMiRole ? (miRolePct / 100) / miRoleSupply : 0) +
    (hasInternRole ? (internRolePct / 100) / internRoleSupply : 0)
  );

  const totalBasePct = expeditionPct + testnetPct;
  const totalAdditionalPct = (
    (hasMorse ? morsePct : 0) +
    (hasPartner ? partnerPct : 0) +
    (hasMiRole ? miRolePct : 0) +
    (hasInternRole ? internRolePct : 0)
  ).toFixed(2);
  const totalPct = (parseFloat(totalBasePct) + parseFloat(totalAdditionalPct)).toFixed(2);

  const data = {
    labels: ['Expedition', 'Testnet', 'Additional Rewards'],
    datasets: [
      {
        data: [
          expeditionAllocation,
          testnetAllocation,
          additionalAllocation
        ],
        backgroundColor: [
          '#7C3AED',
          '#6366F1',
          '#A5B4FC'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#E9EAFF] text-gray-900 flex flex-col items-center px-6 py-8 space-y-6">
      <img src="/petrantocalculator.png" alt="PetrAnto Logo" className="w-60 mb-4" />
      <h1 className="text-2xl font-bold text-center">💧 PetrAnto Mitosis Airdrop Calculator</h1>
      <p className="text-sm text-gray-700 text-center">
        Estimate your airdrop allocation based on MITO Points, NFTs, Discord Roles and Testnet rewards.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl space-y-6">
        
        {/* Expedition Section */}
        <h2 className="text-xl font-semibold">Expedition Allocation</h2>
        <div className="space-y-2">
          <label>Your MITO Points from Expedition</label>
          <input
            type="number"
            className="w-full rounded px-3 py-2 border border-gray-300"
            value={points}
            onChange={e => setPoints(Number(e.target.value))}
          />
          <label>Expedition % of FDV</label>
          <input
            type="range"
            min="0"
            max="30"
            value={expeditionPct}
            onChange={e => setExpeditionPct(Number(e.target.value))}
            className="w-full"
          />
          <div>{expeditionPct}%</div>
        </div>

        {/* Testnet Section */}
        <h2 className="text-xl font-semibold">Game of Mito Testnet</h2>
        <div className="space-y-2">
          <label>Your Testnet $MITO Earned</label>
          <input
            type="number"
            className="w-full rounded px-3 py-2 border border-gray-300"
            value={testnetMito}
            onChange={e => setTestnetMito(Number(e.target.value))}
          />
          <label>Testnet % of FDV</label>
          <input
            type="range"
            min="0"
            max="20"
            value={testnetPct}
            onChange={e => setTestnetPct(Number(e.target.value))}
            className="w-full"
          />
          <div>{testnetPct}%</div>
        </div>

        {/* Additional Rewards Section */}
        <h2 className="text-xl font-semibold">Additional Rewards</h2>
        <div className="space-y-4">
          {/* Morse NFT */}
          <div>
            <label><input type="checkbox" checked={hasMorse} onChange={e => setHasMorse(e.target.checked)} /> Morse NFT (1% of FDV / 2924 supply)</label>
          </div>
          {/* Partner NFTs */}
          <div>
            <label><input type="checkbox" checked={hasPartner} onChange={e => setHasPartner(e.target.checked)} /> Partner NFTs (0.5% of FDV / 38888 supply)</label>
          </div>
          {/* Discord MiRole */}
          <div>
            <label><input type="checkbox" checked={hasMiRole} onChange={e => setHasMiRole(e.target.checked)} /> Discord Mi-Role (0.1% of FDV / 100 supply)</label>
          </div>
          {/* Discord InternRole */}
          <div>
            <label><input type="checkbox" checked={hasInternRole} onChange={e => setHasInternRole(e.target.checked)} /> Discord Intern-Role (0.1% of FDV / 200 supply)</label>
          </div>
        </div>

        {/* FDV Settings */}
        <h2 className="text-xl font-semibold">Market Settings</h2>
        <div className="space-y-2">
          <label>Fully Diluted Valuation (FDV) in million USD</label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={fdv}
            onChange={e => setFdv(Number(e.target.value))}
            className="w-full"
          />
          <div>{fdv}M USD</div>
        </div>

        {/* Summary */}
        <h2 className="text-xl font-semibold">Estimated Airdrop Summary</h2>
        <div className="space-y-2">
          <p>Total Base Airdrop: {totalBasePct}% of FDV ({expeditionPct}% Expedition + {testnetPct}% Testnet)</p>
          <p>Additional Rewards: {totalAdditionalPct}% of FDV</p>
          <p><strong>Total Simulated Allocation: {totalPct}% of FDV</strong></p>

          <p>Expedition: <strong>${expeditionAllocation.toFixed(2)} USD</strong></p>
          <p>Testnet: <strong>${testnetAllocation.toFixed(2)} USD</strong></p>
          <p>Additional: <strong>${additionalAllocation.toFixed(2)} USD</strong></p>

          <p className="mt-2 font-bold">TOTAL Airdrop: <strong>${(expeditionAllocation + testnetAllocation + additionalAllocation).toFixed(2)} USD</strong></p>
        </div>

        <div className="pt-6">
          <Pie data={data} />
        </div>
      </div>

      <footer className="text-xs text-gray-600 pt-6">
        Built by <a href="https://x.com/PetrAnto12" target="_blank" className="text-blue-600 underline">@PetrAnto12</a>
      </footer>
    </div>
  );
}
