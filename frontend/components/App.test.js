// Write your tests here
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest';
import AppFunctional from './AppFunctional';

describe('AppFunctional', () => {
  test('renders grid correctly', () => {
    render(<AppFunctional />);
    const squares = screen.getAllByTestId('square');
    expect(squares.length).toBe(9);
  });

  test('updates coordinates when moving left', () => {
    render(<AppFunctional />);
    const coordinates = screen.getByTestId('coordinates');
    const leftButton = screen.getByText('SOL');
    fireEvent.click(leftButton);
    expect(coordinates.textContent).toBe('Koordinatlar (1, 2)');
  });

  test('updates coordinates when moving up', () => {
    render(<AppFunctional />);
    const coordinates = screen.getByTestId('coordinates');
    const upButton = screen.getByText('YUKARI');
    fireEvent.click(upButton);
    expect(coordinates.textContent).toBe('Koordinatlar (2, 1)');
  });

  test('updates coordinates when moving right', () => {
    render(<AppFunctional />);
    const coordinates = screen.getByTestId('coordinates');
    const rightButton = screen.getByText('SAĞ');
    fireEvent.click(rightButton);
    expect(coordinates.textContent).toBe('Koordinatlar (2, 2)');
  });

  test('updates coordinates when moving down', () => {
    render(<AppFunctional />);
    const coordinates = screen.getByTestId('coordinates');
    const downButton = screen.getByText('AŞAĞI');
    fireEvent.click(downButton);
    expect(coordinates.textContent).toBe('Koordinatlar (1, 2)');
  });

  test('resets coordinates when reset button is clicked', () => {
    render(<AppFunctional />);
    const coordinates = screen.getByTestId('coordinates');
    const resetButton = screen.getByText('reset');
    fireEvent.click(resetButton);
    expect(coordinates.textContent).toBe('Koordinatlar (2, 2)');
  });

  test('submits form with valid email', () => {
    render(<AppFunctional />);
    const message = screen.getByTestId('message');
    const emailInput = screen.getByPlaceholderText('email girin');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(message.textContent).toBe('Success');
  });

  test('does not submit form with invalid email', () => {
    render(<AppFunctional />);
    const message = screen.getByTestId('message');
    const emailInput = screen.getByPlaceholderText('email girin');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(submitButton);

    expect(message.textContent).toBe('Error: Invalid email');
  });
});
test('sanity', () => {
  expect(true).toBe(false);
});
