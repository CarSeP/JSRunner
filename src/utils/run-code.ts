export function runCode(code: string): Promise<string> {
  const logs: string[] = [];

  const originalLog = console.log;

  console.log = (...args: unknown[]) => {
    logs.push(args.map(formatArg).join(' '));
  };

  return (async () => {
    try {
      const fn = new Function(code);
      const result = fn();
      if (result instanceof Promise) {
        await result;
      }
    } catch (e) {
      logs.push(formatError(e));
    } finally {
      console.log = originalLog;
    }
    return logs.join('\n');
  })();
}

function formatArg(arg: unknown): string {
  if (arg === null) return 'null';
  if (arg === undefined) return 'undefined';
  if (typeof arg === 'string') return arg;
  if (typeof arg === 'number' || typeof arg === 'boolean') return String(arg);
  try {
    return JSON.stringify(arg, null, 2);
  } catch {
    return String(arg);
  }
}

function formatError(e: unknown): string {
  if (e instanceof Error) {
    return `Error: ${e.message}`;
  }
  return `Error: ${String(e)}`;
}
