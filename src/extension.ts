// src/extension.ts
// darkpixlz 2024

const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
import * as vscode from 'vscode';
import axios from 'axios';

var status_bar: any = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
const cfg = vscode.workspace.getConfiguration("lastfm", vscode.window.activeTextEditor?.document.uri);
status_bar.show();

export function activate(context: vscode.ExtensionContext) {
    delay(1000);
    update();
    setInterval(update, 15000);
    //context.subscriptions.push(vscode.window.onDidChangeWindowState(() => {
    //    update();
    //}));
}

async function update() {
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${cfg.inspect("username")?.globalValue}&api_key=${cfg.inspect("api")?.globalValue}&format=json&limit=1`);
        const recentTracks = response.data.recenttracks;

        if (recentTracks && recentTracks.track && recentTracks.track.length > 0) {
            try {
                if (Math.floor(Date.now() / 1000) - recentTracks.track[0].date.uts >= 300) {
                    updateStatusBar("", 15000); // clear
                    return;
                };
            } catch (error) {
                // probably now playing, safe to ignore...
            }

            const currentTrack = recentTracks.track[0];
            const currentSong = currentTrack.name + ' - ' + currentTrack.artist['#text'];
            updateStatusBar(currentSong, 15000);
        } else {
            updateStatusBar('This person has no music!', 15000);
        }
    } catch (error) {
        console.error(error);
        updateStatusBar('Failed fetching music, bad config...', 15000);
    }
}

function updateStatusBar(text: string, timeout: number) {
    status_bar.text = text;

    vscode.window.setStatusBarMessage(text, new Promise((resolve, reject) => {
        setTimeout(() => { resolve(true); }, timeout);
    }));

    setTimeout(function () {
        status_bar.hide();
    }, timeout);
}