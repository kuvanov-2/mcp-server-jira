import * as readline from 'node:readline';

export class StdioServerTransport {
  onLine(callback: (line: string) => void) {
    // 標準入力のエンコーディングをUTF-8に設定
    process.stdin.setEncoding('utf8');

    // 標準入力のバッファリングを無効化
    process.stdin.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          callback(line);
        }
      });
    });

    // エラーハンドリング
    process.stdin.on('error', (error) => {
      console.error('StdioServerTransport error:', error);
    });

    // 終了処理
    process.on('SIGTERM', () => {
      process.stdin.pause();
      process.exit(0);
    });
  }
}
