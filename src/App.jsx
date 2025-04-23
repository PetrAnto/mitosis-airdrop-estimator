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
    if (hasNft) bonus += 0.15 * bonusPool;
    if (hasDiscordRole) bonus += 0.15 * bonusPool;
    bonus += 0.10 * bonusPool * (xp / 100);
    return bonus;
  };

  const allocation10 = estimateExpeditionAllocation(fdv, 0.10) + estimateBonusAllocation(fdv, 0.10);
  const allocation20 = estimateExpeditionAllocation(fdv, 0.20) + estimateBonusAllocation(fdv, 0.20);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">💧 Mitosis Airdrop Estimator</h1>
      <p className="text-sm text-gray-600">
        Estimate your airdrop allocation in USD, based on your MITO Points, NFT ownership, testnet XP and Discord role.
      </p>
      <Separator />
      <div className="space-y-4">
        <Label htmlFor="points">Your MITO Points</Label>
        <Input
          id="points"
          type="number"
          value={points}
          onChange={(e) => setPoints(parseFloat(e.target.value))}
          placeholder="e.g. 8191427"
        />
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

        <div className="space-y-2">
          <Label>
            <input
              type="checkbox"
              checked={hasNft}
              onChange={(e) => setHasNft(e.target.checked)}
              className="mr-2"
            />
            Owns eligible NFT (e.g. Morse or partner collections)
          </Label>
          <Label>
            <input
              type="checkbox"
              checked={hasDiscordRole}
              onChange={(e) => setHasDiscordRole(e.target.checked)}
              className="mr-2"
            />
            Verified Discord community role
          </Label>
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
          <div className="text-sm">
            🔹 10% Airdrop scenario: <span className="font-bold">${allocation10.toFixed(2)} USD</span>
          </div>
          <div className="text-sm">
            🔸 20% Airdrop scenario: <span className="font-bold">${allocation20.toFixed(2)} USD</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
