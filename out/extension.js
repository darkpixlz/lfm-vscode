"use strict";
// src/extension.ts
// darkpixlz 2024
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const vscode = __importStar(require("vscode"));
const axios_1 = __importDefault(require("axios"));
var status_bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
const cfg = vscode.workspace.getConfiguration("lastfm", vscode.window.activeTextEditor?.document.uri);
status_bar.show();
function activate(context) {
    delay(1000);
    update();
    setInterval(update, 15000);
    //context.subscriptions.push(vscode.window.onDidChangeWindowState(() => {
    //    update();
    //}));
}
exports.activate = activate;
async function update() {
    try {
        const response = await axios_1.default.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${cfg.inspect("username")?.globalValue}&api_key=${cfg.inspect("api")?.globalValue}&format=json&limit=1`);
        const recentTracks = response.data.recenttracks;
        if (recentTracks && recentTracks.track && recentTracks.track.length > 0) {
            try {
                if (Math.floor(Date.now() / 1000) - recentTracks.track[0].date.uts >= 300) {
                    updateStatusBar("", 15000); // clear
                    return;
                }
                ;
            }
            catch (error) {
                // probably now playing, safe to ignore...
            }
            const currentTrack = recentTracks.track[0];
            const currentSong = currentTrack.name + ' - ' + currentTrack.artist['#text'];
            updateStatusBar(currentSong, 15000);
        }
        else {
            updateStatusBar('This person has no music!', 15000);
        }
    }
    catch (error) {
        console.error(error);
        updateStatusBar('Failed fetching music, bad config...', 15000);
    }
}
function updateStatusBar(text, timeout) {
    status_bar.text = text;
    vscode.window.setStatusBarMessage(text, new Promise((resolve, reject) => {
        setTimeout(() => { resolve(true); }, timeout);
    }));
    setTimeout(function () {
        status_bar.hide();
    }, timeout);
}
//# sourceMappingURL=extension.js.map