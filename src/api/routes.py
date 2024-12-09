"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_mail import Message, mail

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/send_email', methods=['POST']) #recibe una solicitud POST con un cuerpo en formato JSON que contiene la dirección de correo y el contenido del mensaje.
def send_email():
    data = request.get_json()  # Esperamos los datos en formato JSON
    
    # Validamos los datos
    if not data or 'email' not in data or 'contenido' not in data:
        return jsonify({'error': 'Faltan datos para enviar el correo'}), 400

    # Crear el mensaje de correo
    msg = Message(
        'Nuevo mensaje de contacto',  # Asunto
        recipients=[os.getenv('MAIL_USERNAME')],  # El destinatario, puedes agregar más
        body=data['contenido'],  # Cuerpo del mensaje
        sender=data['email']  # Remitente (dirección que mandó el mensaje)
    )

    try:
        mail.send(msg)  # Enviar el correo
        return jsonify({'message': 'Correo enviado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

