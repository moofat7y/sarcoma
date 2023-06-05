from fastapi import FastAPI,File,UploadFile,Request;
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras import models
import uvicorn
from utils.utilFun import read_file_as_image
app = FastAPI()


MODEL = models.load_model('model1.h5')

CLASS_NAME = ['Not effected','Effected']


origins = ["http://localhost:5173","http://localhost:5174"]
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=['*'],allow_headers=['*'])


@app.post('/predict')
async def predict(file : UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    predictions = MODEL.predict(image)[0][0]
    label = round(predictions)
    confidence = 0
    if predictions >= 0.5:
        confidence = predictions
    else:
        confidence = 1 - predictions 
    return {
        'Diagnose' : CLASS_NAME[label],
        'Confidence' :int(round(confidence,2) * 100)
    }
if __name__ == "__main__":
    uvicorn.run(app,host='localhost',port=8000)