function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    
    // Convert to EST timezone assuming EST is UTC-5
    const estDate = new Date(date.getTime() - (5 * 60 * 60 * 1000));
    
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short', timeZone: 'America/New_York' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(estDate);
  
    // Calculate relative time
    const secondsAgo = Math.floor((now - date) / 1000);
    let relativeTime;
  
    if (secondsAgo < 60) {
      relativeTime = `${secondsAgo} seconds ago`;
    } else if (secondsAgo < 3600) {
      relativeTime = `${Math.floor(secondsAgo / 60)} minutes ago`;
    } else if (secondsAgo < 86400) {
      relativeTime = `${Math.floor(secondsAgo / 3600)} hours ago`;
    } else {
      relativeTime = `${Math.floor(secondsAgo / 86400)} days ago`;
    }
  
    return `${formattedDate} (${relativeTime})`;
}

function dataFetcher() {
    const SUPABASE_URL = 'https://neutgwolrftsfsvfhutp.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldXRnd29scmZ0c2ZzdmZodXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNjY4ODYsImV4cCI6MjAxNDk0Mjg4Nn0.jeV6s1rVlm-l-Tgny8lPq0CQheCq10ch7xyjQ0P2G84';

    return {
        articles: [],
        topics: [],
        selectedTag: null,
        async fetchData() {
            await this.fetchArticles();
            this.fetchTopics();
        },
        async fetchArticles() {
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=representation'
                    }
                });
                if (!response.ok) throw new Error("Network response was not ok.");
                let data = await response.json();
                data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                this.articles = data.map(article => ({
                    ...article,
                    tags: article.tags ? article.tags.split(",") : [],
                }));
            } catch (error) {
                console.error("Fetch error:", error);
            }
        },        
        fetchTopics() {
            const allTags = new Set(this.articles.flatMap(article => article.tags));
            this.topics = Array.from(allTags).map(tag =>
                tag.charAt(0).toUpperCase() + tag.slice(1)
            );
        },
        get filteredArticles() {
            if (this.selectedTag === null) return this.articles;
            
            // Uncapitalize the tag before filtering
            const tagToCheck = this.selectedTag[0].toLowerCase() + this.selectedTag.substring(1);
            
            return this.articles.filter(article =>
                article.tags.includes(tagToCheck)
            );
        }        
    };
}