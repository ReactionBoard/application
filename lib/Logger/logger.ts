import chalk from 'chalk';
import { IfAny } from 'mongoose';

export class Logger {
    public info(ctx: string): void {
        console.log(
            chalk.bold.green('[info] |'),
            chalk.blue(ctx)
        );
    }

    public warn(ctx: string): void {
        console.log(
            chalk.bold.yellow('[warn] |'),
            chalk.bgYellow(ctx)
        );
    }

    public error(ctx: string, error?: Error | any): void {
        if (!error) {
            console.log(
                chalk.bold.red('[error] |'),
                chalk.bgRed(ctx)
            );

            return;
        }

        console.log(
            chalk.bold.red('[error] |'),
            chalk.bgRed(ctx),
            error
        );
    }
}