# JS13kbGames 2020 - 404 Mission

![CI](https://github.com/ByteDecoder/js13k2020/workflows/CI/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green)

404 game theme for js13kbGames coding competition Sep 13, 2020

Bundled with 🖤 with Parcel.

## 404 Mission

Exploring an unknow underwater facility, in a secret mission called **404 Mission**, your orders aboard the **Angelizer submarine(Project 404)**, is collect the **404 Cards** that contains traces of an unknown lost civilization for further study.

How many missions, could you survive with the *Angelizer* and its sonar sound?

404 Mission game is based on a procedural dungeon roguelike that increases the replayability.

- Objective
  - Collected all the 404 cards required in each mission level and try to survive the major number of missions
  - The Player will survive until the time is depleted or getting an impact from a mine
- Mechanics
  - Collect bubble times to extend your life time
- Rules
  - Game ends if the time expires
  - Mission is completed if the player collect all the 404 cards in the play level
  - If the play impact a mine, the player dies and game is over
- Controls
  - **Arrow keys** or **ASDW** to move the player submarine
  - When **HyperEngine** is ready, can be activated with the **space key** allowing the player moving faster.
  - **key f** enters in full screen mode, and **key esc** exits fullscreen mode.

### Gameplay screenshots

![Screenshot One](./media/screen_shoot1.png)
![Screenshot Two](./media/screen_shoot2.png)

## Getting started with development

## Requirements

[Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com/) are required to install dependencies and run scripts via `yarn`.

[Parcel](https://parceljs.org/getting_started.html) is required to bundle and serve the web application. You can install Parcel by running the following command: `yarn global add parcel-bundler`.

## Setup

Getting all js dependencies

```bash
yarn install
```

## Development

Serve the code in development mode

```bash
yarn dev
```

Linting the code with ESLint

```bash
yarn lint
```

## Production build

For bulding the production bundle and check if size is still under 13kb run

```bash
yarn party
```

After building the production release, for save some extra bytes you can use advzip

```bash
advzip -z - 4 <game_zipfile>.zip
```

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/ByteDecoder/js13k2020>.

Copyright (c) 2020 [Rodrigo Reyes](https://twitter.com/bytedecoder) released under the MIT license
