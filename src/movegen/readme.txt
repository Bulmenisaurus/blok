# Movegen
This is a little bit tricky in blokus but let's try.

`pieces.json` contains the raw piece data, the coordinates for the pentomino pieces & shit.


Following this we create `piece-rr.json`. This aims to solve the solution of rotational/reflectional symmetry.
This is indexed by 2*rotation + reflection, and looks like:
[0,0,1,1,0,0,1,1]
This specific rr indicates that the given piece has only two distinct orientations.

From the rr and pieces.json we hardcode the valid orientations of the pieces, resulting in `piece-orientations.json` (the raw data) and `piece-orientations-bitboard.json`.

`piece-corners.json` stores the location of tiles off of which you can place a piece. For example, for the long piece only has two corners - the two ends!

`piece-corner-attachers.json` is similar, but it's off the piece itself, on the tiles diagonally adjacent to it that you can place on.

`piece-short-bounding-box.json` stores a coordinate for each piece, representing the coordinate of the bottom right of the bounding box if the piece was placed at [0,0]. Benchmarks indicated that a sizeable portion of move generation was spent just computing these bounding boxes so they were cached.