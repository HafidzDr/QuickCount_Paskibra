export interface CarouselSlide {
  id: string;
  imageUrl: string;
  tagline: string;
  title: string;
  description: string;
  accentBadge?: string;
}

export const AUTH_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    // Indonesian national marching formation & ceremonial parade
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=80',
    tagline: 'KORPS PASKIBRA NASIONAL',
    title: 'Semangat dalam Satu Barisan',
    description: 'Ketegasan langkah, keseragaman derap, dan dedikasi mengawal kehormatan sang Merah Putih di seluruh penjuru nusantara.',
    accentBadge: 'FORMASI BARISAN',
  },
  {
    id: 'slide-2',
    // Marching flag team ceremony & unity
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1600&q=80',
    tagline: 'KETANGKASAN & KEDISIPLINAN',
    title: 'Disiplin, Dedikasi, Prestasi',
    description: 'Setiap gerakan mencerminkan integritas tinggi dan ketahanan mental para pemuda-pemudi terbaik bangsa.',
    accentBadge: 'INTEGRITAS TINGGI',
  },
  {
    id: 'slide-3',
    // Ceremonial celebration and youth contingent pride
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    tagline: 'DUKUNGAN PUBLIK RESMI',
    title: 'Dukung Kontingen Kebanggaanmu',
    description: 'Salurkan suara sah terverifikasi untuk pleton Paskibra favoritmu dalam persaingan ketat kejuaraan bergengsi.',
    accentBadge: 'TABULASI TERBUKA',
  },
];
