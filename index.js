// Made by River, a.k.a Rivanuff :^)

activated = FileLib.read('WallsAutoTeam/settings', 'activated.txt').toLowerCase();
color = FileLib.read('WallsAutoTeam/settings', 'color.txt').toLowerCase();

if (activated != 'true' && activated != 'false') {
  ChatLib.chat('&8[&9Walls Auto Team&8] &cNo activation state set yet. Deactivating by default.');
  activated = 'false';
}

if (color != 'red' && color != 'blue' && color != 'green' && color != 'yellow') {
  ChatLib.chat('&8[&9Walls Auto Team&8] &cNo preferred team color set yet. Setting to &eyellow &cby default.');
  color = 'yellow';
}

register('command', args => {
  switch (args.toLowerCase()) {
    case 'toggle':
        if (activated == 'false'){
          activated = 'true';
          ChatLib.chat('&8[&9Walls Auto Team&8] &aModule activated.');
        } else {
          activated = 'false';
          inPreferredTeam = false;
          ChatLib.chat('&8[&9Walls Auto Team&8] &cModule deactivated.');
        }

        FileLib.write("WallsAutoTeam/settings", "activated.txt", activated);
    break;
  
    case 'red':
      ChatLib.chat('&8[&9Walls Auto Team&8] &7Preferred color set to &cred&7.');
      inPreferredTeam = false;
      color = 'red';
      FileLib.write("WallsAutoTeam/settings", "color.txt", color);
    break;

    case 'blue':
      ChatLib.chat('&8[&9Walls Auto Team&8] &7Preferred color set to &9blue&7.');
      inPreferredTeam = false;
      color = 'blue';
      FileLib.write("WallsAutoTeam/settings", "color.txt", color);
    break;

    case 'green':
      ChatLib.chat('&8[&9Walls Auto Team&8] &7Preferred color set to &agreen&7.');
      inPreferredTeam = false;
      color = 'green';
      FileLib.write("WallsAutoTeam/settings", "color.txt", color);
    break;

    case 'yellow':
      ChatLib.chat('&8[&9Walls Auto Team&8] &7Preferred color set to &eyellow&7.');
      inPreferredTeam = false;
      color = 'yellow';
      FileLib.write("WallsAutoTeam/settings", "color.txt", color);
    break;

    case 'help':
      ChatLib.chat("&b&m" + ChatLib.getChatBreak("-"));
      ChatLib.chat(ChatLib.getCenteredText('&9Walls Auto Team &8by &9Rivanuff'));
      ChatLib.chat('');
      ChatLib.chat('&7Commands:');
      ChatLib.chat(' &9- /wat toggle: &7Toggles the module.');
      ChatLib.chat(' &9- /wat {color}: &7Sets the color the module will join for you.');
      ChatLib.chat(' &9- /wat help: &7Displays this information.');
      ChatLib.chat('');
      ChatLib.chat(ChatLib.getCenteredText('&9rivanuff.com'));
      ChatLib.chat('&b&m' + ChatLib.getChatBreak('-'));
    break;

    default:
      ChatLib.chat('&8[&9Walls Auto Team&8] &cInvalid command. Type "/wat help" for more information.');
    break;
  }
}).setTabCompletions(['toggle', 'help', 'red', 'blue', 'green', 'yellow']).setName('wat');


register('worldLoad', () => {
  inPreferredTeam = false;
});

register('chat', (chat, event) => {
  chat = ChatLib.getChatMessage(event).removeFormatting();
  chat = String(chat).toLowerCase();

  if (activated == 'true') {
    if (chat.includes(`you are now on the ${color} team!`)) {
      inPreferredTeam = true;
    } else if (chat.includes(`you are already on the ${color} team!`)) {
      cancel(event);
    } else if ((chat.includes('has joined (') || chat.includes('has quit!')) && inPreferredTeam == false) {
      ChatLib.command(`team ${color}`);
    } else if (chat.includes('vips and above can do /fw to show their team their location!')) {
      ChatLib.say(`I just managed to get into ${color} by using Rivanuff's Walls Auto Team ChatTrigger module!`);
    }
  }
}).setCriteria('${chat}');
