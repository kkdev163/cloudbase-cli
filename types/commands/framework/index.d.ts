import { Command } from '../common';
import { ICommandContext } from '../../types';
import { Logger } from '../../decorators';
export declare class FrameworkDeploy extends Command {
    get options(): {
        cmd: string;
        options: {
            flags: string;
            desc: string;
        }[];
        desc: string;
    };
    execute(ctx: ICommandContext, logger: Logger, params: any): Promise<void>;
}
export declare class FrameworkCompile extends Command {
    get options(): {
        cmd: string;
        options: {
            flags: string;
            desc: string;
        }[];
        desc: string;
    };
    execute(ctx: ICommandContext, logger: Logger, params: any): Promise<void>;
}
