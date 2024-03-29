# Orientations, RRs, and more

## RR

There are 21 pieces in blokus. Each has exactly eight `RR`s (rotation + reflection), those being the four rotations and a choice to horizontally flip the piece. They are always in the order generated by this piece of code:

```js
for (let r = 0; r < 4; r++) {
    for (const f of [false, true]) {
        // this RR has a rotation of `r` and a horizontal reflection of `f`
    }
}
```

Suppose we have a piece that is rotated by $R$ and reflected by $F$ (If the piece is reflected horizontally, $F=1$, otherwise $F=0$). To get the $RR$ of this state you can use the following formula: $RR = 2R + F$.

## Orientation

However, there is a problem here: we cannot use RRs for move generation. This is because some pieces are symmetrical and thus not all 8 RRs are distinct. For this we need **orientations**.

Each pieces has some number of orientations. For example, the _F_ piece has 8 orientations, while the _X_ piece has exactly one orientation! If we were to use RRs for move generation, we could be potentially multiplying the work our program has to do eightfold.

So, for each piece type we will generate an array of orientations. To represent a state of a piece we then just need an orientation $n$, an index into the array of orientations. We also need to create a dictionary $D$ that maps each of the 8 RRs into an orientation. (in practice you can just use an array of orientations such that the nth item represent the orientation of the nth RR)

## Final pipeline

The user chooses a particular state with rotation $F$ and reflection $R$. We can compute the $RR$ of that using the formula $RR = 2R + F$. Then we will use the RR to orientation dictionary to compute an orientation $O = D_{RR}$. This will be the data that is passed along and also used in the code.
