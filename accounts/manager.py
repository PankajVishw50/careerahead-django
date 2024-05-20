
from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):

    def create_user(self, email, username, password, **kwargs):
        
        if not (email and username):
            return ValueError('email and username field requried: cannot be null')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **kwargs)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, username, password, **kwargs):
        kwargs.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **kwargs)

