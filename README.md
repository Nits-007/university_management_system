This is a website version of the university management system where users can basically manage almost all the data which are required to manage in a university eg: Teachers, Library, Students, etc.
There will also be a DB Admin who have the power to grant/revoke access to any user to limit his/her control over the data.

Steps to use the website on your local machine: 

Clone the repository to your local machine

Steps to run the website
Open the terminal in the root directory
    
Run all these commands in terminal
    
pip install -r requirements.txt   => Installs all the required dependencies
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  => To create the superuser (Database Administrator) => give username as "dbadmin" and password as "admin123"
python manage.py runserver   => This will run the backend on your local host now copy that link
      
      
