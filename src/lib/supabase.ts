import { Course } from '@/types';
import { createClient } from './supabase/server';

// Mock courses for graceful fallback when credentials are missing
const MOCK_COURSES: Course[] = [
  {
    id: '1-figma',
    title: 'UX/UI design',
    progress: 70,
    icon_name: 'Palette',
    created_at: new Date().toISOString(),
  },
  {
    id: '2-html-css',
    title: 'HTML/CSS',
    progress: 50,
    icon_name: 'Code',
    created_at: new Date().toISOString(),
  },
  {
    id: '3-adv-react',
    title: 'Advanced React Patterns',
    progress: 75,
    icon_name: 'Cpu',
    created_at: new Date().toISOString(),
  },
  {
    id: '4-figma-mastery',
    title: 'Figma Mastery',
    progress: 90,
    icon_name: 'Framer',
    created_at: new Date().toISOString(),
  }
];

export interface CourseResult {
  courses: Course[];
  isFallback: boolean;
}

function validateCourse(course: any): course is Course {
  return (
    course !== null &&
    typeof course === 'object' &&
    typeof course.id === 'string' &&
    typeof course.title === 'string' &&
    typeof course.progress === 'number' &&
    course.progress >= 0 &&
    course.progress <= 100 &&
    typeof course.icon_name === 'string' &&
    typeof course.created_at === 'string' &&
    !isNaN(Date.parse(course.created_at))
  );
}

export async function getCourses(): Promise<CourseResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const credentialsExist = !!(supabaseUrl && supabaseAnonKey);

  if (!credentialsExist) {
    console.warn('Supabase env credentials missing. Using local mock courses.');
    return { courses: MOCK_COURSES, isFallback: true };
  }

  const client = await createClient();
  if (!client) {
    throw new Error('Failed to initialize Supabase server client.');
  }

  const { data, error } = await client
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching from Supabase database:', error);
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  if (!data || data.length === 0) {
    console.warn('No courses found in Supabase table.');
    return { courses: [], isFallback: false };
  }

  const validatedCourses = data.filter(validateCourse);
  if (validatedCourses.length !== data.length) {
    throw new Error('Database integrity check failed: One or more database rows contains invalid data shapes or range violations.');
  }

  return { courses: validatedCourses, isFallback: false };
}
