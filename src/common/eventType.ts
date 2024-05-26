import { Teacher } from 'src/teacher/entities/teacher.entity';
import { ActionEnum } from './enum/action.enum';
import { Post } from 'src/posts/entities/post.entity';
import { Student } from 'src/student/entities/student.entity';

export type eventType = {
  post: Post;
  user: Teacher|Student;
  action: ActionEnum;
};
