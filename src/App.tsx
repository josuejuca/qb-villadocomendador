import './styles/theme.css';
import './styles/global.css';
import { Header } from './components/Header';
import { SectionForm } from './components/SectionForm';
import { InfoVilla } from './components/InfoVIlla';
import { GalleryVilla } from './components/GalleryVilla';

function App() {

  return (
    <>
      <Header />
      <SectionForm />
      {/* <SectionInfo /> */}
      <InfoVilla />
      <GalleryVilla />
    </>
  )
}

export default App
