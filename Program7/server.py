from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class MyHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()

    def do_GET(self):
        if self.path == "/users":
            users = [
                {"id": 1, "name": "Ankith", "role": "Software Developer"},
                {"id": 2, "name": "Sara", "role": "Designer"},
                {"id": 3, "name": "Mike", "role": "Tester"},
            ]
            self._set_headers()
            self.wfile.write(json.dumps(users).encode())

    def do_POST(self):
        if self.path == "/add-user":
            content_length = int(self.headers["Content-Length"])
            post_data = self.rfile.read(content_length)
            user = json.loads(post_data)

            # Normally you'd save to DB, but here we just echo back with an ID
            user["id"] = 999
            self._set_headers()
            self.wfile.write(json.dumps({"status": "success", "user": user}).encode())

server = HTTPServer(("localhost", 8000), MyHandler)
print("Server running at http://localhost:8000")
server.serve_forever()
