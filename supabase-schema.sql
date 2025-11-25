-- Create cakes table
create table public.cakes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Cake configuration
  layers integer default 2,
  base_color text not null,
  frosting_color text not null,
  icing_color text not null,
  flavor text default 'Vanilla',
  toppings jsonb default '[]'::jsonb,
  candles integer default 1,
  cake_text text default 'Happy Birthday',
  hover_message text default 'Make a Wish',
  hover_message_color text default '#FFD700',
  
  -- Metadata
  views integer default 0
);

-- Enable Row Level Security
alter table public.cakes enable row level security;

-- Create policy to allow anyone to read cakes
create policy "Anyone can view cakes"
  on public.cakes for select
  using (true);

-- Create policy to allow anyone to create cakes
create policy "Anyone can create cakes"
  on public.cakes for insert
  with check (true);

-- Create index on id for faster lookups
create index cakes_id_idx on public.cakes (id);
