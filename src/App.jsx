import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Separator } from "../components/ui/separator";

export default function MitosisAirdropEstimator() {
  const [points, setPoints] = useState(0);
  const [fdv, setFdv] = useState(150);
  const [hasNft, setHasNft] = useState(false);
  const [hasDiscordRole, setHasDiscordRole] = useState(false);
  const [xp, setXp] = useState(0);

  const totalPoints = 194_000_000_000; // Estimated expedition points total
  const morseNftSupply = 2924; // Only Morse NFT supply
  const partnerNftTotal = 38888; // Corrected: Pudgy + Milady + Azuki + Bad Kids + Celestine Sloth Society + Mad Scientist
  const estimatedHolders = 125000;

  const estimateExpeditionAllocation = (fdvValue, percent) => {
    const totalUSD = (fdvValue * 1_000_000) * percent;
    const expeditionShare = 0.60; // Assume 60% goes to Expedition campaign
    const expeditionUSD = totalUSD * expeditionShare;
    return (points / totalPoints) * expeditionUSD;
  };

  const estimateBonusAllocation = (fdvValue, percent) => {
    const totalUSD = (fdvValue * 1_000_000) * percent;
    const bonusPool = totalUSD * 0.40;
    let bonus = 0;
    if (hasNft) bonus += bonusPool * (1 / (partnerNftTotal + morseNftSupply)); // NFT eligibility adjusted separately
    if (hasDiscordRole) bonus += bonusPool * 0.15; // Assume strong community reward
    bonus += 0.10 * bonusPool * (xp / 100); // Proportional XP reward
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
      <Separator />
      <div className="space-y-4">
        <Label htmlFor="points">Your MITO Points</Label>
        <Input
          id="points"
          className="w-1/2"
          type="number"
          value={points}
          onChange={(e) => setPoints(parseFloat(e.target.value))}
          placeholder="e.g. 8191427"
        />
        <div className="text-xs text-gray-400">Used to calculate your share in the Expedition 60% pool</div>

        <Label htmlFor="xp">Testnet XP (0–100)</Label>
        <Slider
          id="xp"
          min={0}
          max={100}
          step={1}
          value={[xp]}
          onValueChange={(val) => setXp(val[0])}
        />
        <div className="text-sm">XP: {xp}</div>
        <div className="text-xs text-gray-400">Adds a % share from a 10% Testnet XP Bonus Pool</div>

        <div className="space-y-2">
          <Label>
            <input
              type="checkbox"
              checked={hasNft}
              onChange={(e) => setHasNft(e.target.checked)}
              className="mr-2"
            />
            Owns eligible NFT (Morse or partner collections)
          </Label>
          <div className="text-xs text-gray-400">Pro-rata distribution based on ~41,000 NFTs (Pudgy, Milady, Azuki, Bad Kids, Celestine, Mad Scientist) + Morse NFTs separately</div>

          <Label>
            <input
              type="checkbox"
              checked={hasDiscordRole}
              onChange={(e) => setHasDiscordRole(e.target.checked)}
              className="mr-2"
            />
            Verified Discord community role
          </Label>
          <div className="text-xs text-gray-400">Assumed to receive 15% of Bonus Pool shared equally</div>
        </div>

        <Label htmlFor="fdv">Fully Diluted Valuation (FDV) in million USD</Label>
        <Slider
          id="fdv"
          min={50}
          max={500}
          step={10}
          value={[fdv]}
          onValueChange={(val) => setFdv(val[0])}
        />
        <div className="text-sm text-muted-foreground">Selected FDV: {fdv} M$</div>
      </div>
      <Separator />
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="text-lg font-semibold">Estimated Allocation:</div>
          <div className="text-sm">🔹 10% Airdrop scenario: <span className="font-bold">${allocation10.toFixed(2)} USD</span></div>
          <div className="text-sm">🔸 20% Airdrop scenario: <span className="font-bold">${allocation20.toFixed(2)} USD</span></div>
        </CardContent>
      </Card>
      <footer className="pt-4 text-center text-xs text-gray-500">
        Built by <a className="text-blue-400 hover:underline" href="https://x.com/PetrAnto12" target="_blank">@PetrAnto12</a>
      </footer>
    </div>
  );
}
