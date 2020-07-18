const tmi = require ("tmi.js");
const fs = require('fs')
var path = require('path');
var interval = 500;
var notified = false;

const options = {
  options: {
    debug: true,
  },
  connection:{
    cluster: "aws",
    reconnect: true,
  },
  identity: {
    username: "CommunityChatbot",
    password: "oauth:lqolhj8lms1jsn6mdbx146l85lqq3j",
  },
  channels: ["jlesh18"]
};


const client = new tmi.client(options);
client.connect();

client.on('connected', (address, port) => {
  client.action('jlesh18', 'Hello, the community chatbot is now here :) Get excited to all chat!');
});

client.on('chat', (channel, tags, message, self) => {
  if (tags.username === "jlesh18" && message == "!allchat"){
    var i;
    var counter = 6;
    var interval = setInterval(function() {
      counter--;
      if (counter == 1) {
          clearInterval(interval);
      }
      console.log(counter)
    }, 1000);
  }
});

client.on('chat', (channel, tags, message, self) => {
  if (message.substring(0, 8) === '!allchat' || message.substring(0, 8) === '!Allchat') {
    const filepath = './log.txt'
    const filename = 'log.txt'
    const editedMessage = message + ' - twitch.tv/jlesh18 follower \"' + tags.username + '\"' + '\r\n'
    try {
    fs.stat(filepath, function(err) {
        if (!err) {
            fs.appendFileSync(filename, editedMessage);
            console.log(tags.username + ' Chatted');
        }
        else {
            console.log('file or directory does not exist');
            client.action('jlesh18', 'We are not currently accepting all chats :\'(')
        }
    });
    } catch(err) {
      console.error("Path does not exist")
    }
  }
});

setInterval(function() {
  const filepath = './log.txt'
  const filename = 'log.txt'
  try {
  fs.stat(filepath, function(err2) {
      try {
        if (fs.existsSync(filename) && notified == false) {
          console.log('Accepting messages now for all chat');
          client.action('jlesh18', 'Type !allchat <message> to chat in my game!')
          notified = true
        }
      } catch (e) {
        console.log("Some Error Occured")
      }
  });
} catch(err2) {
    console.error("Path does not exist")
  }
  if (notified == true && !fs.existsSync(filename)){
    notified = false
  }
}, interval);
