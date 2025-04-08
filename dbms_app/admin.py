from django.contrib import admin
from .models import (
    Management, ManagementPhone, Professor, ProfessorPhone, Department,
    Program, Class, Hostel, Student, TeachingAssistant, TeachingAssistantPhone,
    Batch, Lab, Library, Books, RecordBook, Sports, StudentSports,
    Gymkhana, GymkhanaEvents, Culture, CultureEvents, AntiRaggingCommittee,
    Complaints, TrainingPlacementCell, Companies, JobOffers, Internships,
    TrainingPrograms, StudentTraining, UserEntityPermission
)

admin.site.register(Management)
admin.site.register(ManagementPhone)
admin.site.register(Professor)
admin.site.register(ProfessorPhone)
admin.site.register(Department)
admin.site.register(Program)
admin.site.register(Class)
admin.site.register(Hostel)
admin.site.register(Student)
admin.site.register(TeachingAssistant)
admin.site.register(TeachingAssistantPhone)
admin.site.register(Batch)
admin.site.register(Lab)
admin.site.register(Library)
admin.site.register(Books)
admin.site.register(RecordBook)
admin.site.register(Sports)
admin.site.register(StudentSports)
admin.site.register(Gymkhana)
admin.site.register(GymkhanaEvents)
admin.site.register(Culture)
admin.site.register(CultureEvents)
admin.site.register(AntiRaggingCommittee)
admin.site.register(Complaints)
admin.site.register(TrainingPlacementCell)
admin.site.register(Companies)
admin.site.register(JobOffers)
admin.site.register(Internships)
admin.site.register(TrainingPrograms)
admin.site.register(StudentTraining)
admin.site.register(UserEntityPermission)



# Register your models here.
