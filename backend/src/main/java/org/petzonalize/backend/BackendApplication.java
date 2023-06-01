package org.petzonalize.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.repository.UserRepository;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	@Value("classpath:static/data/users.json")
	Resource usersJsonFile;

	@Bean
	public CommandLineRunner demo(UserRepository userRepository){
		return (args) -> {
			ObjectMapper mapper = new ObjectMapper();
			userRepository.saveAll(Arrays.asList
					(mapper.readValue(usersJsonFile.getFile(), User[].class)));

			for(User product: userRepository.findAll())
				System.out.println(product.toString());
		};
	}
}
