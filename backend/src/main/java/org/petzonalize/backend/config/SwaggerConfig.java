package org.petzonalize.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class SwaggerConfig {
    @Bean
    OpenAPI openAPI() {
        Server localServer = new Server();
        localServer.setDescription("local");
        localServer.setUrl("http://localhost:8080");

        Server testServer = new Server();
        testServer.setDescription("production");
        testServer.setUrl("http://petzonalize.up.railway.app");

        OpenAPI openAPI = new OpenAPI();
        openAPI.info(new Info()
                .title("Petzonalize API Documentation")
                .description(
                    "This is the Petzonalize API docs from Happy Hackers Project")
                .version("0.0.1"));
        openAPI.setServers(Arrays.asList(localServer, testServer));

        return openAPI;
    }
}
