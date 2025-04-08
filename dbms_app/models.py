from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User


class UserEntityPermission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='entity_permissions')
    # Entity type options
    ENTITY_CHOICES = [
    ('Management', 'Management'),
    ('ManagementPhone', 'ManagementPhone'),
    ('Professor', 'Professor'),
    ('ProfessorPhone', 'ProfessorPhone'),
    ('Department', 'Department'),
    ('Program', 'Program'),
    ('Class', 'Class'),
    ('Hostel', 'Hostel'),
    ('Student', 'Student'),
    ('TeachingAssistant', 'TeachingAssistant'),
    ('TeachingAssistantPhone', 'TeachingAssistantPhone'),
    ('Batch', 'Batch'),
    ('Lab', 'Lab'),
    ('Library', 'Library'),
    ('Books', 'Books'),
    ('RecordBook', 'RecordBook'),
    ('Sports', 'Sports'),
    ('StudentSports', 'StudentSports'),
    ('Gymkhana', 'Gymkhana'),
    ('GymkhanaEvents', 'GymkhanaEvents'),
    ('Culture', 'Culture'),
    ('CultureEvents', 'CultureEvents'),
    ('AntiRaggingCommittee', 'AntiRaggingCommittee'),
    ('Complaints', 'Complaints'),
    ('TrainingPlacementCell', 'TrainingPlacementCell'),
    ('Companies', 'Companies'),
    ('JobOffers', 'JobOffers'),
    ('Internships', 'Internships'),
    ('TrainingPrograms', 'TrainingPrograms'),
    ('StudentTraining', 'StudentTraining')

]
    entity_type = models.CharField(max_length=100, choices=ENTITY_CHOICES)
    can_view = models.BooleanField(default=False)
    can_edit = models.BooleanField(default=False)
    can_delete = models.BooleanField(default=False)
    can_create = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('user', 'entity_type')


class Management(models.Model):
    emp_id = models.IntegerField(primary_key=True)
    emp_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)

    def __str__(self):
        return self.emp_name


class ManagementPhone(models.Model):
    phone_no_id = models.AutoField(primary_key=True)
    emp = models.ForeignKey(Management, on_delete=models.CASCADE, related_name='phones')
    phone_no = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.emp.emp_name}'s phone: {self.phone_no}"


class Professor(models.Model):
    prof_id = models.IntegerField(primary_key=True)
    prof_name = models.CharField(max_length=50)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    email_id = models.EmailField(max_length=100)
    date_of_joining = models.DateField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.prof_name


class ProfessorPhone(models.Model):
    phone_no_id = models.AutoField(primary_key=True)
    prof = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='phones')
    phone_no = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.prof.prof_name}'s phone: {self.phone_no}"


class Department(models.Model):
    dept_no = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    no_of_programs = models.IntegerField()
    hod = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='departments_headed')

    def __str__(self):
        return self.name


class Program(models.Model):
    program_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    no_of_courses = models.IntegerField()
    fees = models.DecimalField(max_digits=10, decimal_places=2)
    dept_no = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='programs')

    def __str__(self):
        return self.name


class Class(models.Model):
    class_id = models.IntegerField(primary_key=True)
    class_name = models.CharField(max_length=50)
    capacity = models.IntegerField()
    no_of_students = models.IntegerField()

    def __str__(self):
        return self.class_name


class Hostel(models.Model):
    hostel_id = models.IntegerField(primary_key=True)
    hostel_name = models.CharField(max_length=50)
    no_of_beds = models.IntegerField()
    type = models.CharField(max_length=20)  
    warden = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='hostels_managed')

    def __str__(self):
        return self.hostel_name


class Student(models.Model):
    student_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='students')
    hostel = models.ForeignKey(Hostel, on_delete=models.SET_NULL, null=True, related_name='residents')
    class_field = models.ForeignKey(Class, on_delete=models.SET_NULL, null=True, related_name='students', db_column='class_id')

    def __str__(self):
        return self.name


class TeachingAssistant(models.Model):
    ta_id = models.IntegerField(primary_key=True)
    ta_name = models.CharField(max_length=50)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    email_id = models.EmailField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    date_of_joining = models.DateField()
    prof = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='teaching_assistants')

    def __str__(self):
        return self.ta_name


class TeachingAssistantPhone(models.Model):
    phone_no_id = models.AutoField(primary_key=True)
    ta = models.ForeignKey(TeachingAssistant, on_delete=models.CASCADE, related_name='phones')
    phone_no = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.ta.ta_name}'s phone: {self.phone_no}"


class Batch(models.Model):
    batch_id = models.IntegerField(primary_key=True)
    batch_name = models.CharField(max_length=50)
    mentor = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='mentored_batches')
    class_field = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='batches', db_column='class_id')

    def __str__(self):
        return self.batch_name


class Lab(models.Model):
    lab_id = models.IntegerField(primary_key=True)
    lab_name = models.CharField(max_length=50)
    instructor = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='labs_instructed')
    lab_assistant = models.ForeignKey(TeachingAssistant, on_delete=models.SET_NULL, null=True, related_name='labs_assisted')

    def __str__(self):
        return self.lab_name


class Library(models.Model):
    library_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    seating_capacity = models.IntegerField()
    librarian = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='libraries_managed')

    def __str__(self):
        return self.name


class Books(models.Model):
    isbn_no = models.CharField(max_length=20, primary_key=True)
    book_name = models.CharField(max_length=100)
    author_name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    published_year = models.IntegerField()

    def __str__(self):
        return self.book_name

    class Meta:
        verbose_name_plural = "Books"


class RecordBook(models.Model):
    record_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='book_records')
    isbn_no = models.ForeignKey(Books, on_delete=models.CASCADE, related_name='records')
    issued_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)
    late_fine = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.student.name} - {self.isbn_no.book_name}"


class Sports(models.Model):
    sport_id = models.IntegerField(primary_key=True)
    sport_name = models.CharField(max_length=50, unique=True)
    coach = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='sports_coached')

    def __str__(self):
        return self.sport_name

    class Meta:
        verbose_name_plural = "Sports"


class StudentSports(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    sport = models.ForeignKey(Sports, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['student', 'sport']

    def __str__(self):
        return f"{self.student.name} plays {self.sport.sport_name}"


class Gymkhana(models.Model):
    gymkhana_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    president = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='gymkhana_president')
    vice_president = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, related_name='gymkhana_vice_president')
    secretary = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, related_name='gymkhana_secretary')

    def __str__(self):
        return self.name


class GymkhanaEvents(models.Model):
    event_id = models.IntegerField(primary_key=True)
    event_name = models.CharField(max_length=100)
    gymkhana = models.ForeignKey(Gymkhana, on_delete=models.CASCADE, related_name='events')
    event_date = models.DateField()

    def __str__(self):
        return self.event_name

    class Meta:
        verbose_name = "Gymkhana Event"
        verbose_name_plural = "Gymkhana Events"


class Culture(models.Model):
    culture_id = models.IntegerField(primary_key=True)
    club_name = models.CharField(max_length=50, unique=True)
    club_president = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, related_name='culture_president')
    club_vice_president = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, related_name='culture_vice_president')

    def __str__(self):
        return self.club_name


class CultureEvents(models.Model):
    event_id = models.IntegerField(primary_key=True)
    event_name = models.CharField(max_length=100)
    culture = models.ForeignKey(Culture, on_delete=models.CASCADE, related_name='events')
    event_date = models.DateField()

    def __str__(self):
        return self.event_name

    class Meta:
        verbose_name = "Culture Event"
        verbose_name_plural = "Culture Events"


class AntiRaggingCommittee(models.Model):
    committee_id = models.IntegerField(primary_key=True)
    head_professor = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='headed_committees')
    student_representative = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, related_name='represented_committees')

    def __str__(self):
        return f"Anti-Ragging Committee {self.committee_id}"

    class Meta:
        verbose_name_plural = "Anti-Ragging Committees"


class Complaints(models.Model):
    RESOLUTION_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Resolved', 'Resolved'),
        ('Dismissed', 'Dismissed'),
    ]
    
    complaint_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='complaints')
    committee = models.ForeignKey(AntiRaggingCommittee, on_delete=models.CASCADE, related_name='complaints')
    complaint_details = models.TextField()
    complaint_date = models.DateField()
    resolution_status = models.CharField(max_length=10, choices=RESOLUTION_STATUS_CHOICES)

    def __str__(self):
        return f"Complaint {self.complaint_id} by {self.student.name}"

    class Meta:
        verbose_name_plural = "Complaints"


class TrainingPlacementCell(models.Model):
    tpc_id = models.IntegerField(primary_key=True)
    head_professor = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='headed_tpc')
    office_location = models.CharField(max_length=100)
    contact_email = models.EmailField(max_length=50, unique=True)
    contact_phone = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return f"Training and Placement Cell {self.tpc_id}"

    class Meta:
        verbose_name = "Training & Placement Cell"
        verbose_name_plural = "Training & Placement Cells"


class Companies(models.Model):
    company_id = models.IntegerField(primary_key=True)
    company_name = models.CharField(max_length=100, unique=True)
    industry_type = models.CharField(max_length=50)
    contact_person = models.CharField(max_length=100)
    contact_email = models.EmailField(max_length=50)
    contact_phone = models.CharField(max_length=15)

    def __str__(self):
        return self.company_name

    class Meta:
        verbose_name_plural = "Companies"


class JobOffers(models.Model):
    STATUS_CHOICES = [
        ('Accepted', 'Accepted'),
        ('Pending', 'Pending'),
        ('Rejected', 'Rejected'),
    ]
    
    offer_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='job_offers')
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, related_name='job_offers')
    job_role = models.CharField(max_length=100)
    package = models.DecimalField(max_digits=10, decimal_places=2)
    offer_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.student.name} - {self.company.company_name} ({self.job_role})"

    class Meta:
        verbose_name = "Job Offer"
        verbose_name_plural = "Job Offers"


class Internships(models.Model):
    internship_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='internships')
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, related_name='internships')
    internship_role = models.CharField(max_length=100)
    stipend = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    duration_months = models.IntegerField()
    internship_start_date = models.DateField()
    internship_end_date = models.DateField()

    def __str__(self):
        return f"{self.student.name} at {self.company.company_name}"

    class Meta:
        verbose_name_plural = "Internships"


class TrainingPrograms(models.Model):
    program_id = models.IntegerField(primary_key=True)
    program_name = models.CharField(max_length=100)
    organized_by = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.program_name

    class Meta:
        verbose_name = "Training Program"
        verbose_name_plural = "Training Programs"


class StudentTraining(models.Model):
    COMPLETION_STATUS_CHOICES = [
        ('Completed', 'Completed'),
        ('Ongoing', 'Ongoing'),
        ('Not Completed', 'Not Completed'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    program = models.ForeignKey(TrainingPrograms, on_delete=models.CASCADE)
    completion_status = models.CharField(max_length=15, choices=COMPLETION_STATUS_CHOICES)
    certificate_issued = models.BooleanField(default=False)

    class Meta:
        unique_together = ['student', 'program']

    def __str__(self):
        return f"{self.student.name} - {self.program.program_name}"
