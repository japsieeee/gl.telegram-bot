import { exec } from "child_process";
import { readFile } from "fs/promises";
import path from "path";

class TelegramBot {
    private BOT_TOKEN: string = '';
    private SCRIPT_DIR: string = path.join(__dirname, 'scripts');

    constructor(botToken: string) {
        this.BOT_TOKEN = botToken;
    }

    /**
     * Sends a message to a group or channel
     * You can pass an array of group ids or a single group id
     * 
     * @param {string} message 
     * @param {string} channelID 
     */
    public sendMessage(message: string, channelID: string | string[]) {
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
    public getUpdates(): Promise<object> {
        return new Promise((res): any => {
            exec(`bash ${this.SCRIPT_DIR}telegram-get-updates.sh "${this.BOT_TOKEN}"`, async (err, stdout) => {
                if (!err) {
                    // console.log('stdout', stdout);
    
                    const result = await readFile(`get_updates_${this.BOT_TOKEN}.json`);
                    const jsonResult = JSON.parse(result.toString()) as unknown as any;
                    
                    res(jsonResult);
                }
            });
        })
    }

    /**
     * Returns group IDs from telegram bot
     * 
     * @returns Promise<number[]>
     */
    public getGroupIDs(): Promise<number[]> {
        return new Promise((res): void | Promise<number[]> => {
            exec(`bash ${this.SCRIPT_DIR}telegram-get-updates.sh "${this.BOT_TOKEN}"`, async (err, stdout) => {
                if (!err) {
                    // console.log('stdout', stdout);
    
                    const result = await readFile(`get_updates_${this.BOT_TOKEN}.json`);
                    const jsonResult = JSON.parse(result.toString()) as unknown as any;
                    const idSet = new Set<number>([]);
    
                    jsonResult.result.forEach((v: any) => {
                        const chatID = v.message?.chat.id;
    
                        if (chatID && !idSet.has(chatID)) idSet.add(chatID)
                    })
    
                    const arrayOfID = [...idSet];
                    res(arrayOfID);
                }
            });
        })
    }
}

export default TelegramBot;