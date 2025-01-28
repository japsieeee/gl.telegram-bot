"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
class TelegramBot {
    BOT_TOKEN = '';
    SCRIPT_DIR = path_1.default.join(__dirname, 'scripts');
    constructor(botToken) {
        this.BOT_TOKEN = botToken;
    }
    /**
     * Sends a message to a group or channel
     * You can pass an array of group ids or a single group id
     *
     * @param {string} message
     * @param {string} channelID
     */
    sendMessage(message, channelID) {
        const FILE_NAME = 'telegram-send-message.sh';
        const SCRIPT_PATH = path_1.default.join(this.SCRIPT_DIR, FILE_NAME);
        if (typeof channelID === 'string') {
            (0, child_process_1.exec)(`bash ${SCRIPT_PATH} "${this.BOT_TOKEN}" "${message}" "${channelID}"`);
        }
        if (typeof channelID === 'object') {
            for (const id of channelID) {
                (0, child_process_1.exec)(`bash ${SCRIPT_PATH} "${this.BOT_TOKEN}" "${message}" "${id}"`);
            }
        }
    }
    /**
     * Returns recent updates from telegram bot
     *
     * @returns Promise<object>
     */
    getUpdates() {
        return new Promise((res) => {
            (0, child_process_1.exec)(`bash ${this.SCRIPT_DIR}telegram-get-updates.sh "${this.BOT_TOKEN}"`, async (err, stdout) => {
                if (!err) {
                    // console.log('stdout', stdout);
                    const result = await (0, promises_1.readFile)(`get_updates_${this.BOT_TOKEN}.json`);
                    const jsonResult = JSON.parse(result.toString());
                    res(jsonResult);
                }
            });
        });
    }
    /**
     * Returns group IDs from telegram bot
     *
     * @returns Promise<number[]>
     */
    getGroupIDs() {
        return new Promise((res) => {
            (0, child_process_1.exec)(`bash ${this.SCRIPT_DIR}telegram-get-updates.sh "${this.BOT_TOKEN}"`, async (err, stdout) => {
                if (!err) {
                    // console.log('stdout', stdout);
                    const result = await (0, promises_1.readFile)(`get_updates_${this.BOT_TOKEN}.json`);
                    const jsonResult = JSON.parse(result.toString());
                    const idSet = new Set([]);
                    jsonResult.result.forEach((v) => {
                        const chatID = v.message?.chat.id;
                        if (chatID && !idSet.has(chatID))
                            idSet.add(chatID);
                    });
                    const arrayOfID = [...idSet];
                    res(arrayOfID);
                }
            });
        });
    }
}
exports.default = TelegramBot;
