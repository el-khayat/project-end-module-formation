package com.springendmodule.formation.configs;
import com.springendmodule.formation.filters.JwtAuthFilter;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKeyFactory;
import java.security.NoSuchAlgorithmException;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
//"/auth/welcome", "/auth/addNewUser", "/auth/generateToken"
    private static final String[] WHITE_LIST_URL = {
            "/auth/generateToken",
            "/auth/addNewUser",
            "/auth/open-end-point",
            "/formation/available",
            "/individual/*",
            "/individual/*/*",
            "/user/formateur/eternal/add",
            "/formation/test-mail",
            "/user/{id}",
            "/formateur/{id}",
            "/feedback/exist",
            "/feedback/save"
           };
    @Autowired
    JwtAuthFilter authFilter;
    @Bean
    public UserDetailsService userDetailsService() {
        return new UserService();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests((auth)->auth
                        .requestMatchers(WHITE_LIST_URL)
                        .permitAll()
                        .requestMatchers("/**").authenticated()

                ).csrf(csrf->csrf.disable())
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class) ;
        return http.build();
    }
    // Password Encoding
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    @Bean
    public SecretKeyFactory secretKeyFactory() throws NoSuchAlgorithmException {
        return SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
    }
}
