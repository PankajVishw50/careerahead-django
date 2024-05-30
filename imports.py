from django.contrib.auth import get_user_model
from accounts.models import EmailVerification, Session
from counsellor.models import CounsellorType, Counsellor, Review, Appointment
from accounts.manager import CustomUserManager
import os 
import json
from utils.user import get_me_serialized, get_serialized_model

User = get_user_model()

clear = lambda: os.system('cls')