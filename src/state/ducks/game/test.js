import reducer from './reducers';
import * as actions from './actions';

describe('Game Duck', () => {
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const drawBoard = [
    [2, 2, 1],
    [1, 1, 2],
    [2, 1, 1]
  ];

  const player1WinBoard = [
    [2, 2, 0],
    [1, 1, 1],
    [2, 2, 0]
  ];

  const player2WinBoard = [
    [2, 2, 2],
    [1, 1, 0],
    [1, 1, 0]
  ];

  describe('Reducers', () => {
    it('should have an initial state', () => {
      // we know that we want our game state to have 'board and 'gameover' fields
      // our initial state for the board is an empty nested array and a false boolean field
      const expectedState = {
        board: [[]],
        gameover: false,
        player: 1,
        winner: -1
      };

      // our action is an action that is not part of the game duck
      // we make one up, such as the one below, INIT, empty object or something not in the 
      // game duck as an action
      const action = { type: 'NOT_A_GAME_TYPE' };
      // this should produce the inital state since the type is not one that we handle 
      // in our reducer
      const result = reducer(undefined, action);

      expect(result).toEqual(expectedState);
    });

    it('should start a new game', () => {
      // the current state 
      const state = {
        board: emptyBoard,
        gameover: true,
        player: 1,
        winner: -1
      };

      // the expected state after it has been reduced
      const expectedState = {
        board: emptyBoard.slice(),
        gameover: false,
        player: 1,
        winner: -1
      };

      // the action that will produce the new state
      const action = actions.newGame();
      // the resulting new state
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should end a game', () => {
      const state = {
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1
      };

      const expectedState = {
        board: emptyBoard,
        gameover: true,
        player: 1,
        winner: -1
      };

      const action = actions.gameover();
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should update the board when a player makes a move', () => {
      const state = {
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1
      };

      const expectedState = {
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 1]
        ],
        gameover: false,
        player: 1,
        winner: -1
      };

      const player = 1;
      const row = 2;
      const col = 2;

      const action = actions.movePlayer(player, row, col);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should win a game', () => {
      const state = {
        board: player1WinBoard,
        gameover: false,
        player: 1,
        winner: -1
      };

      const expectedState = {
        board: player1WinBoard,
        gameover: true,
        player: 1,
        winner: 1
      };

      const action = actions.winner(1);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should switch players', () => {
      const state = {
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1
      };

      const expectedState = {
        board: emptyBoard,
        gameover: false,
        player: 2,
        winner: -1
      };

      const action = actions.switchPlayer(2);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);

      const state2 = Object.assign({}, expectedState);

      const expectedState2 = {
        board: emptyBoard,
        gameover: false,
        player: 2,
        winner: -1
      };

      const action2 = actions.switchPlayer(1);
      const result2 = reducer(state, action);

      expect(result2).toEqual(expectedState2);
    });
  });
});