import React, { useEffect, useState } from "react";

const useSlider = (open?: boolean) => {
  const [widthSlide, setWidthSlide] = useState(650);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [slideLength, setSlideLength] = useState<number>(0);

  useEffect(() => {
    if (!open) setSlideIndex(0);
  }, [open]);

  const handlePreviousForm = () => {
    setSlideIndex((imageIndex) => {
      if (!slideLength) return imageIndex;
      const lastIndex = slideLength - 1;
      if (imageIndex === 0) {
        return lastIndex;
      } else {
        return imageIndex - 1;
      }
    });
  };

  const handleContinueForm = () => {
    setSlideIndex((imageIndex) => {
      const lastIndex = slideLength - 1;

      if (imageIndex === lastIndex) {
        return imageIndex;
      } else {
        return imageIndex + 1;
      }
    });
  };

  return {
    handleContinueForm,
    handlePreviousForm,
    setSlideLength,
    slideLength,
    slideIndex,
    setWidthSlide,
    widthSlide,
  };
};

export default useSlider;
