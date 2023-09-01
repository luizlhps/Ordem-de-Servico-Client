import { Box, Button } from "@mui/material";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface ISliderProps {
  children: ReactNode;
  maxWidthSlide: number;
  slideIndex: number;
  setSlideLength: React.Dispatch<React.SetStateAction<number>>;
  setWidthSlide: React.Dispatch<React.SetStateAction<number>>;
  widthSlide: number;
}
interface ISlideProps {
  children: ReactNode;
  minWidth: number;
}

export const Slider = ({
  children,
  maxWidthSlide,
  slideIndex,
  setSlideLength,
  setWidthSlide,
  widthSlide,
}: ISliderProps) => {
  const slider = useRef<HTMLDivElement>(null);
  const lengthSlider = slider.current?.querySelectorAll("#content");
  const widthValueSlider = useRef<HTMLDivElement>(null);

  const slideImage = () => {
    if (slider.current) {
      slider.current.style.transform = `translate(-${slideIndex * 100}%)`;
    }
  };

  useEffect(() => {
    if (slideIndex !== 0) slideImage();
    if (slider.current) {
      slider.current.style.transform = `translate(-${slideIndex * 100}%)`;
    }
  }, [slideIndex]);

  useEffect(() => {
    if (lengthSlider) setSlideLength(lengthSlider.length);
  }, [lengthSlider]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (widthValueSlider.current) {
      setWidthSlide(widthValueSlider.current.clientWidth);
    }
  }, [widthValueSlider.current?.clientWidth]);

  const handleResize = () => {
    if (widthValueSlider.current) {
      setWidthSlide(widthValueSlider.current.clientWidth);
    }
  };

  console.log(slideIndex);

  return (
    <>
      <Box width={"100%"} maxWidth={maxWidthSlide} ref={widthValueSlider} />
      <Box width={widthSlide} overflow={"hidden"}>
        <Box display={"flex"} ref={slider} sx={{ transition: "all 0.4s ease" }}>
          {React.Children.map(children, (child, index) => (
            <Box minWidth={widthSlide} id="content">
              {child}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export const Slide = ({ children, minWidth }: ISlideProps) => {
  return (
    <Box minWidth={minWidth} className="slide">
      {children}
    </Box>
  );
};
