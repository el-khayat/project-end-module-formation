package com.springendmodule.formation;

import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*")
public class FormationApplication  implements CommandLineRunner {

	@Autowired
	UserService repository ;
	public static void main(String[] args) {
		SpringApplication.run(FormationApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Hello");
		User user = new User();
		user.setName("admin");
		user.setEmail("admin@gmail.com");
		user.setPassword("admin");
		user.setRoles("admin");
//		repository.addUser(user);
	}
}
