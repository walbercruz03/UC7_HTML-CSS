import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Carrega a chave do arquivo .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configura a API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Mensagem vazia"}), 400

    try:
        # Instrução para o Gemini se comportar como a Cinépolis
        instrucao = (
            "Você é o assistente oficial da Cinépolis. Responda apenas com HTML. "
            "Use sempre a estrutura: <div class='movie-card'>"
            "<h2 class='movie-title'>Título do Filme</h2>"
            "<p class='movie-desc'>Sinopse, Horários e Sala.</p></div>. "
            f"Usuário perguntou: {user_message}"
        )

        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(instrucao)
        
        try:
            return jsonify({"response": response.text})
        except Exception as e:
            print(f"Erro ao ler texto: {e}")
            return jsonify({"response": "<div class='movie-card'>O Google bloqueou esta resposta por segurança.</div>"})

    except Exception as e:
        print(f"ERRO NO SERVIDOR: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)