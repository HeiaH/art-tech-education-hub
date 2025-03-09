
import { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { useRevealAnimation } from '../utils/animations';
import { useLanguage } from '../hooks/useLanguage';

interface InstagramPost {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
  thumbnail_url?: string;
}

interface InstagramFeedProps {
  limit?: number;
  className?: string;
}

const InstagramFeed = ({ limit = 6, className = "" }: InstagramFeedProps) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useRevealAnimation();
  const { t } = useLanguage();

  useEffect(() => {
    // This is a placeholder for the actual Instagram API integration
    // In a real implementation, you would fetch data from the Instagram Basic Display API
    // For demo purposes, we're simulating the response
    
    const fetchInstagramFeed = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data for demonstration
        const dummyPosts: InstagramPost[] = [
          {
            id: '1',
            media_url: '/placeholder.svg',
            caption: 'Music session #guitar #producer',
            permalink: 'https://instagram.com',
          },
          {
            id: '2',
            media_url: '/placeholder.svg',
            caption: 'Studio time #music #production',
            permalink: 'https://instagram.com',
          },
          {
            id: '3',
            media_url: '/placeholder.svg',
            caption: 'Creative vibes #art #music',
            permalink: 'https://instagram.com',
          },
          {
            id: '4',
            media_url: '/placeholder.svg',
            caption: 'New project underway #creativity',
            permalink: 'https://instagram.com',
          },
          {
            id: '5',
            media_url: '/placeholder.svg',
            caption: 'Inspiration from nature #photography',
            permalink: 'https://instagram.com',
          },
          {
            id: '6',
            media_url: '/placeholder.svg',
            caption: 'Weekend workshop #teaching #music',
            permalink: 'https://instagram.com',
          },
        ];
        
        setPosts(dummyPosts.slice(0, limit));
        setError(null);
      } catch (err) {
        console.error('Error fetching Instagram feed:', err);
        setError(t('instagramFeedError'));
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramFeed();
  }, [limit, t]);

  const refreshFeed = async () => {
    setLoading(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${className} ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-heading">Instagram Feed</h3>
        <button 
          onClick={refreshFeed}
          disabled={loading}
          className="neumorph p-2 rounded-full hover:text-heieh-neon-green transition-colors"
          aria-label="Refresh Instagram feed"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error && (
        <div className="neumorph p-4 rounded-xl bg-red-500/10 text-red-300 mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="neumorph overflow-hidden rounded-xl group relative"
          >
            <div className="aspect-square overflow-hidden">
              <img 
                src={post.media_url || post.thumbnail_url} 
                alt={post.caption || "Instagram post"} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-white text-sm line-clamp-3">{post.caption}</p>
              <div className="mt-2 text-white/70 text-xs flex items-center gap-1">
                <span>View on Instagram</span>
                <ExternalLink size={12} />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="neumorph py-2 px-6 rounded-full inline-flex items-center gap-2 hover:bg-heieh-neon-green hover:text-black transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(29,185,84,0.4)]"
        >
          <span>Follow on Instagram</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;
