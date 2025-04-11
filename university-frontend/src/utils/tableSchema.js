export const tableSchema = {
  Management: {
    apiPath: 'management',
    fields: [
      { name: 'emp_id', type: 'number', required: true },
      { name: 'emp_name', type: 'text', required: true },
      {
        name: 'gender',
        type: 'select',
        required: true,
        options: ['Male', 'Female', 'Other']
      },
      // { name: 'phone', type: 'tel', required: true }
    ]
  },
  ManagementPhone: {
    fields: [
      { name: 'emp', type: 'number', required: true},
      { name: 'phone_no', type: 'text', required: true }
    ],
    foreignFields: [
      {tname: 'management', fieldName:'emp_id', currentField:'emp'},
    ],
    apiPath: 'management-phones'
  },
  Professor: {
    apiPath: 'professors',
    fields: [
      { name: 'prof_id', type: 'number', required: true },
      { name: 'prof_name', type: 'text', required: true },
      { name: 'age', type: 'number', required: true },
      {
        name: 'gender',
        type: 'select',
        required: true,
        options: ['Male', 'Female', 'Other']
      },
      { name: 'email_id', type: 'email', required: true },
      { name: 'date_of_joining', type: 'date', required: true },
      { name: 'salary', type: 'number', required: true },
    ]
  },
  ProfessorPhone: {
    fields: [
      { name: 'prof', type: 'number', required: true },
      { name: 'phone_no', type: 'text', required: true }
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'prof'},
    ],
    apiPath: 'professor-phones'
  },
  Department: {
    apiPath: 'departments',
    fields: [
      { name: 'dept_no', type: 'number', required: true },
      { name: 'name', type: 'text', required: true },
      { name: 'no_of_programs', type: 'number', required: true },
      { name: 'hod', type: 'number', required: true },
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'hod'},
    ],
  },
  Program: {
    apiPath: 'programs',
    fields: [
      { name: 'program_id', type: 'number', required: true },
      { name: 'name', type: 'text', required: true },
      { name: 'no_of_courses', type: 'number', required: true },
      { name: 'fees', type: 'number', required: true },
      { name: 'dept_no', type: 'number', required: true },
    ],
    foreignFields: [
      {tname: 'departments', fieldName:'dept_no', currentField:'dept_no'},
    ],
  },
  Class: {
    fields: [
      { name: 'class_id', type: 'number', required: true },
      { name: 'class_name', type: 'text', required: true },
      { name: 'capacity', type: 'number', required: true },
      { name: 'no_of_students', type: 'number', required: true }
    ],
    apiPath: 'classes'
  },
  Hostel: {
    apiPath: 'hostels',
    fields: [
      { name: 'hostel_id', type: 'number', required: true },
      { name: 'hostel_name', type: 'text', required: true },
      { name: 'no_of_beds', type: 'number', required: true },
      {
        name: 'type',
        type: 'select',
        required: true,
        options: ['Boys', 'Girls']
      },
      { name: 'warden', type: 'integer', required: true }
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'warden'},
    ],
  },
  Student: {
    apiPath: 'students',
    fields: [
      { name: 'student_id', type: 'number', required: true },
      { name: 'name', type: 'text', required: true },
      { name: 'age', type: 'number', required: true },
      {
        name: 'gender',
        type: 'select',
        required: true,
        options: ['Male', 'Female', 'Other']
      },
      { name: 'program', type: 'integer', required: true },
      { name: 'hostel', type: 'integer', required: true },
      { name: 'class_field', type: 'text', required: true }
    ],
    foreignFields: [
      {tname: 'programs', fieldName:'program_id', currentField:'program'},
      {tname: 'hostels', fieldName:'hostel_id', currentField:'hostel'},
    ],
  },
  TeachingAssistant: {
    fields: [
      { name: 'ta_id', type: 'number', required: true },
      { name: 'ta_name', type: 'text', required: true },
      { name: 'age', type: 'number', required: true },
      { name: 'gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
      { name: 'email_id', type: 'email', required: true },
      { name: 'salary', type: 'number', required: true },
      { name: 'date_of_joining', type: 'date', required: true },
      { name: 'prof', type: 'number', required: false }
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'prof'},
    ],
    apiPath: 'teaching-assistants'
  },
  TeachingAssistantPhone: {
    fields: [
      { name: 'ta', type: 'number', required: true },
      { name: 'phone_no', type: 'text', required: true }
    ],
    foreignFields: [
      {tname: 'teaching-assistants', fieldName:'ta_id', currentField:'ta'},
    ],
    apiPath: 'teaching-assistant-phones'
  },
  Batch: {
    fields: [
      { name: 'batch_id', type: 'number', required: true },
      { name: 'batch_name', type: 'text', required: true },
      { name: 'mentor', type: 'number', required: false },
      { name: 'class_field', type: 'number', required: true }
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'mentor'},
    ],
    apiPath: 'batches'
  },
  Lab: {
    fields: [
      { name: 'lab_id', type: 'number', required: true },
      { name: 'lab_name', type: 'text', required: true },
      { name: 'instructor', type: 'number', required: false },
      { name: 'lab_assistant', type: 'number', required: false }
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'instructor'},
    ],
    apiPath: 'labs'
  },
  Library: {
    apiPath: 'library',
    fields: [
      { name: 'library_id', type: 'number', required: true },
      { name: 'name', type: 'text', required: true },
      { name: 'librarian', type: 'text', required: true },
      { name: 'seating_capacity', type: 'number', required: true }
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'librarian'},
    ],
  },
  Books: {
    apiPath: 'books',
    fields: [
      { name: 'book_name', type: 'text', required: true },
      { name: 'author_name', type: 'text', required: true },
      { name: 'published_year', type: 'number', required: true },
      { name: 'isbn_no', type: 'text', required: true },
      { name: 'price', type: 'number', required: true }
    ]
  },
  RecordBook: {
    fields: [
      { name: 'record_id', type: 'number', required: true },
      { name: 'student', type: 'number', required: true },
      { name: 'isbn_no', type: 'text', required: true },
      { name: 'issued_date', type: 'date', required: true },
      { name: 'return_date', type: 'date', required: false },
      { name: 'late_fine', type: 'number', required: false }
    ],
    foreignFields: [
      {tname: 'students', fieldName:'student_id', currentField:'student'},
      {tname: 'books', fieldName:'isbn_no', currentField:'isbn_no'},
    ],
    apiPath: 'record-books'
  },
  Sports: {
    apiPath: 'sports',
    fields: [
      { name: 'sport_id', type: 'number', required: true },
      { name: 'sport_name', type: 'text', required: true },
      { name: 'coach', type: 'text', required: true },
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'coach'},
    ],
  },
  StudentSports: {
    fields: [
      { name: 'student', type: 'number', required: true },
      { name: 'sport', type: 'number', required: true }
    ],
    foreignFields: [
      {tname: 'students', fieldName:'student_id', currentField:'student'},
      {tname: 'sports', fieldName:'sport_id', currentField:'sport'},
    ],
    apiPath: 'student-sports'
  },
  Gymkhana: {
    fields: [
      { name: 'gymkhana_id', type: 'number', required: true },
      { name: 'name', type: 'text', required: true },
      { name: 'president', type: 'number', required: true },
      { name: 'vice_president', type: 'number', required: true },
      { name: 'secretary', type: 'number', required: true }
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'president'},
      {tname: 'students', fieldName:'student_id', currentField:'vice_president'},
      {tname: 'students', fieldName:'student_id', currentField:'secretary'},
    ],
    apiPath: 'gymkhanas'
  },
  GymkhanaEvents: {
    fields: [
      { name: 'event_id', type: 'number', required: true },
      { name: 'event_name', type: 'text', required: true },
      { name: 'gymkhana', type: 'number', required: true },
      { name: 'event_date', type: 'date', required: true }
    ],
    foreignFields: [
      {tname: 'gymkhanas', fieldName:'gymkhana_id', currentField:'gymkhana'},
    ],
    apiPath: 'gymkhana-events'
  },
  Culture: {
    fields: [
      { name: 'culture_id', type: 'number', required: true },
      { name: 'club_name', type: 'text', required: true },
      { name: 'club_president', type: 'number', required: true },
      { name: 'club_vice_president', type: 'number', required: true }
    ],
    foreignFields: [
      {tname: 'students', fieldName:'student_id', currentField:'club_president'},
      {tname: 'students', fieldName:'student_id', currentField:'club_vice_president'},
    ],
    apiPath: 'culture-clubs'
  },
  CultureEvents: {
    fields: [
      { name: 'event_id', type: 'number', required: true },
      { name: 'event_name', type: 'text', required: true },
      { name: 'culture', type: 'number', required: true },
      { name: 'event_date', type: 'date', required: true }
    ],
    foreignFields: [
      {tname: 'culture-clubs', fieldName:'culture_id', currentField:'culture'},
    ],
    apiPath: 'culture-events'
  },
  AntiRaggingCommittee: {
    fields: [
      { name: 'committee_id', type: 'number', required: true },
      { name: 'head_professor', type: 'number', required: true },
      { name: 'student_representative', type: 'number', required: true }
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'head_professor'},
      {tname: 'students', fieldName:'student_id', currentField:'student_representative'},
    ],
    apiPath: 'anti-ragging-committees'
  },
  Complaints: {
    fields: [
      { name: 'complaint_id', type: 'number', required: true },
      { name: 'student', type: 'number', required: true },
      { name: 'committee', type: 'number', required: true },
      { name: 'complaint_details', type: 'text', required: true },
      { name: 'complaint_date', type: 'date', required: true },
      { name: 'resolution_status', type: 'select', required: true, options: ['Pending', 'Resolved', 'Dismissed'] },
    ],
    foreignFields: [
      {tname: 'anti-ragging-committees', fieldName:'committee_id', currentField:'committee'},
      {tname: 'students', fieldName:'student_id', currentField:'student'},
    ],
    apiPath: 'complaints'
  },
  TrainingPlacementCell: {
    fields: [
      { name: 'tpc_id', type: 'number', required: true },
      { name: 'head_professor', type: 'number', required: true },
      { name: 'office_location', type: 'text', required: true },
      { name: 'contact_email', type: 'email', required: true },
      { name: 'contact_phone', type: 'text', required: true }
    ],
    foreignFields: [
      {tname: 'professors', fieldName:'prof_id', currentField:'head_professor'},
    ],
    apiPath: 'training-placement-cells'
  },
  Companies: {
    apiPath: 'companies',
    fields: [
      { name: 'company_id', type: 'number', required: true },
      { name: 'company_name', type: 'text', required: true },
      { name: 'industry_type', type: 'text', required: true },
      { name: 'contact_person', type: 'text', required: true },
      { name: 'contact_email', type: 'email', required: true },
      { name: 'contact_phone', type: 'text', required: true }
    ]
  },
  JobOffers: {
    apiPath: 'job-offers',
    fields: [
      { name: 'offer_id', type: 'number', required: true },
      { name: 'student', type: 'text', required: true },
      { name: 'company', type: 'select', required: true },
      { name: 'job_role', type: 'text', required: true },
      { name: 'package', type: 'number', required: true },
      { name: 'offer_date', type: 'date', required: true },
      { name: 'status', type: 'select', required: true, options: ['Pending', 'Rejected', 'Accepted'] },
    ],
    foreignFields: [
      {tname: 'companies', fieldName:'company_id', currentField:'company'},
      {tname: 'students', fieldName:'student_id', currentField:'student'},
    ],
  },
  Internships: {
    apiPath: 'internships',
    fields: [
      { name: 'internship_id', type: 'number', required: true },
      {name:'student',type:'number',required:true},
      { name: 'company', type: 'number', required: true },
      { name: 'internship_role', type: 'text', required: true },
      { name: 'duration_months', type: 'number', required: true },
      { name: 'stipend', type: 'number', required: true },
      { name: 'internship_start_date', type: 'date', required: true },
      { name: 'internship_end_date', type: 'date', required: true }

    ],
    foreignFields: [
      {tname: 'companies', fieldName:'company_id', currentField:'company'},
      {tname: 'students', fieldName:'student_id', currentField:'student'},
    ],
  },
  TrainingPrograms: {
    apiPath: 'training-programs',
    fields: [
      { name: 'program_id', type: 'number', required: true },
      { name: 'program_name', type: 'text', required: true },
      { name: 'organized_by', type: 'text', required: true },
      { name: 'start_date', type: 'date', required: true },
      { name: 'end_date', type: 'date', required: true }
    ],
  },
  StudentTraining: {
    fields: [
      { name: 'student', type: 'number', required: true },
      { name: 'program', type: 'number', required: true },
      { name: 'completion_status', type: 'text', required: true },
      { name: 'completion_status', type: 'select', required: true, options: ['Completed', 'Not Completed', 'Ongoing'] },
      { name: 'certificate_issued', type: 'select', required: true, options: ['True', 'False'] },

    ],
    foreignFields: [
      {tname: 'training-programs', fieldName:'program_id', currentField:'program'},
      {tname: 'students', fieldName:'student_id', currentField:'student'},
    ],
    apiPath: 'student-training'
  }
}; 

