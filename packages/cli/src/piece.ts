import { COLORS } from './constants';

const rotateCoord = (center: Types.Coordinate, point: Types.Coordinate,  direction: Types.Direction) => {
  const yDifference = center.y - point.y;
  const yChange = direction === 'clockwise' ? yDifference : -yDifference;

  const xDifference = center.x - point.x;
  const xChange = direction === 'clockwise' ? xDifference : -xDifference;
  const y = center.y - xChange
  const x = center.x + yChange

  return {
    ...point,
    x,
    y,
  }
}

const rotate = (movingPiece: Types.MovingPiece, direction: Types.Direction) => {
  let lowestX = 0;
  let lowestY = 0;
  const center =movingPiece.piece.coordinates.find((coord) => coord.isCenter) || { x: 0, y: 0, isCenter: true }
  const result = movingPiece.piece.coordinates.map((coord) => rotateCoord(center, coord, direction));

  result
    .forEach((coord) => {
      if (coord.x < lowestX) {
        lowestX = coord.x;
      }
      if (coord.y < lowestY) {
        lowestY = coord.y;
      }
    });

    movingPiece.piece.coordinates = result.map((coord): Types.Coordinate => ({
      ...coord,
      x: coord.x,
      y: coord.y,
    }));
    
    movingPiece.location.x = movingPiece.location.x - lowestX;
    movingPiece.location.y = movingPiece.location.y - lowestY;
}

const pieces: Types.Piece[] = [
  {
    coordinates: [
      {
        x: 0,
        y: 0,
        isCenter: false,
      },
      {
        x: 0,
        y: 1,
        isCenter: true,
      },
      {
        x: 1,
        y: 1,
        isCenter: false,
      },
      {
        x: 0,
        y: 2,
        isCenter: false,
      },
    ],
  },
  {
    coordinates: [
      {
        x: 0,
        y: 0,
        isCenter: false,
      },
      {
        x: 1,
        y: 0,
        isCenter: true,
      },
      {
        x: 0,
        y: 1,
        isCenter: false,
      },
      {
        x: 1,
        y: 1,
        isCenter: false,
      },
    ],
  },
  {
    coordinates: [
      {
        x: 0,
        y: 0,
        isCenter: false,
      },
      {
        x: 1,
        y: 0,
        isCenter: true,
      },
      {
        x: 2,
        y: 0,
        isCenter: false,
      },
      {
        x: 3,
        y: 0,
        isCenter: false,
      },
    ],
  },
  {
    coordinates: [
      {
        x: 0,
        y: 0,
        isCenter: false,
      },
      {
        x: 0,
        y: 1,
        isCenter: true,
      },
      {
        x: 1,
        y: 1,
        isCenter: false,
      },
      {
        x: 1,
        y: 2,
        isCenter: false,
      },
    ],
  },
  {
    coordinates: [
      {
        x: 0,
        y: 0,
        isCenter: false,
      },
      {
        x: 0,
        y: 1,
        isCenter: false,
      },
      {
        x: 1,
        y: 1,
        isCenter: true,
      },
      {
        x: 2,
        y: 1,
        isCenter: false,
      },
    ],
  },
];

const place = (state: Types.State) => {
  const piece = pieces[Math.floor(Math.random() * pieces.length)];
  const colorKeys = Object.keys(COLORS)
  const key = colorKeys[colorKeys.length * Math.random() << 0] as keyof Types.Colors;
  const color = COLORS[key];
  const minX = piece.coordinates.map((coord) => coord.x).reduce((a, b) => Math.min(a, b));
  const maxX = piece.coordinates.map((coord) => coord.x).reduce((a, b) => Math.max(a, b));
  const width = maxX - minX + 1;
  const center = Math.ceil((state.board.dimensions.width - width) / 4);
  const newPiece: Types.MovingPiece = {
    piece,
    color,
    location: {
      x: center,
      y: 0,
    },
    leftEdge: function() {
      const lowest = this.piece.coordinates.reduce((a, b) => Math.min(a, b.x), Infinity);
      return this.location.x + lowest;
    },
    rightEdge: function() {
      const highest = this.piece.coordinates.reduce((a, b) => Math.max(a, b.x), 0);
      return this.location.x + highest + 1;
    }
  };
  state.board.movingPiece = newPiece;
};

export default {
  place,
  rotate,
}
