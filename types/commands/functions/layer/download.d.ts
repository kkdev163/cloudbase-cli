import { Command } from '../../common';
export declare class DownloadFileLayer extends Command {
    get options(): {
        cmd: string;
        options: {
            flags: string;
            desc: string;
        }[];
        desc: string;
    };
    execute(envId: any, options: any): Promise<void>;
}
