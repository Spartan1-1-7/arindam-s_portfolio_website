import useSWR from 'swr';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Fetcher function with error handling
const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  
  return res.json();
};

// SWR configuration
const swrConfig = {
  revalidateOnFocus: false, // Don't refetch on window focus
  revalidateOnReconnect: true, // Refetch when reconnecting
  dedupingInterval: 60000, // Dedupe requests within 60s
  focusThrottleInterval: 60000, // Throttle focus revalidation
};

// Custom hooks for each endpoint
export function useProfile() {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/profile/`,
    fetcher,
    swrConfig
  );

  return {
    profile: data?.[0] || null,
    isLoading,
    error,
  };
}

export function useSkills() {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/skills/`,
    fetcher,
    swrConfig
  );

  return {
    skills: data || [],
    isLoading,
    error,
  };
}

export function useProjects() {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/projects/`,
    fetcher,
    swrConfig
  );

  return {
    projects: data || [],
    isLoading,
    error,
  };
}

export function useExperiences() {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/experience/`,
    fetcher,
    swrConfig
  );

  return {
    experiences: data || [],
    isLoading,
    error,
  };
}

export function useAchievements() {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/achievements/`,
    fetcher,
    swrConfig
  );

  return {
    achievements: data || [],
    isLoading,
    error,
  };
}

// Consolidated home page data hook - fetches all data in one request
export function useHomeData() {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/home/`,
    fetcher,
    swrConfig
  );

  return {
    profile: data?.profile || null,
    skills: data?.skills || [],
    projects: data?.projects || [],
    experiences: data?.experiences || [],
    achievements: data?.achievements || [],
    isLoading,
    error,
  };
}
