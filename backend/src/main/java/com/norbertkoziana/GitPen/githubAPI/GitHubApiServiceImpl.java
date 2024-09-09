package com.norbertkoziana.GitPen.githubAPI;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GitHubApiServiceImpl implements GitHubApiService {

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


}

