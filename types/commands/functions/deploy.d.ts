import { Command } from '../common';
import { Logger } from '../../decorators';
export declare class FunctionDeploy extends Command {
    get options(): {
        cmd: string;
        options: {
            flags: string;
            desc: string;
        }[];
        desc: string;
    };
    execute(ctx: any, params: any, log: Logger): Promise<void>;
    printSuccessTips(envId: string, log?: Logger): void;
    genApiGateway(envId: string, name: string): Promise<void>;
    deployAllFunction(options: any): Promise<void>;
}
