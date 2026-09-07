from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
class Handler(SimpleHTTPRequestHandler):
 def do_GET(self):
  p=urlsplit(self.path).path
  if p=='/admin' or p.startswith('/admin/'):self.path='/app-shell.html'
  elif p.startswith('/proyectos/'):self.path='/project-gallery.html'
  elif p=='/proyectos':self.path='/proyectos.html'
  return super().do_GET()
 def log_message(self,*args):pass
import os
os.chdir(Path(__file__).resolve().parents[2]/'dist')
ThreadingHTTPServer(('127.0.0.1',4173),Handler).serve_forever()
