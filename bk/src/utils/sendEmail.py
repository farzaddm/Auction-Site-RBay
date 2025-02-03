from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
import smtplib
import logging
import os
import requests

# ==========================================================================
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

@app.get('/send-email')
def send_email(user_id, item_id, topic):
    # Fetch user data from REST API
    user_response = requests.get(f"http://localhost:3000/api/users/{user_id}")
    print(user_response.status_code)
    if user_response.status_code != 200:
        raise HTTPException(status_code=400, detail="User not found")
    user_data = user_response.json()['data']
    print(user_data)
    user_name = user_data['name']
    user_email = user_data['email']

    # Fetch item data from REST API
    item_response = requests.get(f"http://localhost:3000/api/items/{item_id}")
    if item_response.status_code != 200:
        raise HTTPException(status_code=400, detail="Item not found")
    item_data = item_response.json()['data']
    item_name = item_data['name']
    item_price = item_data['price']

    # HTML message template
    html_message = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #E2F1E7; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #243642; text-align: center;">RBay Auction</h2>
          <p style="font-size: 1.2em; color: #387478;">Hi <strong>{user_name}</strong>,</p>
          <p style="font-size: 1.1em; color: #387478;">Congratulations! You have won the auction for the <em>{item_name}</em> item for <strong>${item_price}</strong>!</p>
          <p style="font-size: 1.1em; color: #387478;">Thank you for using RBay!</p>
          <p style="font-size: 1.1em; color: #387478;">Best regards,<br><i>The RBay Team</i></p>
          <footer style="margin-top: 20px; text-align: center;">
            <p style="font-size: 0.8em; color: #629584;">This is an automated email. Do not reply.</p>
          </footer>
        </div>
      </body>
    </html>
    """

    # Define the message
    msg = MIMEMultipart()
    msg['From'] = os.getenv("EMAIL_ADDRESS")
    msg['To'] = user_email
    msg['Subject'] = "RBay Auction Result"

    # Attach the HTML message to the email
    msg.attach(MIMEText(html_message, 'html'))

    # Get email and password from environment variables
    sender_email = os.getenv("EMAIL_ADDRESS")
    password = os.getenv("EMAIL_PASSWORD")

    try:
        connection = smtplib.SMTP("smtp.gmail.com", 587)
        connection.starttls()

        # Log in to the SMTP server
        connection.login(sender_email, password)

        # Send the email
        connection.sendmail(from_addr=sender_email, to_addrs=user_email, msg=msg.as_string())

        logging.info("Email sent successfully")
        return {"message": "HTML Email sent successfully"}
    except smtplib.SMTPAuthenticationError:
        logging.error("Authentication failed. Check your email and password.")
        return {"error": "Authentication failed. Check your email and password."}
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")
        return {"error": str(e)}
    finally:
        connection.quit()
