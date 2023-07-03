import process from 'process';
import { runBootTasks } from './boot';

async function start() {
	await runBootTasks();
}

start().catch((e) => {
	process.exit();
});
