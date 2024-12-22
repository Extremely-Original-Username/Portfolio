import { useEffect, useState } from "react";
import GithubRepositoryListItem from "../model/githubRepositoryListItem";
import GithubListProps from "../model/props/githubListProps";

const GitHubList = (props: GithubListProps) => {
    var [repositories, setRepositories] = useState<GithubRepositoryListItem[]>([]);

    useEffect(() => {
        async function fetchReadMe(repo: string) {
            const getReadMeURL = "https://api.github.com/repos/" + props.user + "/" + repo + "/readme";
            try {
                const response = await fetch(getReadMeURL);
                const data = await response.json();
                return data.content;
            } catch {
                return "Error getting README from Github";
            }
        }

        async function fetchRepos() {
            try {
                const getReposUrl = "https://api.github.com/users/" + props.user + "/repos"
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