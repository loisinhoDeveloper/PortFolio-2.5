import os
from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail #Integrar Flask-Mail para que me puedan enviar correos electrónicos 
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from dotenv import load_dotenv  # Instalado para poder cargar el MAIL_USERNAME y MAIL_PASSWORD de la variable de entorno (.env)

load_dotenv()  # Esto carga las variables del archivo .env


# Configuración del entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Configuración de Flask-Mail Instalado para poder recibir correos de mi portFolio
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Cambiar según el servidor que uses
app.config['MAIL_PORT'] = 587  # Puerto SMTP
app.config['MAIL_USE_TLS'] = True  # Usar TLS
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Usa variables de entorno (.env) para mayor seguridad
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # Usa variables de entorno (.env)
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')  # Dirección de correo por defecto

mail = Mail(app)

# Agregar el admin
setup_admin(app)

# Agregar los comandos
setup_commands(app)

# Agregar los endpoints de la API con un prefijo "api"
app.register_blueprint(api, url_prefix='/api')

# Manejo de errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Ruta principal
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Ruta para archivos estáticos
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Evitar cache
    return response

# Iniciar el servidor
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
