
import { useLanguage } from '../../../hooks/useLanguage';

const MusicCategory = () => {
  const { t } = useLanguage();
  
  return (
    <div className="neumorph p-6 rounded-2xl animate-fade-in">
      <h3 className="text-2xl font-heading mb-4">{t('music')}</h3>
      <div className="rounded-lg overflow-hidden mb-4">
        <iframe 
          width="100%" 
          height="300" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1410240007&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        ></iframe>
        <div className="text-xs text-white/50 mt-1 font-sans">
          <a href="https://soundcloud.com/heiahmusic" target="_blank" rel="noopener noreferrer" className="hover:text-heieh-neon-green">HeiaH</a> · 
          <a href="https://soundcloud.com/heiahmusic/roundnround" target="_blank" rel="noopener noreferrer" className="hover:text-heieh-neon-green ml-1">RoundnRound</a>
        </div>
      </div>
      <p className="mt-4 text-white/70">
        {t('musicDescription')}
      </p>
    </div>
  );
};

export default MusicCategory;
