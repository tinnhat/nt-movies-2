import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useSearchHistoryStore } from '@/lib/stores/searchHistoryStore';
import { useRecentlyViewedStore } from '@/lib/stores/recentlyViewedStore';

describe('SearchHistoryStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    useSearchHistoryStore.getState().clearHistory();
    // Clear localStorage
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty history', () => {
    const { history } = useSearchHistoryStore.getState();
    expect(history).toEqual([]);
  });

  it('should add search query to history', () => {
    const { addSearch, history } = useSearchHistoryStore.getState();
    
    addSearch('avengers');
    
    const updatedHistory = useSearchHistoryStore.getState().history;
    expect(updatedHistory).toHaveLength(1);
    expect(updatedHistory[0].query).toBe('avengers');
    expect(updatedHistory[0].id).toBeDefined();
    expect(updatedHistory[0].timestamp).toBeDefined();
  });

  it('should not add empty query', () => {
    const { addSearch } = useSearchHistoryStore.getState();
    
    addSearch('');
    addSearch('   ');
    
    const history = useSearchHistoryStore.getState().history;
    expect(history).toHaveLength(0);
  });

  it('should trim query before adding', () => {
    const { addSearch } = useSearchHistoryStore.getState();
    
    addSearch('  batman  ');
    
    const history = useSearchHistoryStore.getState().history;
    expect(history[0].query).toBe('batman');
  });

  it('should remove duplicate queries (case-insensitive)', () => {
    const { addSearch } = useSearchHistoryStore.getState();
    
    addSearch('avengers');
    addSearch('batman');
    addSearch('AVENGERS'); // Duplicate
    
    const history = useSearchHistoryStore.getState().history;
    expect(history).toHaveLength(2);
    expect(history[0].query).toBe('AVENGERS');
    expect(history[1].query).toBe('batman');
  });

  it('should add new searches at the beginning', () => {
    const { addSearch } = useSearchHistoryStore.getState();
    
    addSearch('first');
    addSearch('second');
    addSearch('third');
    
    const history = useSearchHistoryStore.getState().history;
    expect(history[0].query).toBe('third');
    expect(history[1].query).toBe('second');
    expect(history[2].query).toBe('first');
  });

  it('should limit history to 10 items', () => {
    const { addSearch } = useSearchHistoryStore.getState();
    
    // Add 15 searches
    for (let i = 1; i <= 15; i++) {
      addSearch(`search ${i}`);
    }
    
    const history = useSearchHistoryStore.getState().history;
    expect(history).toHaveLength(10);
    expect(history[0].query).toBe('search 15');
    expect(history[9].query).toBe('search 6');
  });

  it('should remove search by id', () => {
    const { addSearch, removeSearch } = useSearchHistoryStore.getState();
    
    addSearch('avengers');
    addSearch('batman');
    
    const history = useSearchHistoryStore.getState().history;
    const idToRemove = history[0].id;
    
    removeSearch(idToRemove);
    
    const updatedHistory = useSearchHistoryStore.getState().history;
    expect(updatedHistory).toHaveLength(1);
    expect(updatedHistory[0].query).toBe('avengers');
  });

  it('should clear all history', () => {
    const { addSearch, clearHistory } = useSearchHistoryStore.getState();
    
    addSearch('avengers');
    addSearch('batman');
    addSearch('superman');
    
    expect(useSearchHistoryStore.getState().history).toHaveLength(3);
    
    clearHistory();
    
    expect(useSearchHistoryStore.getState().history).toHaveLength(0);
  });

  it('should persist to localStorage', () => {
    const { addSearch } = useSearchHistoryStore.getState();
    
    addSearch('persisted search');
    
    // Check that data is in localStorage
    const stored = localStorage.getItem('nt-movies-search-history');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed.state.history).toHaveLength(1);
    expect(parsed.state.history[0].query).toBe('persisted search');
  });
});

describe('RecentlyViewedStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    useRecentlyViewedStore.getState().clearItems();
    // Clear localStorage
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty items', () => {
    const { items } = useRecentlyViewedStore.getState();
    expect(items).toEqual([]);
  });

  it('should add movie to recently viewed', () => {
    const { addItem } = useRecentlyViewedStore.getState();
    
    addItem({
      id: 123,
      type: 'movie',
      title: 'Test Movie',
      posterPath: '/poster.jpg',
    });
    
    const items = useRecentlyViewedStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(123);
    expect(items[0].type).toBe('movie');
    expect(items[0].title).toBe('Test Movie');
    expect(items[0].timestamp).toBeDefined();
  });

  it('should add TV show to recently viewed', () => {
    const { addItem } = useRecentlyViewedStore.getState();
    
    addItem({
      id: 456,
      type: 'tv',
      title: 'Test TV Show',
    });
    
    const items = useRecentlyViewedStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].type).toBe('tv');
  });

  it('should add person to recently viewed', () => {
    const { addItem } = useRecentlyViewedStore.getState();
    
    addItem({
      id: 789,
      type: 'person',
      title: 'Test Person',
      posterPath: '/profile.jpg',
    });
    
    const items = useRecentlyViewedStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].type).toBe('person');
  });

  it('should remove duplicate items (same id and type)', () => {
    const { addItem } = useRecentlyViewedStore.getState();
    
    addItem({ id: 123, type: 'movie', title: 'Movie 1' });
    addItem({ id: 456, type: 'movie', title: 'Movie 2' });
    addItem({ id: 123, type: 'movie', title: 'Movie 1 Updated' }); // Duplicate
    
    const items = useRecentlyViewedStore.getState().items;
    expect(items).toHaveLength(2);
    expect(items[0].id).toBe(123);
    expect(items[0].title).toBe('Movie 1 Updated');
    expect(items[1].id).toBe(456);
  });

  it('should allow same id with different types', () => {
    const { addItem } = useRecentlyViewedStore.getState();
    
    addItem({ id: 123, type: 'movie', title: 'Movie' });
    addItem({ id: 123, type: 'tv', title: 'TV Show' });
    addItem({ id: 123, type: 'person', title: 'Person' });
    
    const items = useRecentlyViewedStore.getState().items;
    expect(items).toHaveLength(3);
  });

  it('should add new items at the beginning', () => {
    const { addItem } = useRecentlyViewedStore.getState();
    
    addItem({ id: 1, type: 'movie', title: 'First' });
    addItem({ id: 2, type: 'movie', title: 'Second' });
    addItem({ id: 3, type: 'movie', title: 'Third' });
    
    const items = useRecentlyViewedStore.getState().items;
    expect(items[0].id).toBe(3);
    expect(items[1].id).toBe(2);
    expect(items[2].id).toBe(1);
  });

  it('should limit items to 20', () => {
    const { addItem } = useRecentlyViewedStore.getState();
    
    // Add 25 items
    for (let i = 1; i <= 25; i++) {
      addItem({ id: i, type: 'movie', title: `Movie ${i}` });
    }
    
    const items = useRecentlyViewedStore.getState().items;
    expect(items).toHaveLength(20);
    expect(items[0].id).toBe(25);
    expect(items[19].id).toBe(6);
  });

  it('should remove item by id and type', () => {
    const { addItem, removeItem } = useRecentlyViewedStore.getState();
    
    addItem({ id: 123, type: 'movie', title: 'Movie' });
    addItem({ id: 456, type: 'tv', title: 'TV Show' });
    addItem({ id: 123, type: 'tv', title: 'TV Show with same ID' });
    
    expect(useRecentlyViewedStore.getState().items).toHaveLength(3);
    
    removeItem(123, 'movie');
    
    const items = useRecentlyViewedStore.getState().items;
    expect(items).toHaveLength(2);
    expect(items.find(item => item.id === 123 && item.type === 'movie')).toBeUndefined();
    expect(items.find(item => item.id === 123 && item.type === 'tv')).toBeDefined();
  });

  it('should clear all items', () => {
    const { addItem, clearItems } = useRecentlyViewedStore.getState();
    
    addItem({ id: 1, type: 'movie', title: 'Movie 1' });
    addItem({ id: 2, type: 'tv', title: 'TV Show 1' });
    addItem({ id: 3, type: 'person', title: 'Person 1' });
    
    expect(useRecentlyViewedStore.getState().items).toHaveLength(3);
    
    clearItems();
    
    expect(useRecentlyViewedStore.getState().items).toHaveLength(0);
  });

  it('should persist to localStorage', () => {
    const { addItem } = useRecentlyViewedStore.getState();
    
    addItem({ id: 999, type: 'movie', title: 'Persisted Movie' });
    
    // Check that data is in localStorage
    const stored = localStorage.getItem('nt-movies-recently-viewed');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed.state.items).toHaveLength(1);
    expect(parsed.state.items[0].id).toBe(999);
    expect(parsed.state.items[0].title).toBe('Persisted Movie');
  });

  it('should handle items without posterPath', () => {
    const { addItem } = useRecentlyViewedStore.getState();
    
    addItem({ id: 123, type: 'movie', title: 'Movie without poster' });
    
    const items = useRecentlyViewedStore.getState().items;
    expect(items[0].posterPath).toBeUndefined();
  });
});
