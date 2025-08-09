import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders homepage hero and CTA without router conflicts', () => {
  render(<App />);

  // HERO (Home page content)
  const heroHeading = screen.getByRole('heading', { name: /welcome to my portfolio/i });
  expect(heroHeading).toBeInTheDocument();

  // Scope to the home section (container of the hero)
  const homeSection = heroHeading.closest('div');
  expect(homeSection).toBeTruthy();

  // The CTA "About Me" inside the home section (avoid matching navbar link)
  const ctaLink = within(homeSection).getByRole('link', { name: /about me/i });
  expect(ctaLink).toBeInTheDocument();
  expect(ctaLink).toHaveAttribute('href', '/about');

  // Your name appears in the intro text
  expect(screen.getByText(/jee won jung/i)).toBeInTheDocument();

  // NAVBAR checks (scoped to nav so we don’t hit the CTA)
  const nav = screen.getByRole('navigation');
  expect(nav).toBeInTheDocument();

  const navAbout = within(nav).getByRole('link', { name: /about me/i });
  expect(navAbout).toHaveAttribute('href', '/about');

  // A couple more nav items to show coverage
  expect(within(nav).getByRole('link', { name: /projects/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /contact/i })).toBeInTheDocument();
});
