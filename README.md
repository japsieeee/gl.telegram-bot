## Table of Contents

- [Must have](#must-have)
    - [How to create a telegram bot](#how-to-create-a-telegram-bot)
- [Get started](#get-started)
    - [Installation](#installation)
    - [Creating instance of bot](#creating-instance-of-bot)
- [Bot Actions](#bot-actions)
    - [sendMessage](#sendMessage)
    - [getUpdates](#getUpdates)
    - [getGroupIDs](#getGroupIDs)

# Must have
Before you get start make sure you already have a telegram bot

### How to create a telegram bot
1. **Access BotFather:** Open the Telegram app and search for "@BotFather"
2. **Start a conversation:** Click "Start" to begin interacting with BotFather.
3. **Create a new bot:** Send the command "/newbot". 
4. **Provide details:** Enter a name for your bot and a unique username that must end with "bot". 
5. **Receive your token:** Once created, BotFather will provide you with your bot's access token, which is necessary to interact with your bot using code.

# Get started

### Installation

Using npm:

```bash
$ npm install gl.telegram-bot
```

### Creating instance of bot
You can use this bot instance to call its bot actions

```typescript
import TelegramBot from "gl.telegram-bot";

const botInstance = new TelegramBot('1234567:ASJHR24-93145uASJHF-ASDIRFJ3158');
```

# Bot Actions

### sendMessage
> tip: to get channel the channel id you can enter the following url on your browser \
> https://api.telegram.org/bot$BOT_TOKEN/getUpdates \
>
> if your token is something like this: 123456-78910 \
> you should add bot as prefix and the ouput should be like this: ***bot123456-78910***

This action sends a message to an individual group


```typescript
// send to 1 group id
botInstance.sendMessage('test message', '-100123456789');

// send to multiple groups
botInstance.sendMessage('test message', ['-100123456789', '-100987654321']);
```


### getUpdates
@return_type - object; \
It gets the recent updates on your bot

```typescript
const updates = await botInstance.getUpdates();

// this is 
console.log(updates);
```

### getGroupIDs
@return_type - number[]; \
Basically, it uses getUpdates and then get all its channel id's

```typescript
const groupIDs = await botInstance.getGroupIDs();

// this is 
console.log(updates);
```