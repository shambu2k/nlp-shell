#!/bin/zsh

function znlp() {
  local description="$1"
  description=$(echo $description | sed "s/'//g" | sed "s/\"//g" | sed "s/\\\\//g")

  local os_type=$(uname)
  local command=$(node -e "(async () => { const { getCommand } = await import('./src/llm.js'); console.log(await getCommand('$description', '$os_type')); })();")

  echo "Description: $description"
  echo "Generated command: $command"
  read -q "REPLY?Do you want to execute this command? (y/n) "
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    eval "$command"
  else
    echo "Command not executed."
  fi
}