#!/bin/bash
jsonFiles='SimpleStorage.json ComplexStorage.json'

cd app/src/contracts || exit 1

for fname in $jsonFiles
do
  echo 'Clearing '$fname' ...'
  echo '{}' > $fname
  echo $fname':'
  cat $fname
  echo ''
done

echo -e 'Finished clearing JSON(s)!\n'

echo -e 'Deploying smart contracts ...\n'
echo -e 'truffle migrate --reset'

truffle migrate --reset

echo -e 'If npm was running, just refresh your browser tab now.\n'
echo 'Script terminates, tu ja!'
