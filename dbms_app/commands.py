from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Creates a superuser for the university database management system'

    def handle(self, *args, **options):
        if not User.objects.filter(username='dbadmin').exists():
            User.objects.create_superuser('dbadmin', 'admin@university.edu', 'admin123')
            self.stdout.write(self.style.SUCCESS('Superuser created successfully!'))
        else:
            self.stdout.write(self.style.WARNING('Superuser already exists'))