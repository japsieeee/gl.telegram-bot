var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { exec } from "child_process";
import { readFile } from "fs/promises";
import path from "path";
class TelegramBot {
    constructor(botToken) {
        this.BOT_TOKEN = '';
        this.SCRIPT_DIR = path.join(__dirname, 'scripts');
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
        const SCRIPT_PATH = path.join(this.SCRIPT_DIR, FILE_NAME);
        if (typeof channelID === 'string') {
            exec(`bash ${SCRIPT_PATH} "${this.BOT_TOKEN}" "${message}" "${channelID}"`);
        }
        if (typeof channelID === 'object') {
            for (const id of channelID) {
                exec(`bash ${SCRIPT_PATH} "${this.BOT_TOKEN}" "${message}" "${id}"`);
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
            exec(`bash ${this.SCRIPT_DIR}telegram-get-updates.sh "${this.BOT_TOKEN}"`, (err, stdout) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    // console.log('stdout', stdout);
                    const result = yield readFile(`get_updates_${this.BOT_TOKEN}.json`);
                    const jsonResult = JSON.parse(result.toString());
                    res(jsonResult);
                }
            }));
        });
    }
    /**
     * Returns group IDs from telegram bot
     *
     * @returns Promise<number[]>
     */
    getGroupIDs() {
        return new Promise((res) => {
            exec(`bash ${this.SCRIPT_DIR}telegram-get-updates.sh "${this.BOT_TOKEN}"`, (err, stdout) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    // console.log('stdout', stdout);
                    const result = yield readFile(`get_updates_${this.BOT_TOKEN}.json`);
                    const jsonResult = JSON.parse(result.toString());
                    const idSet = new Set([]);
                    jsonResult.result.forEach((v) => {
                        var _a;
                        const chatID = (_a = v.message) === null || _a === void 0 ? void 0 : _a.chat.id;
                        if (chatID && !idSet.has(chatID))
                            idSet.add(chatID);
                    });
                    const arrayOfID = [...idSet];
                    res(arrayOfID);
                }
            }));
        });
    }
}
export default TelegramBot;
