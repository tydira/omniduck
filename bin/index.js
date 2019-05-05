#!/usr/bin/env node

const open = require("open");

const { argv } = process;

if (argv.length < 4) {
  console.error(`\
Separately run many DuckDuckGo bangs on many inputs

Usage: omniduck [bangs] [inputs]

Commands:
  omniduck $1 [inputs..]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Examples:
  omniduck g banana orange    Search Google for 'banana' and 'orange'
  omniduck a,e banana orange  Search Ebay and Amazon for 'banana' and 'orange'
  omniduck i,gi puppies       Search DDG and Google for 'puppy' images
  omniduck bang food shelter  Search DDG for 'food' and 'shelter' bangs

Be careful how many bangs and inputs you use\
  `);

  process.exit(1);
}

const bangs = argv[2].split(",");
const inputs = argv.slice(3);

let serial = Promise.resolve();

for (const bang of bangs) {
  for (const input of inputs) {
    serial.then(() => open(`https://duckduckgo.com/?q=!${bang} ${input}`));
  }
}
