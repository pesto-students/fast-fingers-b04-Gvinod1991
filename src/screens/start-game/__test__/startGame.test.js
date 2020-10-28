

import React from 'react';
import { render } from '@testing-library/react';
import StartGame from '../index';

describe('Test cases for start game screen',()=>{

    test('One input field to be present', () => {
        const { container } = render(<StartGame />)
        const userInput = container.querySelector('[data-testid="input-player-name"]');
        expect(userInput.placeholder).toEqual('TYPE YOUR NAME');
    });
    
    test('One select field to be present', () => {
        const { container } = render(<StartGame />)
        const userInput = container.querySelector('[data-testid="select-game-level"]');
        expect(userInput).toBeDefined();
    });
    
    test('Button should be rendered with START GAME text', () => {
        const {getByTestId}=render(<StartGame/>);
        expect(getByTestId('start-btn')).toHaveTextContent('START GAME');
    });
})
