This is a website version of the university management system where users can basically manage almost all the data which are required to manage in a university eg: Teachers, Library, Students, etc.
There will also be a DB Admin who have the power to grant/revoke access to any user to limit his/her control over the data.

Steps to use the website on your local machine: 

1: Clone the repository to your local machine

2: Steps to run the website
    Open the terminal in the root directory:
    Run all these commands in terminal
      1: pip install -r requirements.txt   => Installs all the required dependencies
      2: python manage.py makemigrations
      3: python manage.py migrate
      4: python manage.py createsuperuser  => To create the superuser (Database Administrator) => give username as "dbadmin" and password as "admin123"
      4: python manage.py runserver   => This will run the backend on your local host now copy that link
      
      
