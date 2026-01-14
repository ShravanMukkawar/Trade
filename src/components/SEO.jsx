import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  twitterTitle, 
  twitterDescription, 
  twitterImage,
  canonical 
}) => {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update description
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, true);
      updateMetaTag('twitter:description', description, true);
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
    if (ogTitle) {
      updateMetaTag('og:title', ogTitle, true);
    }
    if (ogDescription) {
      updateMetaTag('og:description', ogDescription, true);
    }
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }

    // Update Twitter tags
    if (twitterTitle) {
      updateMetaTag('twitter:title', twitterTitle, true);
    }
    if (twitterDescription) {
      updateMetaTag('twitter:description', twitterDescription, true);
    }
    if (twitterImage) {
      updateMetaTag('twitter:image', twitterImage, true);
    }

    // Update canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage, canonical]);

  return null;
};

export default SEO;
