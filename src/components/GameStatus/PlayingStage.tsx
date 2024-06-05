import { GameChoice } from "@/types/definitions";

export const PlayingStage: React.FC<{
  selectedChoices: string;
  computerChoice: GameChoice | null;
}> = ({ selectedChoices, computerChoice }) => (
  <h3 className="text-3xl">
    {selectedChoices} vs {computerChoice}
  </h3>
);
