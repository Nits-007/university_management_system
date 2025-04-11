from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

from .models import (
    Management, ManagementPhone, Professor, ProfessorPhone, Department,
    Program, Class, Hostel, Student, TeachingAssistant, TeachingAssistantPhone,
    Batch, Lab, Library, Books, RecordBook, Sports, StudentSports,
    Gymkhana, GymkhanaEvents, Culture, CultureEvents, AntiRaggingCommittee,
    Complaints, TrainingPlacementCell, Companies, JobOffers, Internships,
    TrainingPrograms, StudentTraining, UserEntityPermission
)


class UserEntityPermissionSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = UserEntityPermission
        fields = ['id', 'user', 'username', 'entity_type', 'can_view', 'can_edit', 'can_delete', 'can_create']


class UserSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_superuser', 'permissions')
    def get_permissions(self, obj):
        permissions = UserEntityPermission.objects.filter(user=obj)
        return {
            perm.entity_type: {
                'can_view': perm.can_view,
                'can_create': perm.can_create,
                'can_edit': perm.can_edit,
                'can_delete': perm.can_delete
            } for perm in permissions
        }

class UserProfileSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_superuser', 'permissions')
    
    def get_permissions(self, obj):
        permissions = UserEntityPermission.objects.filter(user=obj)
        return {
            perm.entity_type: {
                'can_view': perm.can_view,
                'can_create': perm.can_create,
                'can_edit': perm.can_edit,
                'can_delete': perm.can_delete
            } for perm in permissions
        }

class RegisterSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['username','email','password','password_confirmation']
        wirte_only_fields = ['password']

    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password_confirmation']
        if password != password2 :
            raise serializers.ValidationError('Password did not match')
        if User.objects.filter(email=self.validated_data['email']).exists() :
            raise serializers.ValidationError('Email already exists')
        
        user = User.objects.create(email=self.validated_data['email'],username=self.validated_data['username'])
        user.set_password(self.validated_data['password'])
        user.save()
        return user


class ManagementPhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagementPhone
        fields = ['phone_no_id', 'emp', 'phone_no']


class ManagementSerializer(serializers.ModelSerializer):
    phones = ManagementPhoneSerializer(many=True, read_only=True)

    class Meta:
        model = Management
        fields = ['emp_id', 'emp_name', 'gender', 'phones']


class ProfessorPhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessorPhone
        fields = ['phone_no_id', 'prof', 'phone_no']


class ProfessorSerializer(serializers.ModelSerializer):
    phones = ProfessorPhoneSerializer(many=True, read_only=True)

    class Meta:
        model = Professor
        fields = ['prof_id', 'prof_name', 'age', 'gender', 'email_id', 'date_of_joining', 'salary', 'phones']


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['dept_no', 'name', 'no_of_programs', 'hod']


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['program_id', 'name', 'no_of_courses', 'fees', 'dept_no']


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['class_id', 'class_name', 'capacity', 'no_of_students']


class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = ['hostel_id', 'hostel_name', 'no_of_beds', 'type', 'warden']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'name', 'age', 'gender', 'program', 'hostel', 'class_field']


class TeachingAssistantPhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeachingAssistantPhone
        fields = ['phone_no_id', 'ta', 'phone_no']


class TeachingAssistantSerializer(serializers.ModelSerializer):
    phones = TeachingAssistantPhoneSerializer(many=True, read_only=True)

    class Meta:
        model = TeachingAssistant
        fields = ['ta_id', 'ta_name', 'age', 'gender', 'email_id', 'salary', 'date_of_joining', 'prof', 'phones']


class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ['batch_id', 'batch_name', 'mentor', 'class_field']


class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['lab_id', 'lab_name', 'instructor', 'lab_assistant']


class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ['library_id', 'name', 'seating_capacity', 'librarian']


class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ['isbn_no', 'book_name', 'author_name', 'price', 'published_year']


class RecordBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordBook
        fields = ['record_id', 'student', 'isbn_no', 'issued_date', 'return_date', 'late_fine']


class SportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sports
        fields = ['sport_id', 'sport_name', 'coach']


class StudentSportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSports
        fields = ['student', 'sport']


class GymkhanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gymkhana
        fields = ['gymkhana_id', 'name', 'president', 'vice_president', 'secretary']


class GymkhanaEventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GymkhanaEvents
        fields = ['event_id', 'event_name', 'gymkhana', 'event_date']


class CultureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Culture
        fields = ['culture_id', 'club_name', 'club_president', 'club_vice_president']


class CultureEventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CultureEvents
        fields = ['event_id', 'event_name', 'culture', 'event_date']


class AntiRaggingCommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AntiRaggingCommittee
        fields = ['committee_id', 'head_professor', 'student_representative']


class ComplaintsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaints
        fields = ['complaint_id', 'student', 'committee', 'complaint_details', 'complaint_date', 'resolution_status']


class TrainingPlacementCellSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPlacementCell
        fields = ['tpc_id', 'head_professor', 'office_location', 'contact_email', 'contact_phone']


class CompaniesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = ['company_id', 'company_name', 'industry_type', 'contact_person', 'contact_email', 'contact_phone']


class JobOffersSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOffers
        fields = ['offer_id', 'student', 'company', 'job_role', 'package', 'offer_date', 'status']


class InternshipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internships
        fields = ['internship_id', 'student', 'company', 'internship_role', 'stipend', 'duration_months', 'internship_start_date', 'internship_end_date']


class TrainingProgramsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPrograms
        fields = ['program_id', 'program_name', 'organized_by', 'start_date', 'end_date']


class StudentTrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTraining
        fields = ['student', 'program', 'completion_status', 'certificate_issued']
