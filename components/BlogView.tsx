import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, Search, Tag, ArrowLeft, Share2, Facebook, Twitter as TwitterIcon, Linkedin as LinkedinIcon, Bookmark, Check, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorId: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Future of Technical Talent in Emerging Markets",
    excerpt: "Exploring how decentralized work models are empowering the next generation of African tech leaders and rewriting global hiring playbooks.",
    content: `
      <p>The global tech landscape is undergoing a seismic shift. For decades, the flow of innovation and talent was largely unidirectional, originating from established Western hubs. Today, the script is being rewritten. Decentralized work models, accelerated by global connectivity, are unlocking a reservoir of elite technical talent in emerging markets, particularly across Africa.</p>
      
      <h2>The Rise of Distributed Excellence</h2>
      <p>At Trustskep Global, we've observed a 400% increase in demand for senior-level engineers from regions like Nigeria, Kenya, and Ghana. This isn't just about cost-efficiency; it's about a unique blend of technical rigor, adaptability, and a problem-solving mindset forged in rapidly evolving ecosystems.</p>
      
      <h2>Why Vetting Matters More Than Ever</h2>
      <p>As the barrier to remote work lowers, the importance of institutional vetting rises. Our proprietary 'Trustskep Protocol' ensures that we aren't just finding developers, but identifying technical leaders who can operate within the complex governance structures of global enterprises.</p>
      
      <p>The future belongs to organizations that can successfully bridge the gap between their strategic needs and the world's best technical minds, regardless of geography.</p>
    `,
    date: "May 12, 2026",
    author: "Omikunle Timileyin Micheal",
    authorId: "trust-ceo",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    category: "Talent"
  },
  {
    id: "post-2",
    title: "Architecting High-Uptime AI Operations",
    excerpt: "Key strategies for maintaining 99.8% uptime in mission-critical data annotation and processing pipelines for global enterprise clients.",
    content: `
      <p>In the world of Artificial Intelligence, the model is only as good as the infrastructure that powers its training and deployment. High-uptime operations are the backbone of successful AI integration.</p>
      
      <h2>Redundancy by Design</h2>
      <p>We approach AI ops with a 'Failure-is-Certain' mindset. By architecting multi-region failovers and automated health checks, Trustskep maintains a 99.8% uptime for our data processing pipelines. This reliability is crucial for clients who rely on real-time data ingestion for their predictive models.</p>
      
      <h2>The Human-in-the-Loop Safeguard</h2>
      <p>Automation is powerful, but human oversight remains the ultimate fail-safe. Our hybrid squads combine automated monitoring with elite technical supervisors who can intervene at sub-millisecond speeds when anomalies are detected.</p>
      
      <p>Investing in high-uptime architecture isn't just a technical choice; it's a business insurance policy for the AI-driven era.</p>
    `,
    date: "May 08, 2026",
    author: "Engr. Sarah J.",
    authorId: "sarah-cto",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    category: "AI Ops"
  },
  {
    id: "post-3",
    title: "Bridging the Gap: Trustskep' 2026 Innovation Roadmap",
    excerpt: "An inside look at the upcoming pilot programs and prototypes launching in our Global R&D Lab focusing on blockchain and AI sync.",
    content: `
      <p>Innovation at Trustskep Global isn't just about the next few months—it's about the next decade. Our 2026 Roadmap focuses on the intersection of two transformative technologies: Blockchain and Artificial Intelligence.</p>
      
      <h2>Verifiable AI with Blockchain</h2>
      <p>One of our primary research pillars is 'Audit-Chain'—a framework using distributed ledgers to create immutable logs of AI decision-making. This is essential for highly regulated sectors like Finance and Healthcare where transparency is non-negotiable.</p>
      
      <h2>Pilot Programs Launching Q3</h2>
      <p>We are excited to announce pilot hubs in Nairobi and Lagos specifically dedicated to decentralized cloud computing resources. This initiative aims to reduce the latency for our regional AI operations while contributing to the global compute pool.</p>
    `,
    date: "April 28, 2026",
    author: "Michael O.",
    authorId: "michael-ops",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Innovation"
  }
];

interface BlogViewProps {
  onProfileClick: (id: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onProfileClick }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsBookmarked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  const handleShare = async (platform: 'linkedin' | 'twitter' | 'facebook' | 'native' | 'copy', post?: BlogPost) => {
    const activePost = post || selectedPost;
    if (!activePost) return;

    const url = window.location.href;
    const title = activePost.title;
    const text = `Check out this insight from Trustskep Global: ${title}`;
    
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        // Fallback to clipboard or social if native share fails/cancelled
      }
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (selectedPost) {
    return (
      <div className="animate-in fade-in slide-in-from-right-10 duration-700 bg-white dark:bg-slate-950 min-h-screen">
        <section className="relative h-[60vh] md:h-[75vh] overflow-hidden pt-32">
          <img 
            src={selectedPost.image} 
            className="w-full h-full object-cover" 
            alt={selectedPost.title} 
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-slate-950/20 to-transparent"></div>
          
          <div className="absolute top-32 left-0 w-full px-6 md:px-20 z-10 max-w-[1600px] mx-auto">
            <button 
              onClick={closePost}
              className="group flex items-center gap-4 text-white hover:text-blue-400 transition-colors bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/20 mb-12"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
              <span className="font-black text-xs uppercase tracking-widest">Back to Archives</span>
            </button>
            
            <div className="max-w-4xl space-y-8 animate-fade-in-up">
              <span className="px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">
                {selectedPost.category}
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
                {selectedPost.title}
              </h1>
              <div className="flex flex-wrap items-center gap-10 text-white/80">
                <button 
                  onClick={() => onProfileClick(selectedPost.authorId)}
                  className="flex items-center gap-4 hover:text-blue-400 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-black text-white border-2 border-white/20 group-hover:scale-110 transition-transform">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">{selectedPost.author}</p>
                    <div className="flex items-center gap-2 text-[10px] opacity-60">
                      Strategic Contributor <ExternalLink size={10} />
                    </div>
                  </div>
                </button>
                <div className="flex items-center gap-4 text-xs font-bold border-l border-white/20 pl-10">
                  <Calendar size={18} className="text-blue-400" />
                  {selectedPost.date}
                </div>
                <div className="flex items-center gap-4 text-xs font-bold border-l border-white/20 pl-10">
                  <Clock size={18} className="text-blue-400" />
                  {selectedPost.readTime}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="w-full px-6 md:px-20 max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-12">
              <div 
                className="prose prose-2xl dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 font-medium leading-[1.8] space-y-8 prose-headings:text-[#002B5B] dark:prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter prose-headings:mb-10 prose-h2:text-4xl prose-h2:mt-20 prose-p:mb-8 prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900 prose-blockquote:p-10 prose-blockquote:rounded-3xl prose-blockquote:text-3xl prose-blockquote:font-black prose-blockquote:italic"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              ></div>
              
              <div className="pt-20 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-10">
                 <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Share Insight:</span>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleShare('linkedin')}
                        title="Share on LinkedIn"
                        className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all border border-transparent hover:shadow-xl"
                      >
                        <LinkedinIcon size={20} />
                      </button>
                      <button 
                        onClick={() => handleShare('twitter')}
                        title="Share on X (Twitter)"
                        className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center hover:bg-[#1da1f2] hover:text-white transition-all border border-transparent hover:shadow-xl"
                      >
                        <TwitterIcon size={20} />
                      </button>
                      <button 
                        onClick={() => handleShare('copy')}
                        title="Copy Link"
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border border-transparent hover:shadow-xl ${copied ? 'bg-emerald-600 text-white' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                      >
                        {copied ? <Check size={20} /> : <LinkIcon size={20} />}
                      </button>
                    </div>
                 </div>
                 <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center gap-4 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl ${
                      isBookmarked ? 'bg-emerald-600 text-white' : 'bg-[#002B5B] text-white hover:bg-blue-600'
                    }`}
                 >
                   {isBookmarked ? <Check size={18} /> : <Bookmark size={18} />}
                   {isBookmarked ? 'Saved' : 'Save for later'}
                 </button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
              <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-white/5 sticky top-32">
                <h4 className="text-2xl font-black text-[#002B5B] dark:text-white mb-8 tracking-tighter">About the Author</h4>
                <div className="space-y-8">
                  <button 
                    onClick={() => onProfileClick(selectedPost.authorId)}
                    className="flex items-center gap-6 text-left group w-full"
                  >
                    <div className="w-20 h-20 rounded-[1.5rem] bg-blue-600 flex items-center justify-center text-3xl font-black text-white shadow-xl group-hover:scale-105 transition-transform">
                       {selectedPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xl font-black text-[#002B5B] dark:text-white leading-none group-hover:text-blue-600 transition-colors">{selectedPost.author}</p>
                      <p className="text-xs font-bold text-blue-600 mt-2 uppercase tracking-widest">Global Strategist</p>
                    </div>
                  </button>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Lead strategist specializing in decentralized workforce ecosystems and emerging technical market trends across EMEA.
                  </p>
                  <button 
                    onClick={() => onProfileClick(selectedPost.authorId)}
                    className="w-full py-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest text-[#002B5B] dark:text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    View Full Profile <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-1000 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <section className="relative h-[65vh] flex items-center overflow-hidden bg-slate-950 pt-32">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-business-lady-writes-in-a-diary-close-up-1601-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent"></div>
        </div>
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          <div className="max-w-5xl space-y-8">
            <h1 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-none animate-fade-in-up">Insights & <br /><span className="shimmer-text">Perspectives.</span></h1>
            <p className="text-2xl text-slate-200 font-medium max-w-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>Expert commentary on technical excellence and the future of global innovation.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="w-full px-6 sm:px-10 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filteredPosts.map((post, i) => (
              <div 
                key={post.id} 
                className="group flex flex-col h-full bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-xl hover:-translate-y-4 transition-all duration-700 overflow-hidden"
              >
                <div className="aspect-[16/10] relative overflow-hidden cursor-pointer" onClick={() => handleReadPost(post)}>
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={post.title} />
                  <div className="absolute top-8 left-8 px-5 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">
                    {post.category}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-slate-900 px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest scale-90 group-hover:scale-100 transition-transform">Read Article</span>
                  </div>
                </div>
                <div className="p-10 lg:p-14 space-y-6 flex-grow flex flex-col">
                  <h3 
                    className="text-3xl font-black text-[#002B5B] dark:text-white leading-[1.1] tracking-tighter group-hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => handleReadPost(post)}
                  >
                    {post.title}
                  </h3>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-8 mt-auto border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <button 
                      onClick={() => handleReadPost(post)}
                      className="flex items-center gap-4 text-blue-600 font-black uppercase text-xs tracking-[0.3em] group-hover:gap-6 transition-all"
                    >
                      Full Insight <ChevronRight size={18} />
                    </button>
                    <div className="flex gap-4">
                       <button 
                         onClick={(e) => { e.stopPropagation(); handleShare('linkedin', post); }}
                         className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                         title="Share on LinkedIn"
                       >
                         <LinkedinIcon size={16} />
                       </button>
                       <button 
                         onClick={(e) => { e.stopPropagation(); handleShare('native', post); }}
                         className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-600 hover:text-white transition-all"
                         title="Share"
                       >
                         <Share2 size={16} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
