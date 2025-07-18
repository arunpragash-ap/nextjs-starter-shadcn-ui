'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, Hash, Book, Settings, Palette, Moon, Terminal, Package, ExternalLink } from 'lucide-react';

// Define the type for search items
type SearchItem = {
    id: number;
    title: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    url: string;
};

// Mock data for search results
const searchData: SearchItem[] = [
    {
        id: 1,
        title: "Introduction",
        description: "Getting started with the documentation",
        category: "Get Started",
        icon: <Book className="w-4 h-4" />,
        url: "/docs/introduction"
    },
    {
        id: 2,
        title: "Installation",
        description: "How to install and set up the project",
        category: "Get Started",
        icon: <Package className="w-4 h-4" />,
        url: "/docs/installation"
    },
    {
        id: 3,
        title: "components.json",
        description: "Configuration file for components",
        category: "Configuration",
        icon: <Settings className="w-4 h-4" />,
        url: "/docs/components-json"
    },
    {
        id: 4,
        title: "Theming",
        description: "Customize your application theme",
        category: "Styling",
        icon: <Palette className="w-4 h-4" />,
        url: "/docs/theming"
    },
    {
        id: 5,
        title: "Dark Mode",
        description: "Implement dark mode in your application",
        category: "Styling",
        icon: <Moon className="w-4 h-4" />,
        url: "/docs/dark-mode"
    },
    {
        id: 6,
        title: "CLI",
        description: "Command line interface tools",
        category: "Tools",
        icon: <Terminal className="w-4 h-4" />,
        url: "/docs/cli"
    },
    {
        id: 7,
        title: "Monorepo",
        description: "Working with monorepo structure",
        category: "Advanced",
        icon: <Hash className="w-4 h-4" />,
        url: "/docs/monorepo"
    },
    {
        id: 8,
        title: "Open in v0",
        description: "Open your project in v0 editor",
        category: "Tools",
        icon: <ExternalLink className="w-4 h-4" />,
        url: "/docs/open-in-v0"
    }
];

export function SearchDialog({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filteredResults, setFilteredResults] = useState<SearchItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Filter results based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredResults(searchData);
        } else {
            const filtered = searchData.filter((item: SearchItem) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredResults(filtered);
        }
        setSelectedIndex(0);
    }, [searchQuery]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Handle dialog keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!open) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < filteredResults.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev > 0 ? prev - 1 : filteredResults.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredResults[selectedIndex]) {
                    handleNavigate(filteredResults[selectedIndex]);
                }
                break;
            case 'Escape':
                setOpen(false);
                break;
        }
    };

    // Navigate to selected item
    const handleNavigate = (item: SearchItem) => {
        console.log(`Navigating to: ${item.url}`);
        // In a real app, you would use your router here
        // For demo purposes, we'll just log and close
        setOpen(false);
        setSearchQuery('');
    };

    // Focus input when dialog opens
    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 100);
        }
    }, [open]);

    // Group results by category
    const groupedResults = filteredResults.reduce<Record<string, SearchItem[]>>((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className={`relative w-full max-w-sm ${className || ''}`}>
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search documentation..."
                        className="pl-10 pr-20 h-10 cursor-pointer"
                        readOnly
                        onClick={() => setOpen(true)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent 
                className="sm:max-w-2xl h-[500px] flex flex-col p-0 gap-0"
                onKeyDown={handleKeyDown}
            >
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="text-left">Search</DialogTitle>
                </DialogHeader>
                
                <div className="px-6 py-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Search documentation..."
                            className="pl-10 h-12 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-auto" ref={resultsRef}>
                    {filteredResults.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <Search className="w-12 h-12 mb-4 opacity-50" />
                            <p className="text-sm">No results found</p>
                            <p className="text-xs mt-1">Try searching for something else</p>
                        </div>
                    ) : (
                        <div className="py-2">
                            {Object.entries(groupedResults).map(([category, items]) => (
                                <div key={category} className="mb-4">
                                    <div className="px-6 py-2">
                                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                            {category}
                                        </h3>
                                    </div>
                                    <div>
                                        {items.map((item) => {
                                            const globalIndex = filteredResults.findIndex(r => r.id === item.id);
                                            const isSelected = globalIndex === selectedIndex;
                                            
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`mx-2 px-4 py-3 rounded-md cursor-pointer transition-colors ${
                                                        isSelected 
                                                            ? 'bg-accent text-accent-foreground' 
                                                            : 'hover:bg-accent/50'
                                                    }`}
                                                    onClick={() => handleNavigate(item)}
                                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-muted-foreground">
                                                            {item.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-sm">
                                                                    {item.title}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs  mt-1 truncate">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <ChevronRight className="w-4 h-4 " />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-6 py-3 border-t bg-muted/50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium">
                                    ↵
                                </kbd>
                                <span>to select</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium">
                                    ↑↓
                                </kbd>
                                <span>to navigate</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium">
                                esc
                            </kbd>
                            <span>to close</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}