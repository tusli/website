import React, { useState, useEffect } from 'react';
import { SimpleBlogPost } from '@/api/entities';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

export default function SimpleBlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await SimpleBlogPost.filter({ published: true }, '-created_date');
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 py-12" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-1/2 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="shadow-lg">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-28" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <FileText className="w-20 h-20 mx-auto text-teal-600 mb-6" />
          <h1 className="text-5xl font-bold text-slate-800 mb-4">הבלוג של טוסלי</h1>
          <p className="text-xl text-slate-600">טיפים, מדריכים וכל מה שחם בעולם הנסיעות</p>
        </motion.div>

        {posts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 text-2xl py-16"
          >
            אין עדיין פוסטים בבלוג. חזרו לבקר בקרוב!
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col group bg-white rounded-xl border border-slate-200">
                  {post.imageUrl && (
                    <div className="overflow-hidden h-56">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <Link to={createPageUrl(`SimpleBlogPostPage?id=${post.slug || post.id}`)} className="block">
                      <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </Link>
                    <p className="text-sm text-slate-500 pt-2 flex items-center">
                      <Calendar className="ml-1.5 h-4 w-4" />
                      פורסם ב: {format(new Date(post.created_date), 'd בMMMM, yyyy', { locale: he })}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt || post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '')}
                    </p>
                  </CardContent>
                  <div className="p-6 pt-2">
                    <Link to={createPageUrl(`SimpleBlogPostPage?id=${post.slug || post.id}`)}>
                      <Button variant="link" className="text-teal-600 hover:text-teal-700 p-0 font-semibold text-base">
                        קרא עוד <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}