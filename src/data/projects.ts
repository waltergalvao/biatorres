export type Project = {
  id: number
  title: string
  category: string
  categoryLabel: string
  image: string
  year: string
  location: string
  featured?: boolean
}

export const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'sala', label: 'Sala' },
  { value: 'cozinha', label: 'Cozinha' },
  { value: 'quarto', label: 'Quarto' },
  { value: 'banheiro', label: 'Banheiro' },
  { value: 'area-externa', label: 'Área Externa' },
  { value: 'escritorio', label: 'Escritório' },
]

export const projects: Project[] = [
  {
    id: 1,
    title: 'Residência Vila Nova',
    category: 'sala',
    categoryLabel: 'Sala de Estar',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
    year: '2025',
    location: 'São Paulo, SP',
    featured: true,
  },
  {
    id: 2,
    title: 'Apartamento Jardins',
    category: 'cozinha',
    categoryLabel: 'Cozinha',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115',
    year: '2025',
    location: 'São Paulo, SP',
    featured: true,
  },
  {
    id: 3,
    title: 'Casa de Campo Itaipava',
    category: 'sala',
    categoryLabel: 'Sala de Estar',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87',
    year: '2024',
    location: 'Itaipava, RJ',
    featured: true,
  },
  {
    id: 4,
    title: 'Suíte Master Leblon',
    category: 'quarto',
    categoryLabel: 'Quarto',
    image: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2',
    year: '2024',
    location: 'Rio de Janeiro, RJ',
  },
  {
    id: 5,
    title: 'Cozinha Gourmet Higienópolis',
    category: 'cozinha',
    categoryLabel: 'Cozinha',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a',
    year: '2024',
    location: 'São Paulo, SP',
    featured: true,
  },
  {
    id: 6,
    title: 'Banheiro Spa Alphaville',
    category: 'banheiro',
    categoryLabel: 'Banheiro',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
    year: '2024',
    location: 'Barueri, SP',
  },
  {
    id: 7,
    title: 'Terraço Panorâmico',
    category: 'area-externa',
    categoryLabel: 'Área Externa',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    year: '2025',
    location: 'São Paulo, SP',
    featured: true,
  },
  {
    id: 8,
    title: 'Home Office Pinheiros',
    category: 'escritorio',
    categoryLabel: 'Escritório',
    image: 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d',
    year: '2025',
    location: 'São Paulo, SP',
  },
  {
    id: 9,
    title: 'Sala Íntima Itaim',
    category: 'sala',
    categoryLabel: 'Sala de Estar',
    image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f',
    year: '2023',
    location: 'São Paulo, SP',
  },
  {
    id: 10,
    title: 'Suíte Casal Morumbi',
    category: 'quarto',
    categoryLabel: 'Quarto',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    year: '2023',
    location: 'São Paulo, SP',
  },
  {
    id: 11,
    title: 'Lavabo Social Vila Madalena',
    category: 'banheiro',
    categoryLabel: 'Banheiro',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14',
    year: '2023',
    location: 'São Paulo, SP',
  },
  {
    id: 12,
    title: 'Varanda Gourmet Moema',
    category: 'area-externa',
    categoryLabel: 'Área Externa',
    image: 'https://images.unsplash.com/photo-1616593969747-4797dc75033e',
    year: '2025',
    location: 'São Paulo, SP',
  },
]
