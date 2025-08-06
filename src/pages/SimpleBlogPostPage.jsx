
import React, { useState, useEffect } from 'react';
import { SimpleBlogPost } from '@/api/entities';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag, User } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export default function SimpleBlogPostPage() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getPostIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  };

  useEffect(() => {
    const postId = getPostIdFromUrl();
    if (postId) {
      loadPost(postId);
    } else {
      setNotFound(true);
      setIsLoading(false);
    }
  }, []);

  const setMetaTags = (postData) => {
    const setMeta = (property, content, isName = false) => {
      if (!content) return; // Only set meta tag if content is provided
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}='${property}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const title = postData.metaTitle || postData.title + " | טוסלי נסיעות";
    // Ensure content exists before attempting substring
    const description = postData.metaDescription || postData.excerpt || (postData.content ? postData.content.substring(0, 160) : '');
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const imageUrl = postData.imageUrl;

    document.title = title;

    // Standard meta tags
    setMeta('description', description, true);

    // Open Graph (OG) meta tags for social media previews
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', pageUrl);
    setMeta('og:site_name', 'טוסלי נסיעות');
    setMeta('og:type', 'article');
    setMeta('og:image', imageUrl);
    setMeta('og:locale', 'he_IL');

    // Twitter Card meta tags for Twitter previews
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:image', imageUrl, true);
  };

  const loadPost = async (postId) => {
    setIsLoading(true);
    setNotFound(false);
    try {
      const allPosts = await SimpleBlogPost.filter({ published: true });
      let foundPost = allPosts.find(p => p.slug === postId);
      if (!foundPost) {
        foundPost = allPosts.find(p => p.id === postId);
      }

      if (foundPost) {
        setPost(foundPost);
        setMetaTags(foundPost); // Call new function to set all relevant meta tags
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error loading blog post:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 py-12" dir="rtl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-lg p-8 md:p-12">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-72 w-full mb-8 rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-full mt-4" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center text-center p-6" dir="rtl">
        <h1 className="text-4xl font-bold text-slate-700 mb-6">אופס! מאמר לא נמצא</h1>
        <p className="text-slate-600 text-lg mb-10">המאמר שחיפשתם אינו קיים, אינו מפורסם, או שהכתובת השתנתה.</p>
        <Link to={createPageUrl("SimpleBlog")}>
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-3">
            חזרה לכל הפוסטים <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    );
  }
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "url": typeof window !== 'undefined' ? window.location.href : ''
    },
    "headline": post.title,
    "image": post.imageUrl ? [post.imageUrl] : [],
    "datePublished": post.created_date,
    "dateModified": post.updated_date || post.created_date,
    "author": {
      "@type": "Person",
      "name": "תומר אוסזלק"
    },
    "publisher": {
      "@type": "Organization",
      "name": "טוסלי נסיעות",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4dbe46047_logo.jpeg"
      }
    },
    "description": post.metaDescription || post.excerpt
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-2xl overflow-hidden">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {post.imageUrl && (
            <div className="w-full h-72 md:h-96">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6 md:p-10 lg:p-12">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-5 leading-tight">{post.title}</h1>
              <div className="flex flex-wrap items-center text-slate-500 text-sm gap-x-6 gap-y-2">
                <div className="flex items-center">
                  <Calendar className="ml-1.5 h-4 w-4 text-teal-600" />
                  <span>פורסם ב: {format(new Date(post.created_date), 'd/M/yyyy')}</span>
                </div>
              </div>
            </header>

            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed prose-headings:text-slate-800 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-2 prose-strong:text-slate-800 prose-strong:font-semibold prose-em:text-slate-600 prose-blockquote:border-r-4 prose-blockquote:border-teal-500 prose-blockquote:pr-4 prose-blockquote:bg-teal-50 prose-blockquote:py-2 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold text-slate-800 mb-4 mt-8 first:mt-0">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pr-6 mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pr-6 mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-r-4 border-teal-500 pr-4 bg-teal-50 py-2 mb-4 text-slate-700 italic">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
                  em: ({ children }) => <em className="italic text-slate-600">{children}</em>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link to={createPageUrl("SimpleBlog")}>
                <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-colors font-semibold py-3 px-6">
                   <ArrowRight className="ml-2 h-5 w-5" /> חזרה לכל הפוסטים
                </Button>
              </Link>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
