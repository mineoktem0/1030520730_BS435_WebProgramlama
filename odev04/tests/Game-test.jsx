const React = require('react');
const {shallow} = require('enzyme');
import Game from '../src/Game.jsx';

test('Game card click', () => {
    const driver = shallow(<Game/>);
    var card = driver.find('img').at(2);
    card.simulate('click');
    card = driver.find('img').at(2);
    var srcName = card.prop("src")
    expect(srcName == 'http://localhost:8080/cat.jpg' || srcName == 'http://localhost:8080/dog.jpg').toBeTruthy();
})

test('Game win state', () => {
    const driver = shallow(<Game/>);
    var card1 = driver.find('img').at(0);
    card1.simulate('click');
    var card2 = driver.find('img').at(1);
    card2.simulate('click');
    var gameStateText = driver.find('#gameState').at(0);
    var gameState = gameStateText.find('p').props('id').id
    expect(gameState == 'lose' || gameState == 'win').toBeTruthy();
})
