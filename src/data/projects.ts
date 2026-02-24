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
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
    year: '2025',
    location: 'São Paulo, SP',
    featured: true,
  },
  {
    id: 3,
    title: 'Casa de Campo Itaipava',
    category: 'sala',
    categoryLabel: 'Sala de Estar',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    year: '2024',
    location: 'Itaipava, RJ',
    featured: true,
  },
  {
    id: 4,
    title: 'Suíte Master Leblon',
    category: 'quarto',
    categoryLabel: 'Quarto',
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84',
    year: '2024',
    location: 'Rio de Janeiro, RJ',
  },
  {
    id: 5,
    title: 'Cozinha Gourmet Higienópolis',
    category: 'cozinha',
    categoryLabel: 'Cozinha',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    year: '2024',
    location: 'São Paulo, SP',
    featured: true,
  },
  {
    id: 6,
    title: 'Banheiro Spa Alphaville',
    category: 'banheiro',
    categoryLabel: 'Banheiro',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37',
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
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
    year: '2025',
    location: 'São Paulo, SP',
  },
  {
    id: 9,
    title: 'Sala Íntima Itaim',
    category: 'sala',
    categoryLabel: 'Sala de Estar',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
    year: '2023',
    location: 'São Paulo, SP',
  },
  {
    id: 10,
    title: 'Suíte Casal Morumbi',
    category: 'quarto',
    categoryLabel: 'Quarto',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
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
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc',
    year: '2025',
    location: 'São Paulo, SP',
  },
]
