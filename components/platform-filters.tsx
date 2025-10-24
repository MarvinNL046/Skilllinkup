'use client';

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

interface Platform {
  id: string;
  name: string;
  slug: string;
  category: string;
  rating: number;
  difficulty: string;
  fees: string | null;
  featured: boolean;
}

interface PlatformCategory {
  category: string;
  count: number;
}

interface PlatformFiltersProps {
  platforms: Platform[];
  categories: PlatformCategory[];
}

export function PlatformFilters({ platforms, categories }: PlatformFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filters from URL
  const selectedCategory = searchParams.get('category') || 'All Platforms';
  const selectedDifficulties = searchParams.get('difficulty')?.split(',').filter(Boolean) || [];
  const selectedRatings = searchParams.get('rating')?.split(',').filter(Boolean) || [];
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'rating';

  // Create URL with new params
  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([name, value]) => {
        if (value === null || value === '') {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  // Filter and sort platforms
  const filteredPlatforms = useMemo(() => {
    let filtered = platforms;

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Platforms') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(p => selectedDifficulties.includes(p.difficulty));
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(p => {
        return selectedRatings.some(rating => {
          if (rating === '4.5') return p.rating >= 4.5;
          if (rating === '4.0') return p.rating >= 4.0 && p.rating < 4.5;
          if (rating === '3.5') return p.rating >= 3.5 && p.rating < 4.0;
          return false;
        });
      });
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'difficulty':
        const difficultyOrder: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        filtered = [...filtered].sort((a, b) =>
          (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0)
        );
        break;
    }

    return filtered;
  }, [platforms, selectedCategory, selectedDifficulties, selectedRatings, searchQuery, sortBy]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    const query = createQueryString({
      category: category === 'All Platforms' ? null : category,
    });
    router.push(`${pathname}?${query}`);
  };

  // Handle difficulty toggle
  const handleDifficultyToggle = (difficulty: string) => {
    const newDifficulties = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter(d => d !== difficulty)
      : [...selectedDifficulties, difficulty];

    const query = createQueryString({
      difficulty: newDifficulties.length > 0 ? newDifficulties.join(',') : null,
    });
    router.push(`${pathname}?${query}`);
  };

  // Handle rating toggle
  const handleRatingToggle = (rating: string) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];

    const query = createQueryString({
      rating: newRatings.length > 0 ? newRatings.join(',') : null,
    });
    router.push(`${pathname}?${query}`);
  };

  // Handle search
  const handleSearch = (value: string) => {
    const query = createQueryString({
      search: value || null,
    });
    router.push(`${pathname}?${query}`);
  };

  // Handle sort
  const handleSort = (value: string) => {
    const query = createQueryString({
      sort: value,
    });
    router.push(`${pathname}?${query}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-accent bg-accent/10";
      case "Medium":
        return "text-primary bg-primary/10";
      case "Hard":
        return "text-secondary bg-secondary/10";
      default:
        return "text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700";
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search platforms..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4 pl-12 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-md"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 sticky top-4">
            <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.category}>
                  <button
                    onClick={() => handleCategoryChange(cat.category)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                      selectedCategory === cat.category
                        ? 'bg-primary text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-primary'
                    }`}
                  >
                    <span className="font-medium">{cat.category}</span>
                    <span className={`text-xs ${
                      selectedCategory === cat.category ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <hr className="my-6 border-gray-200 dark:border-gray-700" />

            <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
              Difficulty
            </h3>
            <div className="space-y-2">
              {["Easy", "Medium", "Hard"].map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDifficulties.includes(level)}
                    onChange={() => handleDifficultyToggle(level)}
                    className="w-4 h-4 rounded border-gray-200 dark:border-gray-700 text-primary focus:ring-primary/50"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{level}</span>
                </label>
              ))}
            </div>

            <hr className="my-6 border-gray-200 dark:border-gray-700" />

            <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
              Rating
            </h3>
            <div className="space-y-2">
              {[
                { label: "4.5+ Stars", value: "4.5" },
                { label: "4.0-4.4 Stars", value: "4.0" },
                { label: "3.5-3.9 Stars", value: "3.5" },
              ].map((rating) => (
                <label key={rating.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating.value)}
                    onChange={() => handleRatingToggle(rating.value)}
                    className="w-4 h-4 rounded border-gray-200 dark:border-gray-700 text-primary focus:ring-primary/50"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{rating.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Platforms Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Showing {filteredPlatforms.length} platform{filteredPlatforms.length !== 1 ? 's' : ''}
            </p>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="rating">Sort by: Rating</option>
              <option value="name">Sort by: Name</option>
              <option value="difficulty">Sort by: Difficulty</option>
            </select>
          </div>

          {filteredPlatforms.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300">No platforms found matching your filters.</p>
              <button
                onClick={() => router.push('/platforms')}
                className="mt-4 text-primary hover:text-primary-dark font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlatforms.map((platform) => (
                <a
                  key={platform.id}
                  href={`/platforms/${platform.slug}`}
                  className="group relative overflow-hidden rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 transition-all hover:border-accent hover:shadow-xl"
                >
                  {/* Featured Badge */}
                  {platform.featured && (
                    <div className="absolute right-3 top-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-heading font-semibold text-white">
                        ★
                      </span>
                    </div>
                  )}

                  {/* Platform Name */}
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {platform.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(platform.rating)
                              ? "text-accent"
                              : "text-gray-200 dark:text-gray-700"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {Number(platform.rating).toFixed(1)}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-300">Category</span>
                      <span className="font-semibold text-accent">
                        {platform.category}
                      </span>
                    </div>
                    {platform.fees && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-300">Fees</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {platform.fees}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-300">Difficulty</span>
                      <span
                        className={`font-semibold text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(
                          platform.difficulty
                        )}`}
                      >
                        {platform.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between text-sm font-heading font-semibold text-primary group-hover:text-primary-dark transition-colors">
                    <span>Read Review</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
