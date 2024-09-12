package com.norbertkoziana.GitPen.githubAPI;

import com.norbertkoziana.GitPen.model.MarkdownRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
@RestController
@RequiredArgsConstructor
@RequestMapping("github")
public class GithubApiController {

    private final GitHubApiService gitHubApiService;

    @PostMapping("/markdown")
    public Mono<String> markdown(Authentication authentication, @RequestBody MarkdownRequest markdownRequest) {
        return gitHubApiService.renderHtmlFromMarkdown(authentication, markdownRequest);
    }

    @GetMapping("/limit")
    public Mono<String> limit(Authentication authentication) {
        return  gitHubApiService.getCurrentRequestLimit(authentication);
    }

    @GetMapping("/repos")
    public Mono<String> repos(Authentication authentication) {
        return gitHubApiService.getUserRepos(authentication);
    }

    @GetMapping("/repos/{owner}/{repo}/readme")
    public Mono<String> readme(Authentication authentication, @PathVariable String owner, @PathVariable String repo) {
        return gitHubApiService.getRepositoryReadme(authentication, owner, repo);
    }

}
