// Contains utility functions that can be reused across the project
let selectObjectById = (board, id) => {
  for (let row of board) {
      for (let tile of row) {
          if (typeof tile === 'object' && tile.id === id) {
              return tile;
          }
      }
  }
  return null;
};

module.exports = {
  selectObjectById
};
