import React from "react";
import { render, screen } from "@testing-library/react";
import CustomDatePicker from "./CustomDatePicker";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

test("should render component", () => {
  render(<CustomDatePicker />);
  // eslint-disable-next-line no-restricted-globals
  const element = screen.getByTestId("datapicker");
  expect(element).toBeInTheDocument();
});

test("should render hint", async () => {
  render(<CustomDatePicker />);
  const day = screen.getByText("16");
  userEvent.click(day);
  const hint = await screen.findByText(
    "Choose a start date up to 6 weeks in advance"
  );
  expect(hint).toBeInTheDocument();
});
