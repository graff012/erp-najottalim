CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar(50),
  price float,
  duration int DEFAULT 0,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE staffs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name varchar(50),
  last_name varchar(50),
  username varchar(50),
  password varchar(100),
  image_url text,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id uuid,
  first_name varchar(50),
  last_name varchar(50),
  username varchar(50),
  password varchar(100),
  image_url text,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE groups (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar(50),
  status varchar(32) CHECK (status IN ('active', 'inactive', 'completed', 'pending')),
  course_id uuid,
  staff_id uuid,
  FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE SET NULL,
  FOREIGN KEY (staff_id) REFERENCES staffs (id) ON DELETE SET NULL,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp
);

ALTER TABLE students
ADD FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE SET NULL;

CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id uuid,
  start_time time,
  end_time time,
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar(40),
  description text,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE staff_roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id uuid,
  staff_id uuid,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staffs (id) ON DELETE CASCADE
);

CREATE TABLE homeworks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id uuid,
  group_id uuid,
  file_url text,
  description text,
  start_date timestamp,
  end_date timestamp,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE
);

CREATE TABLE student_homeworks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id uuid,
  student_id uuid,
  homework_id uuid,
  score float,
  status varchar(32) CHECK (status IN ('accepted', 'pending', 'rejected')),
  sending_date timestamp,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
  FOREIGN KEY (homework_id) REFERENCES homeworks (id) ON DELETE CASCADE
);

CREATE TABLE teacher_group (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id uuid,
  teacher_id uuid,
  status varchar(32) CHECK (status IN ('active', 'inactive')),
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES staffs (id) ON DELETE CASCADE
);

CREATE TABLE attendances (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id uuid,
  student_id uuid,
  is_attended boolean DEFAULT false,
  arrived_at time,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
);
