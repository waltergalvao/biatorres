import { Hero } from '@/components/home/Hero'
import { PriceLadder } from '@/components/home/PriceLadder'
import { RoomPrices } from '@/components/home/RoomPrices'
import { Interlude } from '@/components/home/Interlude'
import { Deliverables } from '@/components/home/Deliverables'
import { Audiences } from '@/components/home/Audiences'
import { Process } from '@/components/home/Process'
import { Gallery } from '@/components/home/Gallery'
import { Testimonials } from '@/components/home/Testimonials'
import { Vistoria } from '@/components/home/Vistoria'
import { Faq } from '@/components/home/Faq'
import { FinalCta } from '@/components/home/FinalCta'

export default function Home() {
  return (
    <>
      <Hero />
      <PriceLadder />
      <RoomPrices />
      <Interlude />
      <Deliverables />
      <Audiences />
      <Process />
      <Gallery />
      <Testimonials />
      <Vistoria />
      <Faq />
      <FinalCta />
    </>
  )
}
