#!/usr/bin/env node

var inquirer = require('inquirer')
  , colors = require('colors')
  , sys = require('sys')
  , spawn = require('child_process').spawn;

var questions = [
  {
    type: 'list',
    name: 'server',
    message: 'Remote Server',
    choices: [ 'ben.dev', 'chad.dev', 'johan.dev', 'mike.dev', 'spenser.dev', 'staging.simplesimple.ca', 'Quit' ],
  },
];

function promptForSSH() {
  inquirer.prompt(questions, function (response) {
    if (response.server === 'Quit') {
      console.log('Have a nice day!'.green);
      return;
    }

    var ssh = spawn('ssh', [ '-A', response.server ], { stdio: 'inherit' });
    ssh.on('exit', function () {
      console.log('Disconnected from '.yellow + response.server.blue);
      promptForSSH();
    });
  });
}

promptForSSH();
