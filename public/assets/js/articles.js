function formatDateWithMoment(isoString) {
    const momentDate = moment(isoString);
    const formattedDate = momentDate.locale('America/New_York').format('YYYY-MM-DD HH:mm:ss z');
    const relativeTime = momentDate.fromNow();
  
    return `${formattedDate} (${relativeTime})`;
};

function dataFetcher() {
    const SUPABASE_URL = 'https://neutgwolrftsfsvfhutp.supabase.co';
    // If you're reading this, this key is safe for me to share :)
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
                    created_at: formatDateWithMoment(article.created_at),
                    tags: article.tags ? article.tags.split(",") : [],
                }));
            } catch (error) {
                console.error("Fetch error:", error);
            }
        },        
        fetchTopics() {
            const allTags = new Set(this.articles.flatMap(article => article.topic));
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