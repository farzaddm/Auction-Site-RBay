from dotenv import load_dotenv
import os
import smtplib
from fastapi import FastAPI
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import logging

# Load the environment variables from the .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

@app.get('/send-email')
def send_email(user_id, item_id, topic):
    user_name = "max Doe"  # You can replace this with actual user data
    item_name = "Laptop"
    item_price = 500

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
    msg['To'] = "farzad.d.m84@gmail.com"  # Replace with the actual recipient email
    msg['Subject'] = "RBay Auction Result"

    # Attach the HTML message to the email
    msg.attach(MIMEText(html_message, 'html'))

    # Get email and password from environment variables
    email = os.getenv("EMAIL_ADDRESS")
    password = os.getenv("EMAIL_PASSWORD")

    try:
        connection = smtplib.SMTP("smtp.gmail.com", 587)
        connection.starttls()

        # Log in to the SMTP server
        connection.login(email, password)

        # Send the email
        connection.sendmail(from_addr=email, to_addrs="farzad.d.m84@gmail.com", msg=msg.as_string())

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
