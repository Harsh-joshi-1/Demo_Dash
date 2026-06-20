-- Next-Gen Learning Dashboard Schema & Seed SQL

-- Create the courses table
create table if not exists public.courses (
  id text primary key,
  title text not null,
  progress integer not null,
  icon_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable row level security (RLS)
alter table public.courses enable row level security;

-- Create policies for public access (demo purposes)
create policy "Allow public read access" on public.courses for select using (true);
create policy "Allow public write access" on public.courses for insert with check (true);
create policy "Allow public update access" on public.courses for update using (true);

-- Insert seed course data
insert into public.courses (id, title, progress, icon_name)
values 
  ('1-ux-ui', 'UX/UI design', 70, 'Palette'),
  ('2-html-css', 'HTML/CSS', 50, 'Code'),
  ('3-adv-react', 'Advanced React Patterns', 75, 'Cpu'),
  ('4-figma', 'Figma Mastery', 90, 'Framer')
on conflict (id) do update 
set 
  title = excluded.title,
  progress = excluded.progress,
  icon_name = excluded.icon_name;
