import { render, screen, fireEvent, findByText, getByText } from "@testing-library/react";
import React from "react";
import { AccordionList } from "./AccordionList";
import useMediaQuery from "@mui/material/useMediaQuery";

jest.mock("@mui/material/useMediaQuery");

describe("not show description", () => {
  it("should renders less description component on mobile", () => {
    const mediaQuery = jest.mocked(useMediaQuery as any);
    mediaQuery.mockReturnValueOnce(false);

    render(
      <AccordionList icon="services" title="Title" subTitle="Sub Title" description="Description" dafaultOpen={false}>
        <p>fake-text</p>
      </AccordionList>
    );

    const description = screen.getByText("Description");

    expect(description).toHaveTextContent("Description");
  });
});

describe("show description", () => {
  it("should renders show description component on desktop", () => {
    const mediaQuery = jest.mocked(useMediaQuery as any);
    mediaQuery.mockReturnValueOnce(true);

    render(
      <AccordionList icon="services" title="Title" subTitle="Sub Title" description="Description" dafaultOpen={false}>
        <p>fake-text</p>
      </AccordionList>
    );

    const description = screen.queryByText("Description");

    expect(description).toBeNull();
  });
});

describe("Accodiond List Icon tests", () => {
  it("should render the services icon correctly", () => {
    const { container } = render(
      <AccordionList icon="services" title="Title" subTitle="Subtitle">
        <p>fake-text</p>
      </AccordionList>
    );
    const element = screen.getByTestId("services-icon");
    expect(element).toBeInTheDocument();
  });

  it("should render the order icon correctly", () => {
    const { container } = render(
      <AccordionList icon="orders" title="Title" subTitle="Subtitle">
        <p>fake-text</p>
      </AccordionList>
    );
    const element = screen.getByTestId("order-icon");
    expect(element).toBeInTheDocument();
  });

  it("should render the technicalOpinion icon correctly", () => {
    const { container } = render(
      <AccordionList icon="technicalOpinion" title="Title" subTitle="Subtitle">
        <p>fake-text</p>
      </AccordionList>
    );
    const element = screen.getByTestId("dashboard-icon");
    expect(element).toBeInTheDocument();
  });
});

describe("Accodion List content tests", () => {
  it("should show the contents inside", () => {
    const { container } = render(
      <AccordionList icon="services" title="Title" subTitle="Subtitle" dafaultOpen>
        <p>fake-text</p>
      </AccordionList>
    );
    const containerContent = screen.getByTestId("content-container");
    const iconArrowContainer = screen.getByTestId("arrow-icon-container");
    const iconKeyboardArrowDown = screen.getByTestId("KeyboardArrowDownIcon");

    expect(iconKeyboardArrowDown);

    expect(containerContent).toHaveStyle(`
      border: solid 1px;
        border-radius: 20px;
        max-height: 9999px;
        transition: max-height 1s;
        overflow: hidden;
      `);

    fireEvent.click(iconArrowContainer);

    const iconKeyboardArrowRight = screen.getByTestId("KeyboardArrowRightIcon");
    expect(iconKeyboardArrowRight).toBeInTheDocument();
  });

  it("should not show the contents inside", () => {
    const { container } = render(
      <AccordionList icon="services" title="Title" subTitle="Subtitle">
        <p>fake-text</p>
      </AccordionList>
    );
    const containerContent = screen.getByTestId("content-container");
    const iconKeyboardArrowRight = screen.getByTestId("KeyboardArrowRightIcon");
    const iconArrowContainer = screen.getByTestId("arrow-icon-container");

    expect(iconKeyboardArrowRight).toBeInTheDocument();
    expect(containerContent).toHaveStyle(`
        border: 0 solid;
        border-radius: 20px;
        max-height: 0px;
        transition: all 0.1s;
        overflow: hidden;
      `);

    fireEvent.click(iconArrowContainer);

    const iconKeyboardArrowDown = screen.getByTestId("KeyboardArrowDownIcon");
    expect(iconKeyboardArrowDown).toBeInTheDocument();
  });
});
