package com.norbertkoziana.GitPen.githubAPI;
import com.norbertkoziana.GitPen.model.MarkdownRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import reactor.core.publisher.Mono;
public interface GitHubApiService {
    String getAccessToken(Authentication authentication);

    Mono<String> renderHtmlFromMarkdown(Authentication authentication, @RequestBody MarkdownRequest markdownRequest);

    Mono<String> getCurrentRequestLimit(Authentication authentication);

    Mono<String> getUserRepos(Authentication authentication);

    Mono<String> getRepositoryReadme(Authentication authentication, String owner, String repo);
}
