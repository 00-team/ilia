import multiprocessing

chdir = '/ilia/'
# workers = multiprocessing.cpu_count() * 2 + 1
threads = multiprocessing.cpu_count() * 2 + 1
wsgi_app = 'main:app'
proc_name = 'ilia gun'
worker_class = 'uvicorn.workers.UvicornWorker'
venv = '/ilia/.env/bin/activate'
bind = 'unix:///usr/share/nginx/sockets/ilia.sock'
loglevel = 'info'
accesslog = '/var/log/ilia/access.log'
acceslogformat = '%(h)s %(l)s %(u)s %(t)s %(r)s %(s)s %(b)s %(f)s %(a)s'
errorlog = '/var/log/ilia/error.log'
