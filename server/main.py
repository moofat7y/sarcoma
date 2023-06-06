from fastapi import FastAPI,File,UploadFile,Request;
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras import models
import uvicorn
from utils.utilFun import read_file_as_image
app = FastAPI()


MODEL = models.load_model('model1.h5')

CLASS_NAME = ['Not effected','Effected']


origins = ["http://localhost:5173","http://localhost:5174","https://sarcoma.vercel.app"]
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=['*'],allow_headers=['*'])


@app.post('/predict')
async def predict(file : UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    predictions = MODEL.predict(image)[0][0]
    label = round(predictions)

    return {
        'Diagnose' : CLASS_NAME[label],
        'Confidence' :round(float(predictions),6)
    }
if __name__ == "__main__":
    uvicorn.run(app,host='localhost',port=8000)