import { useState } from "react";

export default function MitosisAirdropEstimator() {
  const [points, setPoints] = useState(0);
  const [fdv, setFdv] = useState(150);
  const [xp, setXp] = useState(0);
  const [morsePct, setMorsePct] = useState(0);
  const [partnerPct, setPartnerPct] = useState(0);
  const [discordPct, setDiscordPct] = useState(0);
  const [kaitoPct, setKaitoPct] = useState(0);
  const [hasMorse, setHasMorse] = useState(false);
  const [hasPartner, setHasPartner] = useState(false);
  const [hasDiscord, setHasDiscord] = useState(false);
  const [hasKaito, setHasKaito] = useState(false);

  const totalPoints = 194_000_000_000;

  const estimateExpedition = (fdvVal, percent) => {
    const expeditionUsd = (fdvVal * 1_000_000) * percent;
    return (points / totalPoints) * expeditionUsd;
  };

  const estimateAdditional = (fdvVal) => {
    const usd = fdvVal * 1_000_000;
    let total = 0;
    if (hasMorse) total += (usd * morsePct / 100);
    if (hasPartner) total += (usd * partnerPct / 100);
    if (hasDiscord) total += (usd * discordPct / 100);
    if (hasKaito) total += (usd * kaitoPct / 100);
    return total;
  };

  const allocation10 = estimateExpedition(fdv, 0.10) + estimateAdditional(fdv * 0.10);
  const allocation20 = estimateExpedition(fdv, 0.20) + estimateAdditional(fdv * 0.20);

  return (
    <div style={{ background: '#111', color: '#fff', padding: '2rem', minHeight: '100vh' }}>
      <h1>Mitosis Airdrop Estimator</h1>
      <p>Set your inputs below to estimate your airdrop:</p>

      <label>MITO Points</label>
      <input type="number" value={points} onChange={e => setPoints(Number(e.target.value))} />

      <label>Testnet XP (0–100)</label>
      <input type="range" min="0" max="100" value={xp} onChange={e => setXp(Number(e.target.value))} />
      <p>XP: {xp}</p>

      <label>FDV ($M)</label>
      <input type="range" min="50" max="500" step="10" value={fdv} onChange={e => setFdv(Number(e.target.value))} />
      <p>FDV: {fdv}M</p>

      <hr />

      <h2>Additional Rewards (% of FDV)</h2>
      <div>
        <label><input type="checkbox" checked={hasMorse} onChange={e => setHasMorse(e.target.checked)} /> Morse NFT</label>
        <input type="number" value={morsePct} onChange={e => setMorsePct(Number(e.target.value))} placeholder="%" />

        <label><input type="checkbox" checked={hasPartner} onChange={e => setHasPartner(e.target.checked)} /> Partner NFT</label>
        <input type="number" value={partnerPct} onChange={e => setPartnerPct(Number(e.target.value))} placeholder="%" />

        <label><input type="checkbox" checked={hasDiscord} onChange={e => setHasDiscord(e.target.checked)} /> Discord Role</label>
        <input type="number" value={discordPct} onChange={e => setDiscordPct(Number(e.target.value))} placeholder="%" />

        <label><input type="checkbox" checked={hasKaito} onChange={e => setHasKaito(e.target.checked)} /> Kaito Leaderboard</label>
        <input type="number" value={kaitoPct} onChange={e => setKaitoPct(Number(e.target.value))} placeholder="%" />
      </div>

      <hr />

      <h2>Estimated Airdrop:</h2>
      <p>10% Scenario: <strong>${allocation10.toFixed(2)}</strong></p>
      <p>20% Scenario: <strong>${allocation20.toFixed(2)}</strong></p>
    </div>
  );
}