import { GameChoice } from "@/types/definitions";

export const PlayingStage: React.FC<{
  playerBestChoice: GameChoice | null;
  computerChoice: GameChoice | null;
}> = ({ playerBestChoice, computerChoice }) => (
  <h3 className="text-5xl uppercase text-white">
    <span className="px-8 text-lg">Computer Choice</span>
    {computerChoice}
    <span className="px-8 text-xl text-gold-500">vs</span>
    {playerBestChoice}
    <span className="px-8 text-lg">Player Choice</span>
  </h3>
);
