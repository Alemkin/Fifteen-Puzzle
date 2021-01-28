Fifteen Puzzle Request

Took ~2 hours

I have npm 6.9.0 and Node 10.21.0 installed locally, in case the version matters, but it shouldn't

All you need to do to run the project locally:
```
npm install
npm run dev
```
then navigate to the localhost:3002

I added the ability to use your keyboard as well as your mouse to make it accessible.

The app is also fully mobile responsive down to 320px width, the smallest phone width.

Given more time, I would add and optimize a few things:

1) Optimize the logic for moving rows to account for any size puzzle (A few hours maybe)
2) Add win condition and score count even (~30 mintues)
3) Fully implement PWA so it can be played offline after first visit and downloaded as an app (~30 minutes)
4) Add nicer transitions with delightful animations
