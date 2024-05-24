from django.contrib.auth import get_user_model
from accounts.models import EmailVerification, Session
from counsellor.models import CounsellorType, Counsellor
from accounts.manager import CustomUserManager
import os 
import json

User = get_user_model()

clear = lambda: os.system('cls')