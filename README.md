# BCOLN FS 19 Challenge Task Group "Ether"

## Setup Guidelines
-------------------

1. Clone this git repo into an empty folder on your machine:

  `$ git clone https://github.com/timolex/BClotteryEther.git .`

2. As some files are not present in the repo due to the auto-generated `.gitignore` (from [gitignore.io](gitignore.io)), it's necessary to unbox Drizzle again locally:

  `$ truffle unbox drizzle`

  Several overcautious prompts will ask you if you really want to overwrite several files / directories, which you all may delightfully confirm with `y + ↵` (why? -> see 3.).

3. As soon as the Drizzle box was successfully set up, please reset the master branch:

  `$ git reset --hard`

  This will restore all SC-related files messed with during _unbox_.

4. Please run `$ truffle compile` and resolve occasional errors :) .

5. At this point, you should be good to go for using the Bash script `tujamigrate.sh`, which allows for automatically resetting the JSONs in `app/src/contracts` (as recommended by [@jonixis](https://github.com/jonixis)) and running `truffle migrate --reset`. This script can be used from now on after every time the smart contracts have been modified. Please run this script as follows:
  `./tujamigrate.sh`
