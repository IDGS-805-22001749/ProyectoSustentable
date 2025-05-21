from flask import Flask, render_template, request, jsonify
import cohere

app = Flask(__name__)

co = cohere.Client("yJVc01ZLnB3eH1fw4SCCQmaQBvOZg2ZIQEpX5At5") 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    mensaje = data.get('mensaje', '')

    respuesta = co.generate(
        model="command-r-plus",
        prompt=mensaje,
        max_tokens=300,
        temperature=0.7
    )

    texto = respuesta.generations[0].text.strip()
    return jsonify({"respuesta": texto})

if __name__ == '__main__':
    app.run(debug=True)
