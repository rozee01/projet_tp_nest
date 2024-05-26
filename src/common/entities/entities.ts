import { Announcement } from 'src/announcement/entities/announcement.entity';
import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Class } from 'src/class/entities/class.entity';
import { User } from 'src/users/entities/user.entity';
import { File } from 'src/files/entities/file.entity';
import { Post } from 'src/posts/entities/post.entity';

const entitiesList = [Post, File, Announcement, User, Subject, Student, Class, Teacher];
export { entitiesList };
