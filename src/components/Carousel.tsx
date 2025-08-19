import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  VStack,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import noImagePlaceholder from "../assets/no_image_placeholder.svg";

interface CarouselProps {
  images: string[];
  initialIndex?: number;
  altPrefix?: string;
  showThumbnails?: boolean;
  ariaLabel?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const Carousel = ({
  images,
  initialIndex = 0,
  altPrefix = "Image",
  showThumbnails = true,
  ariaLabel = "Image carousel",
  autoPlay = false,
  autoPlayInterval = 3000,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const announceRef = useRef<HTMLDivElement>(null);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const activeBorderColor = useColorModeValue("purple.500", "purple.300");

  // Handle empty images array
  const safeImages = images.length > 0 ? images : [noImagePlaceholder];
  const totalImages = safeImages.length;

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && totalImages > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, totalImages]);

  // Pause auto-play on user interaction
  const pauseAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages, pauseAutoPlay]);

  const goToNext = useCallback(() => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages, pauseAutoPlay]);

  const goToSlide = useCallback(
    (index: number) => {
      pauseAutoPlay();
      setCurrentIndex(index);
    },
    [pauseAutoPlay]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Touch/swipe support
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Announce slide changes to screen readers
  useEffect(() => {
    if (announceRef.current) {
      announceRef.current.textContent = `Slide ${currentIndex + 1} of ${totalImages}`;
    }
  }, [currentIndex, totalImages]);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = noImagePlaceholder;
    setIsLoading(false);
  };

  if (totalImages === 0) {
    return (
      <Box
        position="relative"
        maxW="800px"
        mx="auto"
        bg={bgColor}
        borderRadius="lg"
        overflow="hidden"
        border="1px"
        borderColor={borderColor}
      >
        <Image
          src={noImagePlaceholder}
          alt="No images available"
          w="100%"
          h="400px"
          objectFit="cover"
        />
      </Box>
    );
  }

  return (
    <VStack spacing={4} w="100%">
      {/* Main carousel container */}
      <Box
        position="relative"
        maxW="800px"
        mx="auto"
        bg={bgColor}
        borderRadius="lg"
        overflow="hidden"
        border="1px"
        borderColor={borderColor}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label={ariaLabel}
      >
        {/* Loading skeleton */}
        {isLoading && (
          <Skeleton
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={1}
            height="400px"
          />
        )}

        {/* Main image */}
        <Image
          src={safeImages[currentIndex] || noImagePlaceholder}
          alt={`${altPrefix} ${currentIndex + 1}`}
          w="100%"
          h="400px"
          objectFit="cover"
          loading={currentIndex === 0 ? "eager" : "lazy"}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Navigation buttons */}
        {totalImages > 1 && (
          <>
            <IconButton
              aria-label="Previous image"
              icon={<FiChevronLeft />}
              position="absolute"
              left={2}
              top="50%"
              transform="translateY(-50%)"
              onClick={goToPrevious}
              size="lg"
              colorScheme="blackAlpha"
              variant="solid"
              opacity={0.8}
              _hover={{ opacity: 1 }}
              _focus={{ opacity: 1, outline: "2px solid", outlineColor: "purple.500" }}
            />
            <IconButton
              aria-label="Next image"
              icon={<FiChevronRight />}
              position="absolute"
              right={2}
              top="50%"
              transform="translateY(-50%)"
              onClick={goToNext}
              size="lg"
              colorScheme="blackAlpha"
              variant="solid"
              opacity={0.8}
              _hover={{ opacity: 1 }}
              _focus={{ opacity: 1, outline: "2px solid", outlineColor: "purple.500" }}
            />
          </>
        )}

        {/* Slide indicators */}
        {totalImages > 1 && (
          <HStack
            position="absolute"
            bottom={4}
            left="50%"
            transform="translateX(-50%)"
            spacing={2}
          >
            {safeImages.map((_, index) => (
              <Button
                key={index}
                size="xs"
                w={3}
                h={3}
                minW={3}
                borderRadius="full"
                bg={index === currentIndex ? "purple.500" : "whiteAlpha.500"}
                _hover={{ bg: index === currentIndex ? "purple.600" : "whiteAlpha.700" }}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                p={0}
              />
            ))}
          </HStack>
        )}

        {/* Image counter */} 
        {totalImages > 1 && (
          <Text
            position="absolute"
            top={4}
            right={4}
            bg="blackAlpha.700"
            color="white"
            px={3}
            py={1}
            borderRadius="md"
            fontSize="sm"
            fontWeight="medium"
          >
            {currentIndex + 1} / {totalImages}
          </Text>
        )}
      </Box>

      {/* Thumbnails */}
      {showThumbnails && totalImages > 1 && (
        <HStack spacing={2} overflowX="auto" maxW="800px" px={2} style={{scrollbarWidth: "thin"}}>
          {safeImages.map((image, index) => (
            <Box
              key={index}
              flexShrink={0}
              cursor="pointer"
              onClick={() => goToSlide(index)}
              border="2px"
              borderColor={index === currentIndex ? activeBorderColor : "transparent"}
              borderRadius="md"
              overflow="hidden"
              _hover={{ borderColor: activeBorderColor }}
              _focus={{ outline: "2px solid", outlineColor: "purple.500" }}
              tabIndex={0}
              role="button"
              aria-label={`Go to slide ${index + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToSlide(index);
                }
              }}
            >
              <Image
                src={image || noImagePlaceholder}
                alt={`${altPrefix} ${index + 1} thumbnail`}
                w="80px"
                h="60px"
                objectFit="cover"
                loading="lazy"
                onError={handleImageError}
              />
            </Box>
          ))}
        </HStack>
      )}

      {/* Screen reader announcement area */}
      <Box
        ref={announceRef}
        position="absolute"
        left="-10000px"
        width="1px"
        height="1px"
        overflow="hidden"
        aria-live="polite"
        aria-atomic="true"
      />
    </VStack>
  );
};

export default Carousel;
