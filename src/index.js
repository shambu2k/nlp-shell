#!/usr/bin/env node

import { getCommand } from './llm.js';
import readline from 'readline';
import { exec } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const description = process.argv.slice(2).join(' ');
const sanitizedDescription = description.replace(/['"\\]/g, '');
const osType = process.platform === 'win32' ? 'Windows' : 'Linux';

(async () => {
  const command = await getCommand(sanitizedDescription, osType);
  console.log(`Description: ${sanitizedDescription}`);
  console.log(`Generated command: ${command}`);

  rl.question('Do you want to execute this command? (y/n) ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`${stderr}`);
          return;
        }
        console.log(`${stdout}`);
      });
    } else {
      console.log('Command not executed.');
    }
    rl.close();
  });
})();