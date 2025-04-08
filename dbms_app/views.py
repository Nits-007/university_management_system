from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import UserEntityPermission
from .serializers import UserEntityPermissionSerializer, UserProfileSerializer
from .permissions import IsSuperUser, has_entity_permission
from django.contrib.auth.models import User


from .models import (
    Management, ManagementPhone, Professor, ProfessorPhone, Department,
    Program, Class, Hostel, Student, TeachingAssistant, TeachingAssistantPhone,
    Batch, Lab, Library, Books, RecordBook, Sports, StudentSports,
    Gymkhana, GymkhanaEvents, Culture, CultureEvents, AntiRaggingCommittee,
    Complaints, TrainingPlacementCell, Companies, JobOffers, Internships,
    TrainingPrograms, StudentTraining
)
from .serializers import (
    ManagementSerializer, ManagementPhoneSerializer, ProfessorSerializer,
    ProfessorPhoneSerializer, DepartmentSerializer, ProgramSerializer,
    ClassSerializer, HostelSerializer, RegisterSerializer, StudentSerializer,
    TeachingAssistantSerializer, TeachingAssistantPhoneSerializer,
    BatchSerializer, LabSerializer, LibrarySerializer, BooksSerializer,
    RecordBookSerializer, SportsSerializer, StudentSportsSerializer,
    GymkhanaSerializer, GymkhanaEventsSerializer, CultureSerializer,
    CultureEventsSerializer, AntiRaggingCommitteeSerializer,
    ComplaintsSerializer, TrainingPlacementCellSerializer, CompaniesSerializer,
    JobOffersSerializer, InternshipsSerializer, TrainingProgramsSerializer,
    StudentTrainingSerializer, UserSerializer
)



@api_view(['GET'])
@permission_classes([IsAuthenticated, IsSuperUser])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsSuperUser])
def permission_list(request):
    if request.method == 'GET':
        permissions = UserEntityPermission.objects.all()
        serializer = UserEntityPermissionSerializer(permissions, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UserEntityPermissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, IsSuperUser])
def permission_detail(request, pk):
    permission = get_object_or_404(UserEntityPermission, pk=pk)
    
    if request.method == 'GET':
        serializer = UserEntityPermissionSerializer(permission)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = UserEntityPermissionSerializer(permission, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        permission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsSuperUser])
def user_permissions(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    permissions = UserEntityPermission.objects.filter(user=user)
    serializer = UserEntityPermissionSerializer(permissions, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([AllowAny])
def registerUser(request):
    if request.method == 'POST' :
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)   
    else :
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


# Management views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Management')])
def management_list(request):
    if request.method == 'GET':
        management = Management.objects.all()
        serializer = ManagementSerializer(management, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Management')])
def management_detail(request, pk):
    management = get_object_or_404(Management, pk=pk)
    
    if request.method == 'GET':
        serializer = ManagementSerializer(management)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ManagementSerializer(management, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        management.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ManagementPhone views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('ManagementPhone')])
def management_phone_list(request):
    if request.method == 'GET':
        phones = ManagementPhone.objects.all()
        serializer = ManagementPhoneSerializer(phones, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ManagementPhoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('ManagementPhone')])
def management_phone_detail(request, pk):
    phone = get_object_or_404(ManagementPhone, pk=pk)
    
    if request.method == 'GET':
        serializer = ManagementPhoneSerializer(phone)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ManagementPhoneSerializer(phone, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        phone.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Professor views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Professor')])
def professor_list(request):
    if request.method == 'GET':
        professors = Professor.objects.all()
        serializer = ProfessorSerializer(professors, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProfessorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Professor')])
def professor_detail(request, pk):
    professor = get_object_or_404(Professor, pk=pk)
    
    if request.method == 'GET':
        serializer = ProfessorSerializer(professor)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ProfessorSerializer(professor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        professor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ProfessorPhone views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('ProfessorPhone')])
def professor_phone_list(request):
    if request.method == 'GET':
        phones = ProfessorPhone.objects.all()
        serializer = ProfessorPhoneSerializer(phones, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProfessorPhoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('ProfessorPhone')])
def professor_phone_detail(request, pk):
    phone = get_object_or_404(ProfessorPhone, pk=pk)
    
    if request.method == 'GET':
        serializer = ProfessorPhoneSerializer(phone)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ProfessorPhoneSerializer(phone, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        phone.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Department views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Department')])
def department_list(request):
    if request.method == 'GET':
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Department')])
def department_detail(request, pk):
    department = get_object_or_404(Department, pk=pk)
    
    if request.method == 'GET':
        serializer = DepartmentSerializer(department)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = DepartmentSerializer(department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Program views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Program')])
def program_list(request):
    if request.method == 'GET':
        programs = Program.objects.all()
        serializer = ProgramSerializer(programs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProgramSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Program')])
def program_detail(request, pk):
    program = get_object_or_404(Program, pk=pk)
    
    if request.method == 'GET':
        serializer = ProgramSerializer(program)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ProgramSerializer(program, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        program.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Class views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Class')])
def class_list(request):
    if request.method == 'GET':
        classes = Class.objects.all()
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Class')])
def class_detail(request, pk):
    class_obj = get_object_or_404(Class, pk=pk)
    
    if request.method == 'GET':
        serializer = ClassSerializer(class_obj)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ClassSerializer(class_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        class_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Hostel views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Hostel')])
def hostel_list(request):
    if request.method == 'GET':
        hostels = Hostel.objects.all()
        serializer = HostelSerializer(hostels, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = HostelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Hostel')])
def hostel_detail(request, pk):
    hostel = get_object_or_404(Hostel, pk=pk)
    
    if request.method == 'GET':
        serializer = HostelSerializer(hostel)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = HostelSerializer(hostel, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        hostel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Student views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Student')])
def student_list(request):
    if request.method == 'GET':
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Student')])
def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)
    
    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# TeachingAssistant views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('TeachingAssistant')])
def teaching_assistant_list(request):
    if request.method == 'GET':
        teaching_assistants = TeachingAssistant.objects.all()
        serializer = TeachingAssistantSerializer(teaching_assistants, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TeachingAssistantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('TeachingAssistant')])
def teaching_assistant_detail(request, pk):
    teaching_assistant = get_object_or_404(TeachingAssistant, pk=pk)
    
    if request.method == 'GET':
        serializer = TeachingAssistantSerializer(teaching_assistant)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TeachingAssistantSerializer(teaching_assistant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        teaching_assistant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# TeachingAssistantPhone views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('TeachingAssistantPhone')])
def teaching_assistant_phone_list(request):
    if request.method == 'GET':
        phones = TeachingAssistantPhone.objects.all()
        serializer = TeachingAssistantPhoneSerializer(phones, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TeachingAssistantPhoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('TeachingAssistantPhone')])
def teaching_assistant_phone_detail(request, pk):
    phone = get_object_or_404(TeachingAssistantPhone, pk=pk)
    
    if request.method == 'GET':
        serializer = TeachingAssistantPhoneSerializer(phone)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TeachingAssistantPhoneSerializer(phone, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        phone.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Batch views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Batch')])
def batch_list(request):
    if request.method == 'GET':
        batches = Batch.objects.all()
        serializer = BatchSerializer(batches, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = BatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Batch')])
def batch_detail(request, pk):
    batch = get_object_or_404(Batch, pk=pk)
    
    if request.method == 'GET':
        serializer = BatchSerializer(batch)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = BatchSerializer(batch, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        batch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Lab views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Lab')])
def lab_list(request):
    if request.method == 'GET':
        labs = Lab.objects.all()
        serializer = LabSerializer(labs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = LabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Lab')])
def lab_detail(request, pk):
    lab = get_object_or_404(Lab, pk=pk)
    
    if request.method == 'GET':
        serializer = LabSerializer(lab)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = LabSerializer(lab, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        lab.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Library views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Library')])
def library_list(request):
    if request.method == 'GET':
        libraries = Library.objects.all()
        serializer = LibrarySerializer(libraries, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = LibrarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Library')])
def library_detail(request, pk):
    library = get_object_or_404(Library, pk=pk)
    
    if request.method == 'GET':
        serializer = LibrarySerializer(library)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = LibrarySerializer(library, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        library.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Books views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Books')])
def books_list(request):
    if request.method == 'GET':
        books = Books.objects.all()
        serializer = BooksSerializer(books, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = BooksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Books')])
def books_detail(request, pk):
    book = get_object_or_404(Books, pk=pk)
    
    if request.method == 'GET':
        serializer = BooksSerializer(book)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = BooksSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# RecordBook views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('RecordBook')])
def record_book_list(request):
    if request.method == 'GET':
        records = RecordBook.objects.all()
        serializer = RecordBookSerializer(records, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = RecordBookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('RecordBook')])
def record_book_detail(request, pk):
    record = get_object_or_404(RecordBook, pk=pk)
    
    if request.method == 'GET':
        serializer = RecordBookSerializer(record)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = RecordBookSerializer(record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        record.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Sports views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Sports')])
def sports_list(request):
    if request.method == 'GET':
        sports = Sports.objects.all()
        serializer = SportsSerializer(sports, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = SportsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Sports')])
def sports_detail(request, pk):
    sport = get_object_or_404(Sports, pk=pk)
    
    if request.method == 'GET':
        serializer = SportsSerializer(sport)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = SportsSerializer(sport, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        sport.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# StudentSports views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('StudentSports')])
def student_sports_list(request):
    if request.method == 'GET':
        student_sports = StudentSports.objects.all()
        serializer = StudentSportsSerializer(student_sports, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = StudentSportsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('StudentSports')])
def student_sports_detail(request, student_id, sport_id):
    student_sport = get_object_or_404(StudentSports, student_id=student_id, sport_id=sport_id)
    
    if request.method == 'GET':
        serializer = StudentSportsSerializer(student_sport)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = StudentSportsSerializer(student_sport, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        student_sport.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Gymkhana')])
def gymkhana_list(request):
    if request.method == 'GET':
        gymkhanas = Gymkhana.objects.all()
        serializer = GymkhanaSerializer(gymkhanas, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = GymkhanaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Gymkhana')])
def gymkhana_detail(request, pk):
    try:
        gymkhana = Gymkhana.objects.get(pk=pk)
    except Gymkhana.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = GymkhanaSerializer(gymkhana)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = GymkhanaSerializer(gymkhana, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        gymkhana.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Gymkhana Events views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('GymkhanaEvents')])
def gymkhana_events_list(request):
    if request.method == 'GET':
        events = GymkhanaEvents.objects.all()
        serializer = GymkhanaEventsSerializer(events, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = GymkhanaEventsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('GymkhanaEvents')])
def gymkhana_events_detail(request, pk):
    try:
        event = GymkhanaEvents.objects.get(pk=pk)
    except GymkhanaEvents.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = GymkhanaEventsSerializer(event)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = GymkhanaEventsSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Culture Club views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Culture')])
def culture_list(request):
    if request.method == 'GET':
        cultures = Culture.objects.all()
        serializer = CultureSerializer(cultures, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CultureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Culture')])
def culture_detail(request, pk):
    try:
        culture = Culture.objects.get(pk=pk)
    except Culture.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CultureSerializer(culture)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CultureSerializer(culture, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        culture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Culture Events views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('CultureEvents')])
def culture_events_list(request):
    if request.method == 'GET':
        events = CultureEvents.objects.all()
        serializer = CultureEventsSerializer(events, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CultureEventsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('CultureEvents')])
def culture_events_detail(request, pk):
    try:
        event = CultureEvents.objects.get(pk=pk)
    except CultureEvents.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CultureEventsSerializer(event)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CultureEventsSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Anti-Ragging Committee views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('AntiRaggingCommittee')])
def anti_ragging_committee_list(request):
    if request.method == 'GET':
        committees = AntiRaggingCommittee.objects.all()
        serializer = AntiRaggingCommitteeSerializer(committees, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = AntiRaggingCommitteeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('AntiRaggingCommittee')])
def anti_ragging_committee_detail(request, pk):
    try:
        committee = AntiRaggingCommittee.objects.get(pk=pk)
    except AntiRaggingCommittee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AntiRaggingCommitteeSerializer(committee)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = AntiRaggingCommitteeSerializer(committee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        committee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Complaints views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Complaints')])
def complaints_list(request):
    if request.method == 'GET':
        complaints = Complaints.objects.all()
        serializer = ComplaintsSerializer(complaints, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ComplaintsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Complaints')])
def complaints_detail(request, pk):
    try:
        complaint = Complaints.objects.get(pk=pk)
    except Complaints.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ComplaintsSerializer(complaint)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ComplaintsSerializer(complaint, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        complaint.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Training & Placement Cell views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('TrainingPlacementCell')])
def training_placement_cell_list(request):
    if request.method == 'GET':
        tpcs = TrainingPlacementCell.objects.all()
        serializer = TrainingPlacementCellSerializer(tpcs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TrainingPlacementCellSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('TrainingPlacementCell')])
def training_placement_cell_detail(request, pk):
    try:
        tpc = TrainingPlacementCell.objects.get(pk=pk)
    except TrainingPlacementCell.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TrainingPlacementCellSerializer(tpc)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TrainingPlacementCellSerializer(tpc, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        tpc.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Companies views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Companies')])
def companies_list(request):
    if request.method == 'GET':
        companies = Companies.objects.all()
        serializer = CompaniesSerializer(companies, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CompaniesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Companies')])
def companies_detail(request, pk):
    try:
        company = Companies.objects.get(pk=pk)
    except Companies.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CompaniesSerializer(company)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CompaniesSerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Job Offers views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('JobOffers')])
def job_offers_list(request):
    if request.method == 'GET':
        offers = JobOffers.objects.all()
        serializer = JobOffersSerializer(offers, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = JobOffersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('JobOffers')])
def job_offers_detail(request, pk):
    try:
        offer = JobOffers.objects.get(pk=pk)
    except JobOffers.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = JobOffersSerializer(offer)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = JobOffersSerializer(offer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        offer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Internships views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('Internships')])
def internships_list(request):
    if request.method == 'GET':
        internships = Internships.objects.all()
        serializer = InternshipsSerializer(internships, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = InternshipsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('Internships')])
def internships_detail(request, pk):
    try:
        internship = Internships.objects.get(pk=pk)
    except Internships.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = InternshipsSerializer(internship)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = InternshipsSerializer(internship, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        internship.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Training Programs views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('TrainingPrograms')])
def training_programs_list(request):
    if request.method == 'GET':
        programs = TrainingPrograms.objects.all()
        serializer = TrainingProgramsSerializer(programs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TrainingProgramsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('TrainingPrograms')])
def training_programs_detail(request, pk):
    try:
        program = TrainingPrograms.objects.get(pk=pk)
    except TrainingPrograms.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TrainingProgramsSerializer(program)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TrainingProgramsSerializer(program, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        program.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Student Training views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, has_entity_permission('StudentTraining')])
def student_training_list(request):
    if request.method == 'GET':
        trainings = StudentTraining.objects.all()
        serializer = StudentTrainingSerializer(trainings, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = StudentTrainingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, has_entity_permission('StudentTraining')])
def student_training_detail(request, student_id, program_id):
    try:
        training = StudentTraining.objects.get(student_id=student_id, program_id=program_id)
    except StudentTraining.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = StudentTrainingSerializer(training)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = StudentTrainingSerializer(training, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        training.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)