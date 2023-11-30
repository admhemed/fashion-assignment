import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductsPage from "./page";
import "@testing-library/jest-dom";

describe("ProductsPage", () => {
  it("renders a heading", () => {
    render(<ProductsPage />);

    const heading = screen.getByText(/Product/i);

    expect(heading).toBeInTheDocument();
  });
});
