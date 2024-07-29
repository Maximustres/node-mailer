# node-mailer
Servicio NodeJs para el envio de emails

# run service docker
docker build -t node-mailer .
docker run -p 3000:3000 -e MAIL_USERNAME='' -e MAIL_PASSWORD='' -d node-mailer

# body request example
{ 
  "alias": "SENDER ALIAS", 
  "to": "to@example.com",
  "subject":"TESTING",
  "base64String":"BASE64 ENCODE" 
}
