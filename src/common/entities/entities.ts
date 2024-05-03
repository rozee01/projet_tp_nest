import { Announcement } from 'src/announcement/entities/announcement.entity';
import { Class } from 'src/class/entities/class.entity';
import { StudentClass } from 'src/student-class/entities/studentclass.entity';
import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { User } from 'src/users/entities/user.entity';
import { File } from 'src/files/entities/file.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Subject } from 'src/subject/entities/subject.entity';

const entitiesList = [Post, File, Announcement, User, Subject, Student, StudentClass, Class, Teacher];
export { entitiesList };
