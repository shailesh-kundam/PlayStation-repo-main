import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from "../components/Calendar";
import CalendarHeader from "../components/CalendarHeader";
import GameDetails from "../components/GameDetails";
import DayCell from "../components/DayCell";

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            date: "2024-02-15",
            title: "Game Title",
            imageUrl: "game-image-url.jpg",
          },
        ]),
    })
  );
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

describe("Calendar Component", () => {
  test("renders Calendar component", async () => {
    // Render the Calendar component
    const { findByText } = render(<Calendar />);

    // Wait for the Calendar to be in the document
    const calendarElement = await findByText(/Sunday/i);
    expect(calendarElement).toBeInTheDocument();
  });

  test("displays the current month and year", () => {
    const currentDate = new Date(2024, 1, 22); // February 22, 2024
    const formattedDate = currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const { getByText } = render(<CalendarHeader currentDate={currentDate} />);

    expect(getByText(formattedDate)).toBeInTheDocument();
  });

  test("fetches game releases on component mount", async () => {
    render(<Calendar />);

    // Wait for the mock fetch to be called
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  test("navigates to the next month when next arrow is clicked", () => {
    const nextMonthMock = jest.fn();
    const { getByTestId } = render(
      <CalendarHeader currentDate={new Date()} nextMonth={nextMonthMock} />
    );

    const nextArrow = getByTestId("next-month");
    fireEvent.click(nextArrow);

    expect(nextMonthMock).toHaveBeenCalledTimes(1);
  });

  test("navigates to the previous month when previous arrow is clicked", () => {
    const prevMonthMock = jest.fn();
    const { getByTestId } = render(
      <CalendarHeader currentDate={new Date()} prevMonth={prevMonthMock} />
    );

    const prevArrow = getByTestId("prev-month");
    fireEvent.click(prevArrow);

    expect(prevMonthMock).toHaveBeenCalledTimes(1);
  });

  test("Clicking on a day without a game release does not show game details", () => {
    // Arrange
    const { getAllByTestId, container } = render(<Calendar />);

    // Act
    const noGameDays = getAllByTestId("no-game-day");
    // If there are multiple no-game-days, you can choose one to click, e.g., the first one.
    fireEvent.click(noGameDays[0]);

    // Assert
    // Check if the game-details-row is not present in the document after the click
    const gameDetailsRow = container.querySelector(".game-details-row");
    expect(gameDetailsRow).not.toBeInTheDocument();
  });

  test("clicking on a day with a game shows game details", () => {
    // Mock the gameRelease and handleDateClick props
    const gameReleaseMock = {
      imageUrl: "some-url",
      title: "some-title",
    };
    const handleDateClickMock = jest.fn();

    // Render the DayCell with the props
    render(
      <DayCell
        day={new Date()}
        dayInMonth={true}
        gameRelease={gameReleaseMock}
        handleDateClick={handleDateClickMock}
      />
    );

    // Find the element with the test id 'game-day' and click it
    const gameDayElement = screen.getByTestId("game-day");
    fireEvent.click(gameDayElement);

    // Expect the handleDateClick to have been called with the gameReleaseMock
    expect(handleDateClickMock).toHaveBeenCalledWith(gameReleaseMock);
  });
});
