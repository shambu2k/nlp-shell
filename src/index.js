#!/usr/bin/env node

import { getCommand } from './llm.js';
import readline from 'readline';
import { spawn } from 'child_process';

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
      const [cmd, ...args] = command.split(' ');
      spawn(cmd, args, { stdio: 'inherit', shell: true });
    } else {
      console.log('Command not executed.');
    }
    rl.close();
  });
})();