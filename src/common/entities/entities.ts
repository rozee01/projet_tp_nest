import { Announcement } from 'src/announcement/entities/announcement.entity';
import { StudentClass } from 'src/student-class/entities/studentclass.entity';
import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Class } from 'src/class/entities/class.entity';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

const entitiesList = [Post, Announcement, User, Student, StudentClass, Class, Teacher];
export { entitiesList };
