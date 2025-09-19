import chalk from "chalk";

class Logger {
  info(message: string) {
    console.log(chalk.blue(`[INFO] ${message}`));
  }

  success(message: string) {
    console.log(chalk.green(`[SUCCESS] ${message}`));
  }

  warn(message: string) {
    console.log(chalk.yellow(`[WARN] ${message}`));
  }

  error(message: string) {
    console.log(chalk.red(`[ERROR] ${message}`));
  }

  debug(message: string) {
    console.log(chalk.magenta(`[DEBUG] ${message}`));
  }
}

export const logger = new Logger();
