# JS13kbGames 2020 - 404 Mission

![CI](https://github.com/ByteDecoder/js13k2020/workflows/CI/badge.svg)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

404 game theme for js13kbGames coding competition Sep 13, 2020

Bundled with 🖤 with Parcel.

## 404 Mission

Exploring an unknown underwater facility, in a secret mission called **404 Mission**, your orders aboard the **Angelizer submarine(Project 404)**, is collect the **404 Cards** that contains traces of an unknown lost civilization for further study
within **10** dangerous missions. Oxygen resources are scarce in the facility depths, meaning your time in each mission is limited.

How many missions, could you survive with the *Angelizer* and its sonar sound?

404 Mission game is based on a procedural dungeon roguelike that increases the replayability.

- Objective
  - Collected all the 404 cards required at each mission level and try to survive the major number of missions.
  - Collect cards from **10** missions to discover something about that place.
- Mechanics
  - Collect bubble times to extend your lifetime
  - There is a chance to get extra Hyper Engine charges through the gameplay.
- Rules
  - The game ends if the time expires
  - The mission is completed if the player collects all the 404 cards in the play level
  - If the play impact a mine, the player dies and the game is over
- Controls
  - **Arrow keys** or **ASDW** to move the player submarine
  - When **HyperEngine** is ready, can be activated with the **space key** allowing the player to move faster.
  - **key f** enters in full-screen mode, and **key ESC** exits the fullscreen mode.

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

Copyright (c) 2020 [Rodrigo Reyes](https://twitter.com/bytedecoder) released under the GNU General Public License (GPL) 3.0
