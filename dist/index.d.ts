declare class TelegramBot {
    private BOT_TOKEN;
    private SCRIPT_DIR;
    constructor(botToken: string);
    /**
     * Sends a message to a group or channel
     * You can pass an array of group ids or a single group id
     *
     * @param {string} message
     * @param {string} channelID
     */
    sendMessage(message: string, channelID: string | string[]): void;
    /**
     * Returns recent updates from telegram bot
     *
     * @returns Promise<object>
     */
    getUpdates(): Promise<object>;
    /**
     * Returns group IDs from telegram bot
     *
     * @returns Promise<number[]>
     */
    getGroupIDs(): Promise<number[]>;
}
export default TelegramBot;
