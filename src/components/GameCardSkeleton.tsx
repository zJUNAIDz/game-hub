import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react"

const GameCardSkeleton = () => {
  return (
    <Card  width='240px' overflow="hidden">
      <Skeleton height='5rem'/>
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  )
}

export default GameCardSkeleton;