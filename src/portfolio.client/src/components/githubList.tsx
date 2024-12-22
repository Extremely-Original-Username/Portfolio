import { useEffect, useState } from "react";
import GithubRepositoryListItem from "../model/githubRepositoryListItem";
import GithubListProps from "../model/props/githubListProps";

const GitHubList = (props: GithubListProps) => {
    var [repositories, setRepositories] = useState<GithubRepositoryListItem[]>([]);

    useEffect(() => {
        async function fetchRepos() {
            const getReposUrl = "https://api.github.com/users/" + props.user + "/repos"
            try {
                const response = await fetch(getReposUrl);
                const data = await response.json();
                setRepositories(data);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                setTimeout(fetchRepos, 1000)
            }
        }

        fetchRepos(); // Call the fetch function
    }, [props.user]); // Empty dependency array ensures this runs once when the component mounts

    useEffect(() => {
        async function fetchReadMe(repo: string): Promise<string> {
            const getReadMeURL = "https://api.github.com/repos/" + props.user + "/" + repo + "/readme";
            try {
                const response = await fetch(getReadMeURL);
                const data = await response.json();
                return (atob(data.content));
            } catch (error) {
                throw new Error("Error fetching readme: " + error);
            }
        }

        async function updateReadMes() {
            if (repositories.length === 0) {
                return;
            }

            var newRepositories: GithubRepositoryListItem[] = []
            try {
                for (var i = 0; i < repositories.length; i++) {
                    newRepositories.push(new GithubRepositoryListItem(repositories[i].name, repositories[i].description, await fetchReadMe(repositories[i].name)));
                }
            } catch (error) {
                console.error('Error fetching readmes:', error);
                setTimeout(updateReadMes, 1000)
            }

            if (newRepositories.length === repositories.length) {
                setRepositories(newRepositories);
            }
        }

        updateReadMes();
    }, [repositories]);

    return (
        <div>
            {
                repositories.map((repo) => (
                    <div className="largePanel center">{repo.name}: {repo.readme}</div>
                ))
            }
        </div>
    )
}

export default GitHubList;