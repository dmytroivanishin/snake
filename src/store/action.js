export const changeDirection   = (payload) => ({ type: "CHANGE_DIRECTION", payload });
export const move              = (payload) => ({ type: "MOVE", payload });
export const addFood           = (payload) => ({ type: "ADD_FOOD", payload });

export const growth    = () => ({ type: "GROWTH" });
export const gameOver  = () => ({ type: "GAME_OVER" });
export const gameStart  = () => ({ type: "GAME_START" });
export const nextLevel = () => ({ type: "NEXT_LEVEL" });
export const win       = () => ({ type: "WIN" });

