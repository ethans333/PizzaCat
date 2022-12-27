from flask import Flask, render_template, request, jsonify, make_response
import pickle
from PIL import Image
import base64
from io import BytesIO
import numpy as np

print(io.__all__)

model = pickle.load(open('./models/model_quickdraw.pkl', 'rb'))

def clean_image(image):
   size = 32, 32
   image = image.resize(size).convert('L')
   image = np.asarray(image)
   image = image.ravel()
   return image

# Web App

app = Flask(__name__)
app.debug = True

@app.route("/")
def index():
   return render_template("index.html")

@app.route("/get-data", methods=['POST'])
def get_data():
   req = request.get_json()

   bytes_decoded = base64.b64decode(req.get('image_data'))

   image = Image.open(BytesIO(bytes_decoded))
   image = clean_image(image)

   prediction = model.predict([image])[0]

   res = make_response(jsonify({'prediction': prediction}), 200)

   return res


if __name__ == "__main__":
    app.run()

