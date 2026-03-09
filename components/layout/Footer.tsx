'use client';

import Link from 'next/link';
import { Film, Github, Mail, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/about', label: t('footer.about') },
    { href: '/contact', label: t('footer.contact') },
    { href: '/privacy', label: t('footer.privacy') },
    { href: '/terms', label: t('footer.terms') },
  ];

  return (
    <footer className="border-t bg-background" role="contentinfo">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-xl font-bold">{t('app.title')}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>{t('footer.madeWith').replace('❤️', '')}</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" aria-hidden="true" />
              <span>by Nguyen Nhat Tin</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t('footer.links')}</h3>
            <nav className="flex flex-col space-y-2" aria-label="Footer links">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex items-center space-x-4" role="list" aria-label="Social media links">
              <a
                href="https://github.com/nguyennhattin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Visit our GitHub profile"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:contact@ntmovies.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Powered by TMDB API</p>
              <p>
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} {t('app.title')}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
