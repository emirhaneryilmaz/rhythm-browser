import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from '../../src/components/Card';

// useTheme hook'unu taklit ederek Card'ı izole ediyoruz
jest.mock('../../src/context/ThemeContext', () => ({
  useTheme: () => ({ isDarkMode: false }),
}));

describe('Card component', () => {
  it('Should render properly', () => {
    const title = 'Test Title';
    const data = [
      {
        artist: 'Artist 1',
        url: 'http://example.com',
        name: 'Song 1',
        playcount: 100,
        image: [{ '#text': 'image1' }, { '#text': 'image1' }],
      },
      {
        artist: 'Artist 2',
        url: 'http://example.com',
        name: 'Song 2',
        playcount: 200,
        image: [{ '#text': 'image2' }, { '#text': 'image2' }],
      },
    ];

    render(<Card title={title} data={data} />);

    // Başlık var mı ?
    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toHaveTextContent(title);

    // Veriler var mı?
    data.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.artist)).toBeInTheDocument();
      expect(screen.getByText(`Playcount: ${item.playcount}`)).toBeInTheDocument();
    });
  });
});
