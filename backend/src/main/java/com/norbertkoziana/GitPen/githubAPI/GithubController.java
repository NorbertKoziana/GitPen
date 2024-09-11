package com.norbertkoziana.GitPen.githubAPI;

import com.norbertkoziana.GitPen.model.MarkdownRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequiredArgsConstructor
@RequestMapping("github")
public class GithubController {

    private final WebClient webClient = WebClient.create();

    private final GitHubApiService gitHubApiService;

    @PostMapping("/markdown")
    public Mono<String> markdown(Authentication authentication, @RequestBody MarkdownRequest markdownRequest) {
        if(authentication == null){
            return webClient.post()
                    .uri("https://api.github.com/markdown")
                    .bodyValue(markdownRequest)
                    .retrieve()
                    .bodyToMono(String.class);
        }

        String accessToken = gitHubApiService.getAccessToken(authentication);

        return webClient.post()
                .uri("https://api.github.com/markdown")
                .headers(headers -> headers.setBearerAuth(accessToken))
                .bodyValue(markdownRequest)
                .retrieve()
                .bodyToMono(String.class);
    }

    @GetMapping("/limit")
    public Mono<String> limit(Authentication authentication) {

        if(authentication == null){
            return webClient.get()
                    .uri("https://api.github.com/rate_limit")
                    .retrieve()
                    .bodyToMono(String.class);
        }

        String accessToken = gitHubApiService.getAccessToken(authentication);

        return webClient.get()
                .uri("https://api.github.com/rate_limit")
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class);
    }

    @GetMapping("/repos")
    public Mono<String> repos(Authentication authentication) {
        String accessToken = gitHubApiService.getAccessToken(authentication);

        return webClient.get()
                .uri("https://api.github.com/user/repos")
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class);
    }

}
