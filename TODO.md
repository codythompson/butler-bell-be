## BellState.js

- add validation for inputs/outputs on query and mutation methods
- add some tests!
- figure out how to periodically call saveToFile
- attempt to make a backup file before saving
    1. copy existing backup to backup backup - error mode if fails
    2. overwrite existing backup with current file - error mode if fails
    3. create new file - error mode if fails
    4. delete backup backup - error mode if fails
- async reads/writes
- reorder based on passed in order to createBell