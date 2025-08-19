import { Badge, Text } from "@chakra-ui/react";

interface Props {
  score?: number;
}

const CriticScore = ({ score }: Props) => {
  if (!score) {
    return <Text color="gray.500">Not rated</Text>;
  }

  const color = score >= 75 ? "green" : score >= 50 ? "yellow" : "red";
  
  return (
    <Badge variant="outline" fontSize="md" colorScheme={color}>
      {score}
    </Badge>
  );
};

export default CriticScore;
