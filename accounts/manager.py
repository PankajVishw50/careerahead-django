
from django.contrib.auth.models import BaseUserManager
from django.apps import apps
from utils.datetime import get_future_datetime
from careerahead.configs import EMAIL_VERIFICATION_EXPIRY_VALIDITY


class CustomUserManager(BaseUserManager):

    def create_user(self, email, username, password, verified=False, **kwargs):
        
        if not (email and username):
            return ValueError('email and username field requried: cannot be null')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **kwargs)
        user.set_password(password)
        user.save()

        # Email verification 
        email_v = apps.get_model('accounts.EmailVerification').objects.create(
            user=user,
            verified=verified,
            expiry_date=get_future_datetime(EMAIL_VERIFICATION_EXPIRY_VALIDITY),
        )

        return user
    
    def create_superuser(self, email, username, password, **kwargs):
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('verified', True)

        return self.create_user(email, username, password, **kwargs)
        

    def create_counsellor(self, email, username, password, **extra_fields):
        from counsellor.models import Counsellor

        user = self.create_user(email, username, password, verified=True, is_counsellor=True)
        counsellor = Counsellor.objects.create(user=user, **extra_fields)
        counsellor.save()

        return counsellor

