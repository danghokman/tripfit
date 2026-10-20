"""개발용 로컬 서버: 수정한 파일이 바로 보이도록 브라우저 캐시를 끕니다.

사용법:  python3 serve.py        → http://localhost:8766
"""
import functools
import http.server
import os


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()


if __name__ == '__main__':
    root = os.path.dirname(os.path.abspath(__file__))
    port = 8766
    print(f'TripFit 개발 서버: http://localhost:{port}  (종료: Ctrl+C)')
    http.server.ThreadingHTTPServer(('', port), functools.partial(NoCacheHandler, directory=root)).serve_forever()
