import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from '../../src/pages/index';

jest.mock('../../src/components/ArtistList', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Artist List</div>,
  };
});

describe('Home page', () => {
  it('Should render properly', () => {
    render(<HomePage artists={[]} />);

    const header = screen.getByRole('heading', { level: 1 });
    const headerText = "Top Artist List";

    expect(header).toHaveTextContent(headerText);
  });
});
