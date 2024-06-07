import type { GameChoice } from "@/types/definitions";

export const PlayingStage: React.FC<{
  playerBestChoice: GameChoice | null;
  computerChoice: GameChoice | null;
}> = ({ playerBestChoice, computerChoice }) => (
  <h3 className="text-lg uppercase text-white md:text-5xl">
    <span>{computerChoice}</span>
    <span className="px-2 text-xs font-semibold text-gold-500 md:px-8 md:text-3xl">vs</span>
    <span>{playerBestChoice}</span>
  </h3>
);
