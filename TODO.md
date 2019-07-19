## BellState.js

## NEED
- way to delete existing bells

## WANT
- figure out how to periodically call saveToFile
- way to edit bells
- way to enable-disable bells

## Nice to have
- reorder based on passed in order to createBell
- attempt to make a backup file before saving
    1. copy existing backup to backup backup - error mode if fails
    2. overwrite existing backup with current file - error mode if fails
    3. create new file - error mode if fails
    4. delete backup backup - error mode if fails
- intsall frontend as npm package
- async reads/writes
- add validation for inputs/outputs on query and mutation methods
- add some tests!