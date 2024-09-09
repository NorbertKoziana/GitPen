package com.norbertkoziana.GitPen.oauth2;
import com.norbertkoziana.GitPen.user.User;
import com.norbertkoziana.GitPen.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;

@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User =  super.loadUser(userRequest);

        Integer githubID = oAuth2User.getAttribute("id");

        User user = userRepository.findByGithubID(githubID)
                .orElseGet(
                        () -> {
                            User buildUser =  User.builder()
                                    .login(oAuth2User.getAttribute("login"))
                                    .githubID(oAuth2User.getAttribute("id"))
                                    .locked(false)
                                    .build();
                            return userRepository.save(buildUser);
                        }
                );

        if(user.getLocked())
            throw new OAuth2AuthenticationException(new OAuth2Error("ACCESS_DENIED", "Your account is locked!", ""));

        return user;

    }


}