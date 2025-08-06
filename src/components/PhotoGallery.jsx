import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Camera, Upload, Trash2, Edit, Eye, Lock, Unlock, Plus, X, Search, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import tournamentLogo from '../assets/logo400.png';
/*import { API_ENDPOINTS } from '../config/api';*/
import insta1 from '../assets/Insta1.png';
import insta2 from '../assets/Insta2.png';
import insta3 from '../assets/Insta3.png';
import insta4 from '../assets/Insta4.png';
import insta5 from '../assets/Insta5.png';
import insta6 from '../assets/Insta6.png';
import insta7 from '../assets/Insta7.png';
import insta8 from '../assets/Insta8.png';
import insta9 from '../assets/Insta9.png';
import insta10 from '../assets/Insta10.png';
import insta11 from '../assets/Insta11.png';
import insta12 from '../assets/Insta12.png';


// List of Instagram links to show:
const instagramPosts = [
 { img: insta1, url:  'https://www.instagram.com/p/DLkZ9b3SIsO/',},
 { img: insta2, url:  'https://www.instagram.com/p/DLkWBveyPmu/',},
 { img: insta3, url:  'https://www.instagram.com/p/DLkUn48yYlu/',},
 { img: insta4, url:  'https://www.instagram.com/p/DJ8r7HJyt_C/',},
 { img: insta5, url:  'https://www.instagram.com/p/DDq-9Ktyi2K/',},
 { img: insta6, url:  'https://www.instagram.com/p/DDq-4c4S_MO/',},
 { img: insta7, url:  'https://www.instagram.com/p/DDqr3wbSWIA/',},
 { img: insta8, url:  'https://www.instagram.com/p/DDosYT9CBUG/',},
 { img: insta9, url:  'https://www.instagram.com/p/DDhYm9NSCKD/',},
 { img: insta10, url:  'https://www.instagram.com/p/DDhGfGkSLM5/',},
 { img: insta11, url:  'https://www.instagram.com/p/DDeh4MRSQdM/',},
 { img: insta12, url:  'https://www.instagram.com/p/DDcCxU7y1I4/',}
];



const PhotoGallery = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <img 
          src={tournamentLogo} 
          alt="Tournament Logo" 
          className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Photo Gallery</h1>
        <p className="text-gray-600">
          Click any photo to visit the post on Instagram.
        </p>
      </motion.div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {instagramPosts.map(({ img, url }, idx) => (
          <Card key={url} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
              title="View on Instagram"
            >
              <CardContent className="p-0 relative flex flex-col h-full">
                <img
                  src={img}
                  alt={`Instagram post ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity bg-gray-200"
                  style={{ background: '#fafafa' }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                  <span className="text-white font-bold text-xl">View on Instagram</span>
                </div>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default PhotoGallery;