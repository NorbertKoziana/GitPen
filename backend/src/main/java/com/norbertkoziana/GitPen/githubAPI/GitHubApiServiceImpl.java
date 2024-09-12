package com.norbertkoziana.GitPen.githubAPI;
import com.norbertkoziana.GitPen.model.MarkdownRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class GitHubApiServiceImpl implements GitHubApiService {

    private final WebClient webClient = WebClient.create();

    /*
        https://docs.spring.io/spring-security/reference/servlet/oauth2/client/core.html
        From a developer perspective, the OAuth2AuthorizedClientRepository or OAuth2AuthorizedClientService provides the ability to look up
         an OAuth2AccessToken associated with a client so that it can be used to initiate a protected resource request.
     */

    private final OAuth2AuthorizedClientService authorizedClientService;

    public String getAccessToken(Authentication authentication) {
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                "github",
                authentication.getName()
        );

        return client.getAccessToken().getTokenValue();
    }

    public Mono<String> renderHtmlFromMarkdown(Authentication authentication, @RequestBody MarkdownRequest markdownRequest) {
        if(authentication == null){
            return webClient.post()
                    .uri("https://api.github.com/markdown")
                    .bodyValue(markdownRequest)
                    .retrieve()
                    .bodyToMono(String.class);
        }

        String accessToken = this.getAccessToken(authentication);

        return webClient.post()
                .uri("https://api.github.com/markdown")
                .headers(headers -> headers.setBearerAuth(accessToken))
                .bodyValue(markdownRequest)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getCurrentRequestLimit(Authentication authentication) {

        if(authentication == null){
            return webClient.get()
                    .uri("https://api.github.com/rate_limit")
                    .retrieve()
                    .bodyToMono(String.class);
        }

        String accessToken = this.getAccessToken(authentication);

        return webClient.get()
                .uri("https://api.github.com/rate_limit")
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getUserRepos(Authentication authentication) {
        String accessToken = this.getAccessToken(authentication);

        return webClient.get()
                .uri("https://api.github.com/user/repos")
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getRepositoryReadme(Authentication authentication, @PathVariable String owner, @PathVariable String repo) {
        String accessToken = this.getAccessToken(authentication);

        return webClient.get()
                .uri("https://api.github.com/repos/" + owner + "/" + repo + "/readme")
                .headers(headers -> {
                    headers.setBearerAuth(accessToken);
                    headers.set("Accept", "application/vnd.github.raw+json");
                })
                .retrieve()
                .bodyToMono(String.class);
    }

}

