"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  BookOpen, GraduationCap, Users, Play, Mic2, Award, 
  Moon, Sun, Star, Trophy, Heart, ArrowLeft, Menu, X, Headphones, Video
} from "lucide-react"
import { BlurText } from "@/components/ui/blur-text"
import { FadeIn } from "@/components/ui/fade-in"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { Spotlight } from "@/components/ui/spotlight"
import { Magnet } from "@/components/ui/magnet"

// Stats data
const stats = [
  { value: 15000, label: "طالب نشط", suffix: "+" },
  { value: 500, label: "معلم متخصص", suffix: "+" },
  { value: 1200, label: "ساعة تعليمية", suffix: "+" },
  { value: 98, label: "نسبة الرضا", suffix: "%" },
]

// Features data
const features = [
  { icon: BookOpen, title: "حفظ القرآن الكريم", description: "منهجية متدرجة لحفظ القرآن مع متابعة يومية من معلمين متخصصين" },
  { icon: Mic2, title: "تلاوات متميزة", description: "استمع لأجمل التلاوات من كبار القراء بجودة صوت عالية" },
  { icon: Users, title: "حلقات تفاعلية", description: "انضم إلى حلقات مباشرة مع معلمين وطلاب من حول العالم" },
  { icon: Award, title: "شهادات معتمدة", description: "احصل على إجازات وشهادات معتمدة في القرآن والقراءات" },
  { icon: Trophy, title: "مسابقات قرآنية", description: "شارك في تحديات ومسابقات لتحفيز رحلتك" },
  { icon: Heart, title: "مجتمع داعم", description: "كن جزءاً من مجتمع قرآني داعم ومحفز" },
]

// Testimonials data
const testimonials = [
  { quote: "منصة إتقان غيرت حياتي بالكامل، أصبحت أقرأ القرآن بطلاقة وأحفظ بسهولة", author: "أحمد محمد", role: "طالب" },
  { quote: "التعليم هنا مختلف تماماً، المعلمون متميزون والمنهجية فعالة جداً", author: "فاطمة علي", role: "معلمة" },
  { quote: "أفضل منصة قرآنية جربتها، أنصح كل الآباء بتسجيل أبنائهم فيها", author: "محمد الأحمد", role: "ولي أمر" },
]

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Header */}
      <header 
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">إتقان</span>
                <span className="block text-[10px] text-muted-foreground -mt-1">حلقة القرآن</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {["المميزات", "الأقسام", "آراء الطلاب"].map((label) => (
                <Link 
                  key={label}
                  href={`#${label}`} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDark}
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <Link 
                href="/login"
                className="hidden sm:flex h-10 px-5 bg-primary text-primary-foreground rounded-lg items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                تسجيل الدخول
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 rounded-lg bg-secondary flex items-center justify-center"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {["المميزات", "الأقسام", "آراء الطلاب"].map((label) => (
                <Link 
                  key={label}
                  href={`#${label}`}
                  className="block py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link 
                href="/login"
                className="block py-2 text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                تسجيل الدخول
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="currentColor" className="text-foreground"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm text-primary font-medium">منصة قرآنية متكاملة</span>
              </div>
            </FadeIn>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <BlurText 
                text="رحلتك نحو إتقان" 
                className="text-foreground"
                delay={80}
              />
              <BlurText 
                text="القرآن الكريم" 
                className="text-primary mt-2"
                delay={80}
                direction="bottom"
              />
            </h1>

            {/* Description */}
            <FadeIn delay={0.4}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                منصة تعليمية شاملة تجمع بين الأكاديمية القرآنية المتخصصة وحلقة القرآن الصوتية، لنرافقك في رحلة الحفظ والتلاوة والتجويد
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Magnet padding={40} magnetStrength={3}>
                  <Link 
                    href="/register"
                    className="group flex items-center gap-2 h-14 px-8 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                  >
                    <span>ابدأ رحلتك مجاناً</span>
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </Magnet>
                <Link 
                  href="#sections"
                  className="flex items-center gap-2 h-14 px-8 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  <span>استكشف المنصة</span>
                </Link>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.6}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border/50">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-1">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Main Sections */}
      <section id="sections" className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                اختر وجهتك
              </h2>
              <p className="text-muted-foreground text-lg">
                منصة واحدة بوجهتين، اختر ما يناسب احتياجاتك
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Academy Card */}
            <FadeIn delay={0.1} direction="right">
              <Spotlight className="h-full rounded-2xl" spotlightColor="rgba(13, 90, 60, 0.1)">
                <Link href="/academy/student" className="block h-full">
                  <div className="relative h-full min-h-[400px] p-8 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden group">
                    {/* Decorative */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-br-[80px]" />
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-black/10 rounded-tl-[100px]" />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">الأكاديمية القرآنية</h3>
                      <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                        تعلم القرآن الكريم مع معلمين متخصصين، احفظ وأتقن التجويد واحصل على إجازات معتمدة
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {["حلقات حفظ تفاعلية", "متابعة يومية مكثفة", "مسارات تعليمية متدرجة", "شهادات وإجازات"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-primary-foreground/90">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center gap-2 text-primary-foreground/90 group-hover:gap-4 transition-all">
                        <span className="font-medium">انضم للأكاديمية</span>
                        <ArrowLeft className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Spotlight>
            </FadeIn>

            {/* Halqa Card */}
            <FadeIn delay={0.2} direction="left">
              <Spotlight className="h-full rounded-2xl" spotlightColor="rgba(201, 169, 98, 0.1)">
                <Link href="/student" className="block h-full">
                  <div className="relative h-full min-h-[400px] p-8 rounded-2xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground overflow-hidden group">
                    {/* Decorative */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-br-[80px]" />
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-black/10 rounded-tl-[100px]" />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Headphones className="w-8 h-8" />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">حلقة القرآن</h3>
                      <p className="text-accent-foreground/80 mb-6 leading-relaxed">
                        استمع إلى أجمل التلاوات القرآنية من كبار القراء حول العالم بجودة صوت استثنائية
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {["تلاوات بجودة عالية", "قراء من حول العالم", "قوائم تشغيل مخصصة", "استماع بدون انترنت"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-accent-foreground/90">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center gap-2 text-accent-foreground/90 group-hover:gap-4 transition-all">
                        <span className="font-medium">استكشف التلاوات</span>
                        <ArrowLeft className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Spotlight>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                لماذا إتقان؟
              </h2>
              <p className="text-muted-foreground text-lg">
                مميزات تجعل رحلتك مع القرآن أسهل وأمتع
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ماذا يقول طلابنا
              </h2>
              <p className="text-muted-foreground text-lg">
                تجارب حقيقية من مستخدمي المنصة
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="text-4xl text-primary/20 mb-4">&ldquo;</div>
                  <p className="text-foreground/80 mb-6 leading-relaxed">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="relative max-w-4xl mx-auto p-8 md:p-16 rounded-3xl bg-primary text-primary-foreground text-center overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-[100px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-tr-[80px]" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  ابدأ رحلتك اليوم
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                  انضم إلى آلاف الطلاب الذين بدأوا رحلتهم مع القرآن الكريم
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/register"
                    className="flex items-center gap-2 h-14 px-8 bg-white text-primary rounded-xl font-medium hover:bg-white/90 transition-colors"
                  >
                    <span>سجل الآن مجاناً</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="/about"
                    className="flex items-center gap-2 h-14 px-8 bg-white/10 text-primary-foreground rounded-xl font-medium hover:bg-white/20 transition-colors"
                  >
                    تعرف علينا أكثر
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">إتقان</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                منصة قرآنية متكاملة لتعليم وحفظ القرآن الكريم
              </p>
            </div>
            
            {[
              { title: "الأكاديمية", links: ["الدورات", "المعلمون", "المسارات", "الشهادات"] },
              { title: "حلقة القرآن", links: ["التلاوات", "القراء", "القوائم", "المفضلة"] },
              { title: "الدعم", links: ["المساعدة", "تواصل معنا", "الأسئلة الشائعة", "الشروط"] },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              جميع الحقوق محفوظة © {new Date().getFullYear()} إتقان
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
