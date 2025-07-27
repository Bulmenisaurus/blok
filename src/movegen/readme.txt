# Movegen
This is a little bit tricky in blokus but let's try.

`pieces.json` contains the raw piece data, the coordinates for the pentomino pieces & shit.


Following this we create `piece-rr.json`. This aims to solve the solution of rotational/reflectional symmetry.
This is indexed by 2*rotation + reflection, and looks like:
[0,0,1,1,0,0,1,1]
This specific rr indicates that the given piece has only two distinct orientations.

From the rr and pieces.json we hardcode the valid orientations of the pieces, resulting in `piece-orientations.json` (the raw data) and `piece-orientations-bitboard.json`.


TODO: we need to represent the orientation data by bitboards too!