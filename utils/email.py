
from django.conf import settings
from django.core.mail import EmailMessage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_mail(
        to,
        subject,
        text,
        html,
):
    
    email_message = EmailMessage(
        subject,
        '',
        settings.EMAIL_HOST_USER,
        to
    )

    msg = MIMEMultipart('alternative')
    plain_msg = MIMEText(text, 'plain')
    html_msg = MIMEText(html, 'html')

    msg.attach(plain_msg)
    msg.attach(html_msg)

    email_message.attach(msg)

    email_message.send(fail_silently=False)

    return email_message

