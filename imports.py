from django.contrib.auth import get_user_model
from accounts.models import EmailVerification
from accounts.manager import CustomUserManager
import os 

User = get_user_model()

clear = lambda: os.system('cls')