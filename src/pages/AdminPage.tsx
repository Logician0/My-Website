'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit2, Send, LogOut, 
  CheckCircle2, XCircle, Eye, Settings, Film, 
  Globe, Loader2, Key, Github, Play, ExternalLink,
  Tv, Smartphone, Compass, Layers, Cpu, Laptop
} from 'lucide-react';
import { motion } from 'framer-motion';
import initialPortfolioData from '../data/portfolio.json';

// Types derived from schema
type Ratio = "16/9" | "9/16";

export function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  
  // Data State
  const [data, setData] = useState<any>(initialPortfolioData);
  const [activeTab, setActiveTab] = useState<'homepage' | 'library' | 'settings'>('homepage');
  
  // Selection States
  const [selectedListKey, setSelectedListKey] = useState<string>('desktopVideos');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  // Library specific states
  const [selectedServiceIdx, setSelectedServiceIdx] = useState<number>(0);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
  const [selectedLibraryItemIdx, setSelectedLibraryItemIdx] = useState<number>(-1);

  // Settings / Git State
  const [githubPat, setGithubPat] = useState(() => localStorage.getItem('github_pat') || '');
  const [repoOwner, setRepoOwner] = useState('Logician0');
  const [repoName, setRepoName] = useState('My-Website');
  const [branch, setBranch] = useState('main');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  // Verify auth on mount
  useEffect(() => {
    const isAuthed = sessionStorage.getItem('admin_auth') === 'true';
    if (isAuthed) setAuth(true);
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Ram1.0lc') {
      setAuth(true);
      sessionStorage.setItem('admin_auth', 'true');
      setPasswordError(false);
    } else {
      setPasswordError(true);
      // micro-shake effect triggers
      setTimeout(() => setPasswordError(false), 500);
    }
  };

  const handleLogout = () => {
    setAuth(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  const saveGithubPat = (token: string) => {
    setGithubPat(token);
    localStorage.setItem('github_pat', token);
    addLog('GitHub Personal Access Token updated.');
  };

  // Git Push updates
  const handlePublish = async () => {
    if (!githubPat) {
      alert('Please enter your GitHub Personal Access Token in Settings!');
      setActiveTab('settings');
      return;
    }

    setIsPublishing(true);
    setPublishStatus('idle');
    setLogs([]);
    addLog('Initiating publish sequence...');

    try {
      const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/src/data/portfolio.json`;
      const authHeader = {
        'Authorization': `token ${githubPat}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      };

      // 1. Fetch current file info to get latest SHA
      addLog('Fetching current portfolio database reference from GitHub...');
      const getRes = await fetch(url, { headers: authHeader });
      
      let sha = '';
      if (getRes.status === 200) {
        const fileData = await getRes.json();
        sha = fileData.sha;
        addLog(`Successfully retrieved SHA: ${sha.substring(0, 7)}`);
      } else if (getRes.status === 404) {
        addLog('File not found on GitHub. Creating a new database file...');
      } else {
        throw new Error(`Failed to fetch file metadata. Status: ${getRes.status}`);
      }

      // 2. Put the updated content
      addLog('Encoding updated content to Base64...');
      const updatedJsonString = JSON.stringify(data, null, 2);
      // Use standard b64 conversion safe for Unicode characters
      const utf8Bytes = new TextEncoder().encode(updatedJsonString);
      const binaryString = Array.from(utf8Bytes, byte => String.fromCharCode(byte)).join('');
      const base64Content = window.btoa(binaryString);

      addLog('Sending commit payload to GitHub API...');
      const putRes = await fetch(url, {
        method: 'PUT',
        headers: authHeader,
        body: JSON.stringify({
          message: 'admin: update portfolio cards database',
          content: base64Content,
          sha: sha || undefined,
          branch: branch
        })
      });

      if (putRes.ok) {
        const commitData = await putRes.json();
        addLog(`Commit successful! Hash: ${commitData.commit.sha.substring(0, 7)}`);
        addLog('Vercel deployment triggered automatically. Changes will update live within 2-3 minutes.');
        setPublishStatus('success');
      } else {
        const errBody = await putRes.json();
        throw new Error(errBody.message || 'PUT request failed');
      }

    } catch (err: any) {
      addLog(`[Error] ${err.message || err}`);
      setPublishStatus('error');
    } finally {
      setIsPublishing(false);
    }
  };

  // Card list selectors helper
  const getHomepageList = () => {
    return data.servicesRound[selectedListKey] || [];
  };

  const updateHomepageList = (newList: any[]) => {
    setData((prev: any) => ({
      ...prev,
      servicesRound: {
        ...prev.servicesRound,
        [selectedListKey]: newList
      }
    }));
  };

  // Modify Card Values
  const handleCardFieldChange = (field: string, value: any) => {
    if (!selectedItem) return;
    
    const updated = { ...selectedItem, [field]: value };
    setSelectedItem(updated);
    
    // Live update draft state in dynamic array so preview matches instantly
    if (activeTab === 'homepage') {
      if (selectedListKey === 'webCenterpiece') {
        setData((prev: any) => ({
          ...prev,
          servicesRound: {
            ...prev.servicesRound,
            webCenterpiece: updated
          }
        }));
      } else {
        const currentList = [...getHomepageList()];
        const idx = currentList.findIndex((item: any) => item.id === selectedItem.id);
        if (idx !== -1) {
          currentList[idx] = updated;
          updateHomepageList(currentList);
        }
      }
    } else if (activeTab === 'library') {
      const servicesCopy = [...data.services];
      const service = { ...servicesCopy[selectedServiceIdx] };
      const categories = [...service.categories];
      const category = { ...categories[selectedCategoryIdx] };
      const items = [...category.items];
      
      items[selectedLibraryItemIdx] = updated;
      category.items = items;
      categories[selectedCategoryIdx] = category;
      service.categories = categories;
      servicesCopy[selectedServiceIdx] = service;
      
      setData((prev: any) => ({
        ...prev,
        services: servicesCopy
      }));
    }
  };

  // Lock check helper
  const isDeleteLocked = () => {
    if (activeTab === 'homepage') {
      return ['desktopVideos', 'webProjects', 'webCenterpiece'].includes(selectedListKey);
    }
    return false; // library pages items don't lock delete
  };

  // Add Item Card handler
  const handleAddNewItem = () => {
    
    if (activeTab === 'homepage') {
      const isVideo = selectedListKey.toLowerCase().includes('video');
      const isVertical = selectedListKey === 'mobileVerticalVideos';
      
      const newCard: any = isVideo ? {
        id: `card-${Date.now()}`,
        title: 'New Video Card',
        category: 'Edit',
        youtubeId: 'dQw4w9WgXcQ',
        ratio: isVertical ? '9/16' : '16/9',
        customThumb: ''
      } : {
        id: `card-${Date.now()}`,
        title: 'New Web Project',
        tech: 'Next.js',
        link: 'https://logiciancreatives.in',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
      };

      if (selectedListKey === 'desktopVideos') {
        newCard.gridClass = 'col-span-1 row-span-1';
        newCard.w = '120%';
        newCard.h = '120%';
        newCard.showOn = 'desktop';
      } else if (selectedListKey === 'webProjects') {
        newCard.gridClass = 'col-span-1 row-span-1';
      }

      // Add to list
      const list = [...getHomepageList(), newCard];
      updateHomepageList(list);
      setSelectedItem(newCard);

    } else if (activeTab === 'library') {
      const isVideo = data.services[selectedServiceIdx].slug === 'video-editing';
      const newItem: any = {
        id: `lib-${Date.now()}`,
        title: 'New Project Title',
        description: 'New project description detailing capabilities.',
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
        tags: ['New', 'Creative'],
        metadata: isVideo ? {
          type: 'video',
          youtubeId: 'dQw4w9WgXcQ',
          aspect: '16/9'
        } : {
          type: 'web',
          url: 'https://logiciancreatives.in',
          stack: 'React + Tailwind',
          features: ['Landing Page']
        }
      };

      const servicesCopy = [...data.services];
      const service = { ...servicesCopy[selectedServiceIdx] };
      const categories = [...service.categories];
      const category = { ...categories[selectedCategoryIdx] };
      const items = [...category.items, newItem];
      
      category.items = items;
      categories[selectedCategoryIdx] = category;
      service.categories = categories;
      servicesCopy[selectedServiceIdx] = service;

      setData((prev: any) => ({
        ...prev,
        services: servicesCopy
      }));
      setSelectedItem(newItem);
      setSelectedLibraryItemIdx(items.length - 1);
    }
  };

  // Delete Card handler
  const handleDeleteItem = (idToDelete: string) => {
    if (isDeleteLocked()) {
      alert('Delete feature is locked for desktop section cards.');
      return;
    }
    
    if (confirm('Are you sure you want to delete this card?')) {
      if (activeTab === 'homepage') {
        const filtered = getHomepageList().filter((item: any) => item.id !== idToDelete);
        updateHomepageList(filtered);
        setSelectedItem(null);
      } else if (activeTab === 'library') {
        const servicesCopy = [...data.services];
        const service = { ...servicesCopy[selectedServiceIdx] };
        const categories = [...service.categories];
        const category = { ...categories[selectedCategoryIdx] };
        const items = category.items.filter((item: any) => item.id !== idToDelete);
        
        category.items = items;
        categories[selectedCategoryIdx] = category;
        service.categories = categories;
        servicesCopy[selectedServiceIdx] = service;

        setData((prev: any) => ({
          ...prev,
          services: servicesCopy
        }));
        setSelectedItem(null);
        setSelectedLibraryItemIdx(-1);
      }
    }
  };

  // Live Previews UI helper
  const renderLivePreview = () => {
    if (!selectedItem) {
      return (
        <div className="flex flex-col items-center justify-center h-48 text-zinc-500 border border-dashed border-zinc-800 rounded-3xl">
          <Eye className="w-6 h-6 mb-2 opacity-50" />
          <p className="text-[10px] uppercase tracking-wider">Select a card to see live preview</p>
        </div>
      );
    }

    const isVideo = selectedItem.youtubeId !== undefined || (selectedItem.metadata && selectedItem.metadata.type === 'video');
    const ytId = selectedItem.youtubeId || (selectedItem.metadata && selectedItem.metadata.youtubeId) || '';
    const isVertical = selectedItem.ratio === '9/16' || (selectedItem.metadata && selectedItem.metadata.aspect === '9/16');
    const image = selectedItem.customThumb || selectedItem.image || selectedItem.thumbnail || (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800');
    
    const title = selectedItem.title || 'Untitled Card';
    const subtitle = selectedItem.category || selectedItem.tech || (selectedItem.tags ? selectedItem.tags.join(' + ') : 'Tag');

    const showGridSim = activeTab === 'homepage' && ['desktopVideos', 'webProjects'].includes(selectedListKey);

    return (
      <div className="flex flex-col items-center justify-center p-2 w-full">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Live Preview</h4>
        
        {/* Frame simulator */}
        <div className="relative p-3 rounded-2xl border border-white/5 bg-zinc-950/80 shadow-2xl flex justify-center items-center overflow-hidden w-full max-w-sm">
          {/* Top gloss */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

          {isVideo ? (
            /* VIDEO CARD PREVIEW */
            <div className={`relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10 shadow-lg group cursor-pointer ${isVertical ? 'aspect-[9/16] w-[140px]' : 'aspect-video w-[280px]'}`}>
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={image} 
                  alt="" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-80" 
                  style={{
                    width: selectedItem.w || '100%',
                    height: selectedItem.h || '100%',
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-cyan-400 text-[8px] font-bold uppercase tracking-widest mb-0.5">{subtitle}</p>
                <h3 className="text-white text-[10px] font-bold leading-tight line-clamp-2">{title}</h3>
              </div>
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <Play className="w-2 h-2 text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
          ) : (
            /* WEBSITE CARD PREVIEW */
            <div className={`relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10 shadow-lg group cursor-pointer ${selectedItem.isCenterpiece ? 'w-[160px] h-[160px] rotate-45 border-purple-500' : 'aspect-video w-[280px]'}`}>
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={image} 
                  alt="" 
                  className={`absolute object-cover opacity-75 ${
                    selectedItem.isCenterpiece 
                      ? '-rotate-45 w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' 
                      : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  }`} 
                  style={selectedItem.isCenterpiece ? undefined : {
                    width: selectedItem.w || '100%',
                    height: selectedItem.h || '100%',
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className={`absolute inset-0 flex flex-col justify-end p-3.5 ${selectedItem.isCenterpiece ? '-rotate-45' : ''}`}>
                <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest mb-0.5">{subtitle}</p>
                <h3 className="text-white text-[10px] font-bold leading-tight line-clamp-1">{title}</h3>
              </div>
              {!selectedItem.isCenterpiece && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <ExternalLink className="w-2 h-2 text-white" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 8-COLUMN GRID SIMULATOR */}
        {showGridSim && (
          <div className="mt-3 w-full border-t border-white/5 pt-3">
            <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 text-center">Desktop Grid Simulator</p>
            <div className="grid grid-cols-8 gap-1.5 auto-rows-[35px] w-full bg-zinc-950/80 p-2 rounded-xl border border-white/5 relative overflow-hidden">
              {/* Selected Card */}
              <div 
                className={`${selectedItem.gridClass || 'col-span-1 row-span-1'} relative overflow-hidden rounded-lg bg-zinc-900 border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.15)] flex flex-col justify-between p-1`}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img 
                    src={image} 
                    alt="" 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-40"
                    style={{
                      width: selectedItem.w || '100%',
                      height: selectedItem.h || '100%',
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent z-10" />

                <div className="relative z-10 flex justify-between items-start w-full scale-75 origin-top-left">
                  <span className="text-[6px] bg-cyan-500/25 text-cyan-400 font-bold px-0.5 rounded border border-cyan-500/20 uppercase tracking-widest">Active</span>
                </div>

                <div className="relative z-10 mt-auto">
                  <h4 className="text-white text-[7px] font-bold leading-none truncate">{title}</h4>
                </div>
              </div>

              {/* Dotted dummy placeholders */}
              {Array.from({ length: 9 }).map((_, i) => (
                <div 
                  key={i} 
                  className="col-span-1 row-span-1 border border-dashed border-zinc-800/80 rounded-md bg-zinc-950/20 flex items-center justify-center text-[7px] text-zinc-700 select-none font-mono"
                >
                  +
                </div>
              ))}
            </div>
            <p className="text-[8px] text-zinc-500 mt-1 text-center font-mono uppercase tracking-wider">
              Actual scale: {selectedItem.gridClass || 'col-span-1 row-span-1'}
            </p>
          </div>
        )}
      </div>
    );
  };

  // --- PASSWORD PROTECTION UI ---
  if (!auth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Grain overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        {/* Glowing backdrop blobs */}
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[180px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full max-w-md p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden ${
            passwordError ? 'animate-shake border-red-500/50 shadow-red-950/20' : ''
          }`}
        >
          {/* Top Edge Gloss */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center shadow-inner mb-4">
              <Key className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Authentication Required</h2>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 text-center">Enter passcode to access Logician Admin Console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-center tracking-widest focus:outline-none focus:border-white/30 transition-colors"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg"
            >
              Unlock Console
            </button>
          </form>
        </motion.div>

        {/* Global style injection for shake keyframes */}
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  // --- MAIN ADMIN PANEL UI ---
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 font-sans relative overflow-hidden flex flex-col">
      {/* Backdrops */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[400px] bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex flex-col">
        {/* Admin Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-widest text-white leading-none">Console</h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Authorized Logician Panel</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Publishing
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Publish Changes
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Lock
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 mb-8">
          <button 
            onClick={() => { setActiveTab('homepage'); setSelectedItem(null); }}
            className={`px-5 py-3.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              activeTab === 'homepage' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Homepage Sections
          </button>
          <button 
            onClick={() => { setActiveTab('library'); setSelectedItem(null); setSelectedLibraryItemIdx(-1); }}
            className={`px-5 py-3.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              activeTab === 'library' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Library Pages
          </button>
          <button 
            onClick={() => { setActiveTab('settings'); setSelectedItem(null); }}
            className={`px-5 py-3.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              activeTab === 'settings' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Git Settings
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==================== HOMEPAGE SECTIONS TAB ==================== */}
          {activeTab === 'homepage' && (
            <>
              {/* Top Horizontal Icon Tabs Selector */}
              <div className="col-span-12 mb-2 bg-zinc-900/30 backdrop-blur-xl border border-white/5 p-2 rounded-2xl shadow-xl flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
                {[
                  { key: 'desktopVideos', label: 'Desktop Videos', icon: <Film className="w-4 h-4" /> },
                  { key: 'mobileHorizontalVideos', label: 'Mobile Horizontal', icon: <Tv className="w-4 h-4" /> },
                  { key: 'mobileVerticalVideos', label: 'Mobile Reels', icon: <Smartphone className="w-4 h-4" /> },
                  { key: 'webProjects', label: 'Web Projects', icon: <Globe className="w-4 h-4" /> },
                  { key: 'webCenterpiece', label: 'Web Centerpiece', icon: <Compass className="w-4 h-4" /> },
                  { key: 'mobileWebItems', label: 'Mobile Web', icon: <Layers className="w-4 h-4" /> },
                  { key: 'mobileAppItems', label: 'Mobile Apps', icon: <Cpu className="w-4 h-4" /> }
                ].map(section => (
                  <button
                    key={section.key}
                    onClick={() => { setSelectedListKey(section.key); setSelectedItem(null); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap border ${
                      selectedListKey === section.key 
                        ? 'bg-white text-black border-white shadow-lg' 
                        : 'text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    {section.icon}
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>

              {/* Items List & Edit Form (Now expanded to col-span-8) */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Cards List */}
                <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Cards</h3>
                    {selectedListKey !== 'webCenterpiece' && (
                      <button
                        onClick={handleAddNewItem}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-white/10 transition-all active:scale-95"
                      >
                        <Plus className="w-3 h-3" />
                        Add Card
                      </button>
                    )}
                  </div>

                  {/* List element scroll */}
                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                    {selectedListKey === 'webCenterpiece' ? (
                      /* Special Single Item centerpiece row */
                      <button
                        onClick={() => setSelectedItem(data.servicesRound.webCenterpiece)}
                        className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                          selectedItem?.id === data.servicesRound.webCenterpiece.id
                            ? 'border-white bg-white/5'
                            : 'border-white/5 bg-zinc-950/50 hover:bg-zinc-900/50'
                        }`}
                      >
                        <div>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{data.servicesRound.webCenterpiece.tech}</p>
                          <h4 className="text-xs font-bold text-white uppercase">{data.servicesRound.webCenterpiece.title}</h4>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 uppercase tracking-widest border border-purple-500/20">Centerpiece</span>
                      </button>
                    ) : (
                      getHomepageList().map((card: any) => (
                        <div
                          key={card.id}
                          className={`w-full p-3.5 rounded-xl border text-left flex justify-between items-center transition-all ${
                            selectedItem?.id === card.id
                              ? 'border-white bg-white/5'
                              : 'border-white/5 bg-zinc-950/50'
                          }`}
                        >
                          <button
                            onClick={() => setSelectedItem(card)}
                            className="flex-grow text-left"
                          >
                            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">{card.category || card.tech || 'Item'}</p>
                            <h4 className="text-xs font-bold text-white uppercase tracking-tight line-clamp-1">{card.title}</h4>
                          </button>
                          
                          {/* Delete lock validation */}
                          <button
                            onClick={() => handleDeleteItem(card.id)}
                            disabled={isDeleteLocked()}
                            className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-500 ml-2"
                            title={isDeleteLocked() ? "Deletion locked for desktop cards" : "Delete Card"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Card Fields Edit Form */}
                {selectedItem && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl space-y-4"
                  >
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Edit2 className="w-4 h-4 text-zinc-400" />
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Edit Card Details</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Card Title</label>
                        <input
                          type="text"
                          value={selectedItem.title || ''}
                          onChange={(e) => handleCardFieldChange('title', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                        />
                      </div>

                      {/* Video specific inputs */}
                      {selectedItem.youtubeId !== undefined && (
                        <>
                          {/* Youtube ID */}
                          <div className="col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">YouTube ID</label>
                            <input
                              type="text"
                              value={selectedItem.youtubeId || ''}
                              onChange={(e) => handleCardFieldChange('youtubeId', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            />
                          </div>

                          {/* Category Tag */}
                          <div className="col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Category Tag</label>
                            <input
                              type="text"
                              value={selectedItem.category || ''}
                              onChange={(e) => handleCardFieldChange('category', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            />
                          </div>

                          {/* Aspect Ratio */}
                          <div className="col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Aspect Ratio</label>
                            <select
                              value={selectedItem.ratio || '16/9'}
                              onChange={(e) => handleCardFieldChange('ratio', e.target.value as Ratio)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            >
                              <option value="16/9">16:9 (Horizontal)</option>
                              <option value="9/16">9:16 (Vertical)</option>
                            </select>
                          </div>

                          {/* Custom Thumbnail with Fetch HD button */}
                          <div className="col-span-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5 font-bold">Custom Image URL (Optional)</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Auto YouTube thumbnail if empty"
                                value={selectedItem.customThumb || ''}
                                onChange={(e) => handleCardFieldChange('customThumb', e.target.value)}
                                className="flex-grow px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (selectedItem.youtubeId) {
                                    handleCardFieldChange('customThumb', `https://img.youtube.com/vi/${selectedItem.youtubeId}/maxresdefault.jpg`);
                                  } else {
                                    alert('Please enter a YouTube Video ID first.');
                                  }
                                }}
                                className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
                              >
                                <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                                Fetch HD
                              </button>
                            </div>
                          </div>

                          {/* Image Thumbnail / Iframe Zoom w & h */}
                          <div className="col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5 font-bold">Zoom Width (e.g. 120%)</label>
                            <input
                              type="text"
                              placeholder="e.g. 100%"
                              value={selectedItem.w || ''}
                              onChange={(e) => handleCardFieldChange('w', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5 font-bold">Zoom Height (e.g. 120%)</label>
                            <input
                              type="text"
                              placeholder="e.g. 100%"
                              value={selectedItem.h || ''}
                              onChange={(e) => handleCardFieldChange('h', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            />
                          </div>
                        </>
                      )}

                      {/* Website specific inputs */}
                      {selectedItem.youtubeId === undefined && (
                        <>
                          {/* Tech Stack tag */}
                          <div className="col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Tech / Subtitle</label>
                            <input
                              type="text"
                              value={selectedItem.tech || ''}
                              onChange={(e) => handleCardFieldChange('tech', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            />
                          </div>

                          {/* Tech Stack link */}
                          <div className="col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Project URL</label>
                            <input
                              type="text"
                              value={selectedItem.link || ''}
                              onChange={(e) => handleCardFieldChange('link', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            />
                          </div>

                          {/* Image Thumbnail Link */}
                          <div className="col-span-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Image URL</label>
                            <input
                              type="text"
                              value={selectedItem.image || ''}
                              onChange={(e) => handleCardFieldChange('image', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            />
                          </div>
                        </>
                      )}

                      {/* GridClass (Desktop Video/Web grid layouts only) */}
                      {['desktopVideos', 'webProjects'].includes(selectedListKey) && (
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Grid Layout Class</label>
                          <input
                            type="text"
                            value={selectedItem.gridClass || ''}
                            onChange={(e) => handleCardFieldChange('gridClass', e.target.value)}
                            placeholder="e.col-span-3 row-span-1"
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20 font-mono"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sticky Live Preview Column */}
              <div className="col-span-12 lg:col-span-4 order-first lg:order-last sticky top-[72px] lg:top-28 z-30 bg-black/90 backdrop-blur-md border-b lg:border-none border-white/10 shadow-lg lg:shadow-none pb-4 pt-2 lg:py-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-2xl lg:rounded-3xl p-3 lg:p-6 shadow-2xl">
                  {renderLivePreview()}
                </div>
              </div>
            </>
          )}

          {/* ==================== LIBRARY PAGES TAB ==================== */}
          {activeTab === 'library' && (
            <>
              {/* Top Horizontal Selectors for Library Service Pages & Categories */}
              <div className="col-span-12 mb-2 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Service Page segmented control */}
                <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 p-1 rounded-2xl shadow-xl flex w-full max-w-md">
                  {data.services.map((service: any, idx: number) => {
                    const isVideo = service.slug === 'video-editing';
                    return (
                      <button
                        key={service.id}
                        onClick={() => { 
                          setSelectedServiceIdx(idx); 
                          setSelectedCategoryIdx(0); 
                          setSelectedItem(null);
                          setSelectedLibraryItemIdx(-1);
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border ${
                          selectedServiceIdx === idx 
                            ? 'bg-white text-black border-white shadow-md' 
                            : 'text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/5'
                        }`}
                      >
                        {isVideo ? <Film className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                        <span>{service.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Categories slider */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 w-full md:w-auto scroll-smooth">
                  {data.services[selectedServiceIdx].categories.map((category: any, idx: number) => (
                    <button
                      key={category.id}
                      onClick={() => { 
                        setSelectedCategoryIdx(idx); 
                        setSelectedItem(null);
                        setSelectedLibraryItemIdx(-1);
                      }}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap border ${
                        selectedCategoryIdx === idx 
                          ? 'bg-zinc-800 text-white border-zinc-700 shadow-md' 
                          : 'text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items list & Form (Expanded to col-span-8) */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Library Items</h3>
                    <button
                      onClick={handleAddNewItem}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-white/10 transition-all active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                      Add Project
                    </button>
                  </div>

                  {/* Category Items list */}
                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                    {data.services[selectedServiceIdx].categories[selectedCategoryIdx].items.map((item: any, idx: number) => {
                      const isVideo = item.metadata.type === 'video';
                      return (
                        <div
                          key={item.id}
                          className={`w-full p-3.5 rounded-xl border text-left flex justify-between items-center transition-all ${
                            selectedLibraryItemIdx === idx
                              ? 'border-white bg-white/5'
                              : 'border-white/5 bg-zinc-950/50'
                          }`}
                        >
                          <button
                            onClick={() => { setSelectedItem(item); setSelectedLibraryItemIdx(idx); }}
                            className="flex-grow text-left"
                          >
                            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">{isVideo ? 'Video' : 'Web Link'}</p>
                            <h4 className="text-xs font-bold text-white uppercase tracking-tight line-clamp-1">{item.title}</h4>
                          </button>
                          
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-2"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Edit Form */}
                {selectedItem && selectedLibraryItemIdx !== -1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl space-y-4"
                  >
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Edit2 className="w-4 h-4 text-zinc-400" />
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Edit Library Item</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Project Title</label>
                        <input
                          type="text"
                          value={selectedItem.title || ''}
                          onChange={(e) => handleCardFieldChange('title', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                        />
                      </div>

                      {/* Description */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Description</label>
                        <textarea
                          rows={3}
                          value={selectedItem.description || ''}
                          onChange={(e) => handleCardFieldChange('description', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20 resize-none"
                        />
                      </div>

                      {/* Thumbnail Image URL with optional YouTube Fetcher */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5 font-bold">Thumbnail Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Auto YouTube thumbnail if empty"
                            value={selectedItem.thumbnail || ''}
                            onChange={(e) => handleCardFieldChange('thumbnail', e.target.value)}
                            className="flex-grow px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                          />
                          {selectedItem.metadata?.type === 'video' && (
                            <button
                              type="button"
                              onClick={() => {
                                if (selectedItem.metadata.youtubeId) {
                                  handleCardFieldChange('thumbnail', `https://img.youtube.com/vi/${selectedItem.metadata.youtubeId}/maxresdefault.jpg`);
                                } else {
                                  alert('Please enter a YouTube Video ID first.');
                                }
                              }}
                              className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
                            >
                              <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                              Fetch HD
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Tags (comma separated) */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Tags (Comma Separated)</label>
                        <input
                          type="text"
                          value={selectedItem.tags ? selectedItem.tags.join(', ') : ''}
                          onChange={(e) => handleCardFieldChange('tags', e.target.value.split(',').map((t: string) => t.trim()))}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                        />
                      </div>

                      {/* Metadata Inputs based on Project Type */}
                      {selectedItem.metadata.type === 'video' ? (
                        <>
                          {/* Youtube ID */}
                          <div className="col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">YouTube Video ID</label>
                            <input
                              type="text"
                              value={selectedItem.metadata.youtubeId || ''}
                              onChange={(e) => handleCardFieldChange('metadata', { ...selectedItem.metadata, youtubeId: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            />
                          </div>

                          {/* Aspect Ratio */}
                          <div className="col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Video Layout Ratio</label>
                            <select
                              value={selectedItem.metadata.aspect || '16/9'}
                              onChange={(e) => handleCardFieldChange('metadata', { ...selectedItem.metadata, aspect: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            >
                              <option value="16/9">16:9 (Horizontal)</option>
                              <option value="9/16">9:16 (Vertical)</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Project URL */}
                          <div className="col-span-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Project Launch URL</label>
                            <input
                              type="text"
                              value={selectedItem.metadata.url || ''}
                              onChange={(e) => handleCardFieldChange('metadata', { ...selectedItem.metadata, url: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sticky live preview side */}
              <div className="col-span-12 lg:col-span-4 order-first lg:order-last sticky top-[72px] lg:top-28 z-30 bg-black/90 backdrop-blur-md border-b lg:border-none border-white/10 shadow-lg lg:shadow-none pb-4 pt-2 lg:py-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-2xl lg:rounded-3xl p-3 lg:p-6 shadow-2xl">
                  {renderLivePreview()}
                </div>
              </div>
            </>
          )}

          {/* ==================== SETTINGS / GIT CONFIG TAB ==================== */}
          {activeTab === 'settings' && (
            <div className="col-span-12 max-w-2xl mx-auto w-full space-y-6">
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl space-y-6">
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
                  <Github className="w-5 h-5 text-zinc-400" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">GitHub API Integration</h3>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  To publish your changes live to your production website (Vercel), enter a GitHub Personal Access Token (classic or fine-grained) with access to write to your repository. This token is stored <strong>only</strong> in your local browser's storage.
                </p>

                <div className="space-y-4">
                  {/* PAT */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Personal Access Token (PAT)</label>
                    <input
                      type="password"
                      placeholder="ghp_..."
                      value={githubPat}
                      onChange={(e) => saveGithubPat(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20 font-mono tracking-widest"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Owner */}
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Repo Owner</label>
                      <input
                        type="text"
                        value={repoOwner}
                        onChange={(e) => setRepoOwner(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                      />
                    </div>
                    {/* Repo */}
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Repo Name</label>
                      <input
                        type="text"
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                      />
                    </div>
                  </div>

                  {/* Branch */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Target Branch</label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none focus:border-white/20"
                    />
                  </div>
                </div>
              </div>

              {/* Status / Log Terminal */}
              {logs.length > 0 && (
                <div className="bg-zinc-950 border border-white/5 rounded-3xl p-6 shadow-2xl font-mono text-[11px] text-zinc-400 space-y-2">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Publish Logs</span>
                    {publishStatus === 'success' && <span className="text-emerald-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Complete</span>}
                    {publishStatus === 'error' && <span className="text-red-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Failed</span>}
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1.5 no-scrollbar">
                    {logs.map((log, index) => (
                      <div key={index} className={log.includes('[Error]') ? 'text-red-400' : log.includes('successful') ? 'text-emerald-400' : ''}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
