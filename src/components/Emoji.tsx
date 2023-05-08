import {Text} from '@chakra-ui/react'
interface Props {
  rating: number;
}
const Emoji = ({ rating }: Props) => {
  const EmojiMap: { [key: number]: string } = {
    1: "🤡",
    2: "📛",
    3: "😑",
    4: "🔥",
    5: "🎯",
  };
  return <Text fontSize='2xl'>{EmojiMap[rating]}</Text>;
};

export default Emoji;
