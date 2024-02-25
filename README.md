# LastFM Status for VSCode

With this plugin, you're able to see the track name of a song currently playing on your Last.fm account (or anybody else's for that matter.)

## Why?

I don't know. Seemed cool and had nothing else to be doing.

---

# Installation

I do not have an account to make plugins on the marketplace, so that may come soon, but for now you need to manually install it.

---

### Setting up

Make sure you have node installed. I have `v20.11.1` installed, but any should work.

Run the following:

```sh
git clone https://github.com/darkpixlz/lfm-vscode 

cd lfm-vscode

npm i
npm run compile
vsce package
```

After that's done, go to your vscode extensions menu, click the 3 dots, and "Install from VISX...". After that, you should be able to reload and you'll be good to go.

#### I want it precompiled!

Check releases.

---

# Configuration

For it to work, you need to go to your VSCode settings and add the username to track and your LFM API key (make one [here](https://www.last.fm/api/account/create) or [see your old ones](https://www.last.fm/api/accounts)). Add it to settings and reload.

# Development

Everything for developing already exists (along with launch config), so you should be good to go. PRs are welcome and issues may (or may not) be looked at. Currently the only known issue is that it may appear twice at boot but will after the first ping.