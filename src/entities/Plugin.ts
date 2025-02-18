import { Commands } from "../api/Commands";
import { Patcher } from "../api/PatcherApi";
import { Settings } from "../api/SettingsAPI";
import { Logger } from "../utils/Logger";

/**
 * Plugin class
 * You may pass a Settings Schema to have calls to
 * this.settings.get and this.settings.set validated and typed strongly
 */
export default class Plugin<SettingsSchema = any> {
    public readonly commands = new Commands(this.name);
    public readonly logger = new Logger(this.name);
    public readonly patcher = new Patcher(this.name);

    public constructor(public readonly settings: Settings<SettingsSchema>) { }

    public get name() {
        return this.constructor.name;
    }

    /**
     * The start method is called when your plugin is started
     */
    public start() {
        // nop
    }

    /**
     * The stop method is called when your plugin is stopped.
     * By default, this unregisters all commands and patches, so unless
     * you need to do more cleanup than that, there is no need to overwrite this.
     */
    public stop() {
        this.commands.unregisterAll();
        this.patcher.unpatchAll();
    }
}
