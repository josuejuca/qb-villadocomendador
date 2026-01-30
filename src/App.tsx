import './styles/theme.css';
import './styles/global.css';
import { Header } from './components/Header';
import { SectionForm } from './components/SectionForm';
import { InfoVilla } from './components/InfoVIlla';
import { GalleryVilla } from './components/GalleryVilla';
import { Regulamento } from './components/Regulamento';

function App() {

  return (
    <>
      <Header />
      <SectionForm />
      <InfoVilla />
      <GalleryVilla />
      <Regulamento />
    </>
  )
}

export default App
