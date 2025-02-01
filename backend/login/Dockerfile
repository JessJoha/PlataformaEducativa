
FROM python:3.9-slim


WORKDIR /app


COPY . .

COPY .env .env

RUN pip install --no-cache-dir -r requirements.txt


EXPOSE 3006


CMD ["python", "app.py"]
