'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command as CommandIcon, FileText, Search } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

type PagefindData = {
  url: string;
  title: string;
  excerpt: string;
  meta?: Record<string, string>;
};

type PagefindResult = { data: () => Promise<PagefindData> };
type PagefindApi = {
  init: () => Promise<void>;
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
};

async function loadPagefind() {
  const path = '/pagefind/pagefind.js';
  return import(/* @vite-ignore */ path) as Promise<PagefindApi>;
}

function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PagefindData[]>([]);
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'unavailable'>('idle');

  useEffect(() => {
    const normalized = query.trim();
    if (!normalized) return;

    let active = true;
    const timer = window.setTimeout(async () => {
      setState('loading');
      try {
        const pagefind = await loadPagefind();
        await pagefind.init();
        const response = await pagefind.search(normalized);
        const data = await Promise.all(response.results.slice(0, 12).map((result) => result.data()));
        if (active) {
          setResults(data);
          setState('ready');
        }
      } catch {
        if (active) {
          setResults([]);
          setState('unavailable');
        }
      }
    }, 120);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [query]);

  const updateQuery = useCallback((value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setState('idle');
    }
  }, []);

  return { query, setQuery: updateQuery, results, state };
}

function Results({
  onSelect,
}: {
  onSelect: (url: string) => void;
}) {
  const { query, setQuery, results, state } = useSearch();

  return (
    <Command shouldFilter={false} className="search-command">
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search English or 中文…"
        aria-label="Search all writing / 搜索全部文章"
      />
      <CommandList className="search-results">
        {state === 'idle' && (
          <div className="search-hint">
            <Search size={16} aria-hidden="true" />
            <p>Search titles, ideas, and full text.<span lang="zh-CN">搜索标题、主题与全文。</span></p>
          </div>
        )}
        {state === 'loading' && <div className="search-state">Searching… / 正在搜索…</div>}
        {state === 'unavailable' && (
          <div className="search-state">Search is available in the built preview.<span lang="zh-CN">完整构建后即可使用搜索。</span></div>
        )}
        {state === 'ready' && results.length === 0 && (
          <CommandEmpty>No matching notes. / 没有匹配的文章。</CommandEmpty>
        )}
        {results.length > 0 && (
          <CommandGroup heading="Results / 结果">
            {results.map((result) => (
              <CommandItem
                key={result.url}
                value={result.url}
                onSelect={() => onSelect(result.url)}
                className="search-result"
              >
                <FileText size={16} aria-hidden="true" />
                <span>
                  <strong>{result.meta?.title ?? result.title}</strong>
                  <span dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

export function SearchLauncher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const onSelect = useCallback((url: string) => {
    setOpen(false);
    router.push(url);
  }, [router]);

  return (
    <>
      <button className="search-trigger" type="button" onClick={() => setOpen(true)} aria-label="Search / 搜索">
        <Search size={15} aria-hidden="true" />
        <span>Search</span><span lang="zh-CN">搜索</span>
        <kbd><CommandIcon size={11} />K</kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search / 搜索"
        description="Search every published note in English and Chinese. / 搜索全部已发布的中英文文章。"
        className="search-dialog"
      >
        <Results onSelect={onSelect} />
      </CommandDialog>
    </>
  );
}

export function SearchPanel() {
  const router = useRouter();
  return <Results onSelect={(url) => router.push(url)} />;
}
