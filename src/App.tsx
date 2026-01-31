import './styles/theme.css';
import './styles/global.css';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { SectionForm } from './components/SectionForm';
import { InfoVilla } from './components/InfoVIlla';
import { GalleryVilla } from './components/GalleryVilla';
import { Regulamento } from './components/Regulamento';
import { Loader } from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setLoading(false);
    };

    if (document.readyState === 'complete') {    
      const t = window.setTimeout(finish, 150);
      return () => window.clearTimeout(t);
    }

    window.addEventListener('load', finish, { once: true });

    // fallback: evita prender o loader caso algum recurso demore/erro
    const fallback = window.setTimeout(finish, 2000);

    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <SectionForm />
      <InfoVilla />
      <GalleryVilla />
      <Regulamento />
    </>
  )
}

export default App
