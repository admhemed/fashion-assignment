import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ProductsPage from "./page";

test("renders learn react link", () => {
  render(<ProductsPage />);
  const productListTitle = screen.getByText(/product list/i);
  expect(productListTitle).toBeInTheDocument();
});
