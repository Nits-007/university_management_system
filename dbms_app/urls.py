from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/users/', views.user_list, name='user-list'),
    path('api/permissions/', views.permission_list, name='permission-list'),
    path('api/permissions/<int:pk>/', views.permission_detail, name='permission-detail'),
    path('api/users/<int:user_id>/permissions/', views.user_permissions, name='user-permissions'),

    path('api/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/register', views.registerUser, name='register'),
    path('api/profile',views.get_user_profile, name='profile'),

    path('api/management/', views.management_list, name='management-list'),
    path('api/management/<int:pk>/', views.management_detail, name='management-detail'),
    
    path('api/management-phones/', views.management_phone_list, name='management-phone-list'),
    path('api/management-phones/<int:pk>/', views.management_phone_detail, name='management-phone-detail'),
    
    path('api/professors/', views.professor_list, name='professor-list'),
    path('api/professors/<int:pk>/', views.professor_detail, name='professor-detail'),
    
    path('api/professor-phones/', views.professor_phone_list, name='professor-phone-list'),
    path('api/professor-phones/<int:pk>/', views.professor_phone_detail, name='professor-phone-detail'),
    
    path('api/departments/', views.department_list, name='department-list'),
    path('api/departments/<int:pk>/', views.department_detail, name='department-detail'),
    
    path('api/programs/', views.program_list, name='program-list'),
    path('api/programs/<int:pk>/', views.program_detail, name='program-detail'),
    
    path('api/classes/', views.class_list, name='class-list'),
    path('api/classes/<int:pk>/', views.class_detail, name='class-detail'),
    
    path('api/hostels/', views.hostel_list, name='hostel-list'),
    path('api/hostels/<int:pk>/', views.hostel_detail, name='hostel-detail'),
    
    path('api/students/', views.student_list, name='student-list'),
    path('api/students/<int:pk>/', views.student_detail, name='student-detail'),
    
    path('api/teaching-assistants/', views.teaching_assistant_list, name='teaching-assistant-list'),
    path('api/teaching-assistants/<int:pk>/', views.teaching_assistant_detail, name='teaching-assistant-detail'),
    
    path('api/teaching-assistant-phones/', views.teaching_assistant_phone_list, name='teaching-assistant-phone-list'),
    path('api/teaching-assistant-phones/<int:pk>/', views.teaching_assistant_phone_detail, name='teaching-assistant-phone-detail'),
    
    path('api/batches/', views.batch_list, name='batch-list'),
    path('api/batches/<int:pk>/', views.batch_detail, name='batch-detail'),
    
    path('api/labs/', views.lab_list, name='lab-list'),
    path('api/labs/<int:pk>/', views.lab_detail, name='lab-detail'),
    
    path('api/libraries/', views.library_list, name='library-list'),
    path('api/libraries/<int:pk>/', views.library_detail, name='library-detail'),
    
    path('api/books/', views.books_list, name='books-list'),
    path('api/books/<str:pk>/', views.books_detail, name='books-detail'),
    
    path('api/record-books/', views.record_book_list, name='record-book-list'),
    path('api/record-books/<int:pk>/', views.record_book_detail, name='record-book-detail'),
    
    path('api/sports/', views.sports_list, name='sports-list'),
    path('api/sports/<int:pk>/', views.sports_detail, name='sports-detail'),
    
    path('api/student-sports/', views.student_sports_list, name='student-sports-list'),
    path('api/student-sports/<int:student_id>/<int:sport_id>/', views.student_sports_detail, name='student-sports-detail'),
    
    path('api/gymkhanas/', views.gymkhana_list, name='gymkhana-list'),
    path('api/gymkhanas/<int:pk>/', views.gymkhana_detail, name='gymkhana-detail'),
    
    path('api/gymkhana-events/', views.gymkhana_events_list, name='gymkhana-events-list'),
    path('api/gymkhana-events/<int:pk>/', views.gymkhana_events_detail, name='gymkhana-events-detail'),
    
    path('api/culture-clubs/', views.culture_list, name='culture-list'),
    path('api/culture-clubs/<int:pk>/', views.culture_detail, name='culture-detail'),
    
    path('api/culture-events/', views.culture_events_list, name='culture-events-list'),
    path('api/culture-events/<int:pk>/', views.culture_events_detail, name='culture-events-detail'),
    
    path('api/anti-ragging-committees/', views.anti_ragging_committee_list, name='anti-ragging-committee-list'),
    path('api/anti-ragging-committees/<int:pk>/', views.anti_ragging_committee_detail, name='anti-ragging-committee-detail'),
    
    path('api/complaints/', views.complaints_list, name='complaints-list'),
    path('api/complaints/<int:pk>/', views.complaints_detail, name='complaints-detail'),
    
    path('api/training-placement-cells/', views.training_placement_cell_list, name='training-placement-cell-list'),
    path('api/training-placement-cells/<int:pk>/', views.training_placement_cell_detail, name='training-placement-cell-detail'),
    
    path('api/companies/', views.companies_list, name='companies-list'),
    path('api/companies/<int:pk>/', views.companies_detail, name='companies-detail'),
    
    path('api/job-offers/', views.job_offers_list, name='job-offers-list'),
    path('api/job-offers/<int:pk>/', views.job_offers_detail, name='job-offers-detail'),
    
    path('api/internships/', views.internships_list, name='internships-list'),
    path('api/internships/<int:pk>/', views.internships_detail, name='internships-detail'),
    
    path('api/training-programs/', views.training_programs_list, name='training-programs-list'),
    path('api/training-programs/<int:pk>/', views.training_programs_detail, name='training-programs-detail'),
    
    path('api/student-training/', views.student_training_list, name='student-training-list'),
    path('api/student-training/<int:student_id>/<int:program_id>/', views.student_training_detail, name='student-training-detail'),
]
