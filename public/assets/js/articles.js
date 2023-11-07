function dataFetcher() {
    return {
        articles: [],
        topics: [],
        selectedTag: null,
        async fetchData() {
            await this.fetchArticles();
            this.fetchTopics();
        },
        async fetchArticles() {
            const supabaseUrl = process.env.SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_ANON_KEY;
          
            try {
              const response = await fetch(`${supabaseUrl}/rest/v1/articles?select=*&order=timestamp.desc`, {
                headers: {
                  'apikey': supabaseKey,
                  'Authorization': `Bearer ${supabaseKey}`,
                }
              });
          
              if (!response.ok) throw new Error("Network response was not ok.");
              let data = await response.json();
          
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