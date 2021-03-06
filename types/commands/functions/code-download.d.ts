import { Command } from '../common';
export declare class CodeDownload extends Command {
    get options(): {
        cmd: string;
        options: {
            flags: string;
            desc: string;
        }[];
        desc: string;
    };
    execute(ctx: any, params: any): Promise<void>;
}
