import { SectionForm } from '../components/SectionForm'
import { InfoVilla } from '../components/InfoVIlla'
import { GalleryVilla } from '../components/GalleryVilla'
import { Faq } from '../components/Faq'

export function Home() {
  return (
    <>
      <SectionForm />
      <InfoVilla />
      <GalleryVilla />
      <Faq />
    </>
  )
}
