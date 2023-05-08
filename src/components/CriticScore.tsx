import { Badge } from "@chakra-ui/react";
interface Props {
  score: number;
}
const CriticScore = ({ score }: Props) => {
  const color = score >= 75 ? "green" : score >= 50 ? "yellow" : "red";
  return (
    // <Badge ml='1' variant='outline' colorScheme={color}>{score}</Badge>
    // <div className={"text-3xl bg-"+color+"-600 "}>{score}</div>

    <Badge variant="outline" fontSize="md" colorScheme={color}>
      {score}
    </Badge>
  );
};

export default CriticScore;
